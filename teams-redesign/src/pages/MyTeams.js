import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {deleteTeam, getMyTeams} from "../api";
import I18n from "i18n-js";
import {ROLES} from "../utils/roles";
import {Page} from "../components/Page";
import {DropDownMenu} from "../components/DropDownMenu";
import {ReactComponent as SearchIcon} from "../icons/search.svg";
import binIcon from "../icons/bin-1.svg";
import blockedIcon from "../icons/allowances-no-talking.svg";

import "./MyTeams.scss"
import {Button} from "../components/Button";


export const MyTeams = () => {
    const navigate = useNavigate();
    const [teams, setTeams] = useState({
        teamSummaries: []
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [displayedTeams, setDisplayedTeams] = useState([]);
    const [teamsFilter, setTeamsFilter] = useState({value: "ALL", label: ""});

    useEffect(() => {
        getMyTeams().then(teams => {
            setTeams(teams);
            setTeamsFilter({value: "ALL", label: `${I18n.t(`myteams.filters.all`)} (${teams.teamSummaries.length})`});
        })
    }, []);

    useEffect(() => {
        updateDisplayedTeams()
    }, [teams, searchQuery, teamsFilter])

    const updateDisplayedTeams = () => {
        const toDisplay = teams.teamSummaries.filter(team => {
            if (teamsFilter.value != team.role && teamsFilter.value != 'ALL') {
                return
            }

            if (searchQuery === "") {
                return team;
            } else if (team.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return team
            }
        })
        setDisplayedTeams(toDisplay)
    }

    const renderPrivateTag = viewable => {
        const tag = <span className="private-label">
            <span><img src={blockedIcon} alt="Private"/>{I18n.t("myteams.private")}</span>

        </span>
        return (
            <>{viewable ? I18n.t("myteams.empty") : tag}</>
        )
    }

    const processDelete = team => {
        //TODO first show confirmation modal
        deleteTeam(team.id).then(() => {
            getMyTeams().then(teams => {
                setTeams(teams);
            })
        })
    }

    const renderAddMemberLink = team => {
        const link = <Link to={{pathname: "/", state: {team: team}}}>{I18n.t("myteams.add_members")}</Link>
        return (
            <>{ROLES.MEMBER !== team.role ? link : I18n.t("myteams.empty")}</>
        )
    }

    const renderDeleteButton = team => {
        const icon = <img className="binIcon" src={binIcon} alt="Delete" onClick={() => processDelete(team)}/>
        return (
            <>{[ROLES.OWNER, ROLES.ADMIN].includes(team.role) ? icon : I18n.t("myteams.empty")}</>
        )
    }

    const renderTeamsRow = team => {
        return (<tr>
            <td><Link to={`/team-details/${team.id}`}>{team.name}</Link></td>
            <td>{team.membershipCount}</td>
            <td>{renderPrivateTag(team.viewable)}</td>
            <td>{renderAddMemberLink(team)}</td>
            <td>{renderDeleteButton(team)}</td>
        </tr>)
    }

    const renderTeamsSearch = () => {
        return (
            <span className="teams-search-bar">
                <input placeholder="Search" onChange={e => setSearchQuery(e.target.value)}/>
                <SearchIcon/>
            </span>
        )
    }

    const renderFilterDropdown = () => {
        class FilterCount {
            constructor(value) {
                this.action = () => {
                    setTeamsFilter({value: this.value, label: this.name})
                }
                this.value = value
                if (value === 'ALL') {
                    this.count = teams.teamSummaries.length;
                    return this;
                }
                this.count = 0
            }

            get name() {
                return `${I18n.t(`myteams.filters.${this.value.toLowerCase()}`)} (${this.count})`
            }
        }

        const filters = ['ALL', ROLES.OWNER, ROLES.ADMIN, ROLES.MANAGER, ROLES.MEMBER]
        const options = filters.map(filter => new FilterCount(filter))

        teams.teamSummaries.forEach(team => {
            options.forEach(option => {
                if (option.value === team.role) {
                    option.count++;
                }
            })
        })

        return (
            <span className={"filter-dropdown-span"}>
                <DropDownMenu title={teamsFilter.label} actions={options}/>
            </span>
        )
    }

    const renderNewTeamButton = () => {
        const buttonClicked = () => {
            navigate("/new-team");
        }
        return <Button onClick={buttonClicked} txt={I18n.t(`myteams.new_team`)} className="new-team-button"/>
    }

    const renderTeamsTable = () => {
        const headers = ["title", "members", "private", "member", "bin"];
        return (
            <Page>
                <h2>My teams</h2>
                <span
                    className="team-actions-bar"> {renderFilterDropdown()}{renderTeamsSearch()}{renderNewTeamButton()}</span>
                <table>
                    <thead>
                    <tr>
                        {headers.map(header => <th className={header}>
                            {I18n.t(`myteams.columns.${header}`)}
                        </th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {displayedTeams.map(team => renderTeamsRow(team))}
                    </tbody>
                </table>
            </Page>
        )
    }

    return (
        <div className="my-teams-container">
            <div>TODO - delete confirmation modal</div>
            {renderTeamsTable()}
        </div>
    );

}