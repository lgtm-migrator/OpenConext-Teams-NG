package teams.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import teams.api.validations.TeamValidator;
import teams.domain.*;
import teams.exception.IllegalSearchParamException;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

import static java.lang.String.format;
import static java.util.stream.Collectors.toList;


@RestController
public class TeamController extends ApiController implements TeamValidator {

    @Value("${teams.group-name-context}")
    private String groupNameContext;

    @Value("${teams.default-stem-name}")
    private String defaultStemName;

    private TeamMatcher teamMatcher = new TeamMatcher();

    @GetMapping("api/teams/my-teams")
    public MyTeams myTeams(FederatedUser federatedUser) {
        List<TeamSummary> teamSummaries = teamRepository
                .findByMembershipsUrnPersonOrderByNameAsc(federatedUser.getUrn())
                .stream()
                .map(team -> new TeamSummary(team, federatedUser))
                .collect(toList());
        List<Long> teamIds = teamSummaries.stream().filter(teamSummary -> isAllowedToAcceptJoinRequest(teamSummary))
                .map(TeamSummary::getId).collect(toList());
        List<JoinRequest> joinRequests = joinRequestRepository.findByTeamIdIn(teamIds);
        List<Invitation> invitationsReceived = invitationRepository.findByEmail(federatedUser.getPerson().getEmail());
        List<Invitation> invitationsSend = invitationRepository.findByInvitationMessagesPerson(federatedUser.getPerson());
        return new MyTeams(joinRequests,invitationsSend,invitationsReceived, teamSummaries);

    }

    @GetMapping("api/teams/teams/{id}")
    public Object teamById(@PathVariable("id") Long id, FederatedUser federatedUser) {
        Team team = teamById(id);
        Optional<Membership> membership = team.member(federatedUser.getUrn());
        return membership.isPresent() ? lazyLoadTeam(team, membership.get().getRole(), federatedUser) : new TeamSummary(team, federatedUser);
    }

    @GetMapping("api/teams/teams")
    public List<TeamAutocomplete> teamSearch(@RequestParam("query") String query, FederatedUser federatedUser) {
        if (query.trim().length() < 3) {
            throw new IllegalSearchParamException("Minimal query length is 3");
        }
        Long id = federatedUser.getPerson().getId();
        List<TeamAutocomplete> autoCompletes = teamRepository.autocomplete(id, ("%" + query + "%").toUpperCase(), id)
                .stream()
                .map(arr -> new TeamAutocomplete(
                        arr[0].toString(),
                        Long.valueOf(arr[1].toString()),
                        arr[2].toString(),
                        (arr.length == 4 && arr[3] != null) ? arr[3].toString() : null))
                .sorted((a1, a2) -> teamMatcher.compare(a1.getName().toLowerCase(), a2.getName().toLowerCase(), query.toLowerCase()))
                .collect(toList());
        return autoCompletes.subList(0, Math.max(0, Math.min(autoCompletes.size(), 10)));
    }

    @GetMapping("api/teams/team-exists-by-name")
    public boolean teamExistsByName(@RequestParam("name") String name) {
        return teamRepository.findByUrn(constructUrn(name)).isPresent();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("api/teams/teams")
    public Object createTeam(HttpServletRequest request, @Validated @RequestBody NewTeamProperties teamProperties, FederatedUser federatedUser) throws IOException, MessagingException {
        String name = teamProperties.getName();
        String urn = constructUrn(name);
        Optional<Team> teamOptional = teamRepository.findByUrn(urn);

        teamNameDuplicated(name, teamOptional);

        Team team = new Team(urn, name, teamProperties.getDescription(), teamProperties.isViewable());
        Person person = federatedUser.getPerson();
        Membership membership = new Membership(Role.ADMIN, team, person);

        Object result = lazyLoadTeam(teamRepository.save(team), membership.getRole(), federatedUser);

        LOG.info("Team {} created by {}", urn, federatedUser.getUrn());

        if (StringUtils.hasText(teamProperties.getEmail())) {
            Invitation invitation = new Invitation(
                    team,
                    teamProperties.getEmail(),
                    Role.ADMIN,
                    resolveLanguage(request));
            invitation.addInvitationMessage(person, teamProperties.getInvitationMessage());
            saveAndSendInvitation(invitation, team, person);
        }

        return result;
    }

    private String constructUrn(String name) {
        return format("%s:%s", defaultStemName,
                name.toLowerCase().trim().replaceAll("[ ']", "_"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("api/teams/teams")
    public Object updateTeam(@Validated @RequestBody TeamProperties teamProperties, FederatedUser federatedUser) {
        Team team = teamById(teamProperties.getId());

        String federatedUserUrn = federatedUser.getUrn();
        Role roleOfLoggedInPerson = membership(team, federatedUserUrn).getRole();
        onlyAdminAllowed(roleOfLoggedInPerson, federatedUser, team, "update");

        team.setDescription(teamProperties.getDescription());
        team.setViewable(teamProperties.isViewable());
        team.setPersonalNote(teamProperties.getPersonalNote());

        LOG.info("Team {} updated by {}", team.getUrn(), federatedUserUrn);

        return lazyLoadTeam(teamRepository.save(team), roleOfLoggedInPerson, federatedUser);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("api/teams/teams/{id}")
    public void deleteTeam(@PathVariable("id") Long id, FederatedUser federatedUser) {
        Team team = teamRepository.findOne(id);
        assertNotNull(Team.class.getSimpleName(), team, id);

        String federatedUserUrn = federatedUser.getUrn();
        Role roleOfLoggedInPerson = membership(team, federatedUserUrn).getRole();
        onlyAdminAllowed(roleOfLoggedInPerson, federatedUser, team, "delete");

        List<ExternalTeam> externalTeams = externalTeamRepository.findByTeamsUrn(team.getUrn());
        externalTeams.forEach(externalTeam -> removeTeamFromExternalTeam(externalTeam, team));

        teamRepository.delete(team);
        LOG.info("Team {} deleted by {}", team.getUrn(), federatedUserUrn);
    }

    private void removeTeamFromExternalTeam(ExternalTeam externalTeam, Team team) {
        externalTeam.getTeams().remove(team);
        externalTeamRepository.save(externalTeam);
    }

}
