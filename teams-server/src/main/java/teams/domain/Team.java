package teams.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;
import org.springframework.util.StringUtils;
import org.springframework.web.util.HtmlUtils;
import teams.api.validations.HashGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import org.commonmark.node.*;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;

import static javax.persistence.CascadeType.ALL;

@Entity(name = "teams")
@Getter
@Setter
@NoArgsConstructor
public class Team implements HashGenerator, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String urn;

    @Column
    @NotNull
    private String name;

    @Column
    private String description;

    @Column
    private String personalNote;

    @Column
    private boolean viewable;

    @Column
    private Instant created;

    @Column
    private String publicLink;

    @Column
    private boolean publicLinkDisabled = true;

    @Column
    private boolean hideMembers;

    @Formula("(select count(*) from memberships m where m.team_id = id and m.role <> 'OWNER')")
    private int membershipCount;

    @OneToMany(mappedBy = "team", orphanRemoval = true, cascade = ALL)
    private Set<Membership> memberships = new HashSet<>();

    @OneToMany(mappedBy = "team", orphanRemoval = true)
    private Set<Invitation> invitations = new HashSet<>();

    @OneToMany(mappedBy = "team", orphanRemoval = true)
    private Set<JoinRequest> joinRequests = new HashSet<>();

    @ManyToMany(mappedBy = "teams", cascade = ALL)
    private Set<ExternalTeam> externalTeams = new HashSet<>();

    public Team(String urn, String name, String description, boolean viewable, boolean hideMembers, String personalNote) {
        this.urn = urn;
        this.name = name;
        this.description = StringUtils.hasText(description) ? description : null;
        this.viewable = viewable;
        this.hideMembers = hideMembers;
        this.personalNote = personalNote;
        this.publicLink = viewable ? generateHash(32, "UTF-8") : null;
        this.publicLinkDisabled = !viewable;
        this.created = Instant.now();
    }

    public Optional<Membership> member(String urn) {
        return memberships.stream().filter(membership -> membership.getUrnPerson().equals(urn))
                .findAny();
    }

    @JsonIgnore
    public boolean isContainsDescription() {
        return StringUtils.hasText(this.description);
    }

    @JsonIgnore
    public String getHtmlDescription() {
        if (isContainsDescription()) {
            Parser parser = Parser.builder().build();
            Node document = parser.parse(description);
            HtmlRenderer renderer = HtmlRenderer.builder().escapeHtml(false).build();
            String render = renderer.render(document);
            if (render.endsWith("\n")) {
                render = render.substring(0, render.length() - 1);
            }
            return render.replaceAll("\n", "<br/>");
        }
        return "";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Team team = (Team) o;
        return Objects.equals(id, team.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @JsonIgnore
    public void resetPublicLink() {
        this.publicLink = generateHash(32, "UTF-8");
        this.publicLinkDisabled = false;
        this.viewable = true;
    }
}
