import React from "react";
import {Link} from "react-router-dom";
import I18n from "i18n-js";
import CopyToClipboard from "react-copy-to-clipboard";
import {deleteTeam, getTeamDetail, leaveTeam} from "../api";
import {setFlash} from "../utils/flash";
import {stop} from "../utils/utils";
import moment from "moment";
import SortDropDown from "../components/sort_drop_down";
import InlineEditable from "../components/inline_editable";


export default class TeamDetail extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            team: {},
            filteredMembers: [],
            sortAttributes: [
                {name: "status", order: "down", current: true},
                {name: "name", order: "down", current: false},
                {name: "email", order: "down", current: false},
                {name: "role", order: "down", current: false}
            ],
            editableTeamAttributes: {
                description: false,
                personalNote: false
            },
            loaded: false,
            copiedToClipboard: false
        };
        moment.locale(I18n.locale);
    }

    fetchTeam() {
        getTeamDetail(this.props.match.params.id).then(team => {
            const joinRequests = team.joinRequests || [];
            this.setState({
                team: team,
                filteredMembers: team.memberships.concat(joinRequests).sort(this.sortByStatus),
                loaded: true
            })
        });
    }

    sortByStatus = (member, otherMember) => {
        const isJoinRequestMember = !member.role;
        const isJoinRequestOtherMember = !otherMember.role;
        if ((isJoinRequestMember && isJoinRequestOtherMember) ||
            (!isJoinRequestMember && !isJoinRequestOtherMember)) {
            return member.created > otherMember.created ? 1 : member.created === otherMember.created ? 0 : -1
        }
        return isJoinRequestMember ? -1 : 1;
    };

    componentWillMount = () => this.fetchTeam();

    handleAcceptJoinRequest = (team) => (e) => {
        stop(e);
        this.props.history.replace("/team/" + team.urn);
    };

    handleDeleteTeam = (team) => (e) => {
        const {router} = this.context;
        stop(e);
        if (confirm(I18n.t("teams.confirmation", {name: team.name}))) {
            deleteTeam(team.id).then(() => {
                this.props.history.replace("/my-teams");
                setFlash(I18n.t("teams.flash", {teamName: team.name, action: I18n.t("teams.flash_deleted")}));
            });

        }
    };

    handleLeaveTeam = (myMembershipId) => (e) =>
        leaveTeam(myMembershipId).then(() => this.props.history.replace("/my-teams"));

    search = (e) => {
        let input = e.target.value;
        if (input === undefined || input === null || input.trim().length === 0) {
            this.setState({filteredTeams: this.state.teams});
        } else {
            this.setState({filteredTeams: this.filterTeams(input.toLowerCase())});
        }
    };

    sort = (item) => (e) => {
        stop(e);
        // if (column.sortFunction === undefined) {
        //     return;
        // }
        // let sortedTeams = teams.sort(column.sortFunction);
        // let newOrder = "down";
        // if (this.state.sorted.name === column.sort) {
        //     newOrder = this.state.sorted.order === "down" ? "up" : "down";
        //     if (newOrder === "up") {
        //         sortedTeams = sortedTeams.reverse();
        //     }
        // }
        // this.setState({sortedTeams: sortedTeams, sorted: {name: column.sort, order: newOrder}})
    };

    sortByAttribute = (name) => (a, b) => a[name].localeCompare(b[name]);

    teamDetailHeader(team, role, currentUser) {
        const myMembershipId =
            team.memberships.filter(membership => membership.urnPerson === currentUser.urn).map(membership => membership.id)[0];
        return (
            <section className="team-header">
                <Link className="back" to="/my-teams"><i className="fa fa-arrow-left"></i>
                    {I18n.t("team_detail.back")}
                </Link>
                <div className="actions">
                    <h2>{team.name}</h2>
                    <a className="button" href="#"
                       onClick={this.handleLeaveTeam(myMembershipId)}>{I18n.t("team_detail.leave")}
                        <i className="fa fa-sign-out"></i>
                    </a>
                    {role === "ADMIN" && <a className="button" href="#"
                       onClick={this.handleDeleteTeam(team)}>{I18n.t("team_detail.delete")}
                        <i className="fa fa-trash"></i>
                    </a>}
                </div>
            </section>
        );
    }

    changePersonalNote = (description) => {

    };

    changeDescription = (description) => {
    };

    changeViewable = e => {

    };

    copiedToClipboard = () => {
        this.setState({copiedToClipboard: true});
        setTimeout(() => this.setState({copiedToClipboard: false}), 1500);
    };

    teamDetailAttributes(team, role) {
        const isAdmin = role === "ADMIN";
        const copiedToClipBoardClassName = this.state.copiedToClipboard ? "copied" : "";
        return (
            <section className="team-attributes">
                <div className="inline-editable">
                    <label>{I18n.t(name)}</label>
                    <CopyToClipboard text={team.urn}
                                     onCopy={this.copiedToClipboard}>
                        <span>{team.urn}<i className={`fa fa-copy ${copiedToClipBoardClassName}`}></i></span>
                    </CopyToClipboard>

                </div>
                <InlineEditable name="team_detail.description" mayEdit={isAdmin} value={team.description} onChange={this.changeDescription}/>
                {isAdmin && <InlineEditable name="team_detail.personalNote" mayEdit={isAdmin} value={team.personalNote} onChange={this.changeDescription}/>}
                <div className="team-viewable">
                    <label className="info-after" htmlFor="viewable">{I18n.t("team_detail.viewable")}</label>
                    <em className="info" htmlFor="viewable">{I18n.t("team_detail.viewable_info")}</em>
                    <input type="checkbox" id="viewable" name="viewable" checked={team.viewable}
                           onChange={this.changeViewable}/>
                    <label className="checkbox-label" htmlFor="viewable"><span className="checkbox-labe"><i className="fa fa-check"></i></span></label>
                </div>
            </section>
        );
    }

    currentUserRoleInTeam = (team, currentUser) => team.memberships.filter(membership => membership.urnPerson === currentUser.urn)[0].role;

    statusOfMembership = (member) => member.role ? moment(member.created).format("LLL") :
        <span className="status-pending"><i className="fa fa-clock-o"></i>{I18n.t("team_detail.pending")}</span>;

    roleOfMembership = (member) => member.role ?
        member.role.substring(0, 1) + member.role.substring(1).toLowerCase() :
        "Member";

    renderMembersTable(team) {
        if (this.state.filteredMembers.length !== 0) {
            return (<table>
                <thead>
                <tr>
                    <th>{I18n.t("team_detail.membership.name")}</th>
                    <th>{I18n.t("team_detail.membership.email")}</th>
                    <th>{I18n.t("team_detail.membership.status")}</th>
                    <th>{I18n.t("team_detail.membership.role")}</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {this.state.filteredMembers.map((member) =>
                    <tr key={member.urnPerson}>
                        <td>{member.person.name}</td>
                        <td>{member.person.email}</td>
                        <td>{this.statusOfMembership(member)}</td>
                        <td>{this.roleOfMembership(member)}</td>
                        <td className="actions"><i className="fa fa-ellipsis-h"></i></td>
                    </tr>
                )}

                </tbody>
            </table>)
        } else {
            return <div><em>{I18n.t("team_detail.no_found")}</em></div>
        }
    }

    render() {
        const {team, sortAttributes, loaded} = this.state;
        const {currentUser} = this.props;
        if (!loaded) {
            return null;
        }
        const role = this.currentUserRoleInTeam(team, currentUser);

        return (
            <div className="team-detail">
                {this.teamDetailHeader(team, role, currentUser)}
                {this.teamDetailAttributes(team, role)}
                <h2>{`${I18n.t("team_detail.team_members")} (${team.memberships.length + team.joinRequests.length})`}</h2>
                <section className="team-detail-controls">
                    <SortDropDown items={sortAttributes} sortBy={this.sort}/>
                    <div className="search">
                        <input placeholder={I18n.t("team_detail.search_members_placeholder")} type="text"
                               onChange={this.search}/>
                        <i className="fa fa-search"></i>
                    </div>

                </section>
                {this.renderMembersTable(team)}
            </div>
        );
    }
}
