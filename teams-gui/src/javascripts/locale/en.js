// Interpolation works as follows:
//
// Make a key with the translation and enclose the variable with {{}}
// ie "Hello {{name}}" Do not add any spaces around the variable name.
// Provide the values as: I18n.t("key", {name: "John Doe"})
import I18n from "i18n-js";

I18n.translations.en = {
    code: "EN",
    name: "English",
    select_locale: "Select English",

    boolean: {
        yes: "Yes",
        no: "No"
    },

    date: {
        month_names: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },

    header: {
        title: "Teams",
        links: {
            help_html: "<a href=\"https://github.com/OpenConext/OpenConext-teams-NG\" target=\"_blank\">Help</a>",
            logout: "Logout",
            exit: "Exit"
        },
        role: "Role"
    },

    navigation: {
        my_teams: "My Teams",
        external_teams: "Institution Teams"
    },

    teams: {
        title: "My teams",
        name: "Team name",
        description: "Description",
        searchPlaceHolder: "SEARCH / JOIN ALL PUBLIC TEAMS...",
        role: "My role",
        membershipCount: "Members",
        actions: "",
        actions_phone: "Actions",
        flash: "Team '{{name}}' was successfully {{action}}",
        flash_updated: "updated",
        flash_created: "created",
        flash_deleted: "deleted",
        confirmation: "Are your sure you want to delete team {{name}}?",
        edit: "Edit",
        delete: "Delete",
        join: "JOIN",
        received_join_request: "1 received join request",
        received_join_requests: "{{count}} received join requests",
        pending_invitation: "1 pending invitation",
        pending_invitations: "{{count}} pending invitations",
        no_found: "You are not a member of a team",
        filtered: "You have filtered all your teams",
        add: "ADD",
        join_request: "Join request: ",
        created: "Date: ",
        message: "Message: ",
        action_options: {
            join_request_resend: "Resend join request",
            join_request_remove: "Delete join request",
            invite_member: "Invite member",
            team_delete: "Delete team",
            team_details: "Team details"
        },
        confirmation_join_request: "Are you sure you want to delete your join request for team {{name}}?",
        flash_join_request: "Join request for team {{name}} was deleted"
    },

    team_detail: {
        back: "BACK TO MY TEAMS",
        urn: "Identifier",
        description: "Description",
        personalNote: "Personal note",
        viewable: "Public team",
        viewable_info: "People can see team information and request membership for this team. Non-public teams are only visible for members.",
        name: "Name",
        actions: "...",
        confirmation: "Are you sure you want to delete team {{name}}?",
        deleted: "Successfully deleted team {{name}}",
        leave_confirmation: "Are you sure you want to leave team {{name}}",
        left: "Successfully left team {{name}}",
        leave: "Leave",
        team_members: "MEMBERS ({{count}})",
        team_groups: "LINKED GROUPS ({{count}})",
        membership: {
            name: "name",
            email: "email",
            status: "status",
            role: "role",
            actions: "",
        },
        email: "Email",
        actions_phone: "Actions",
        status: "Status",
        role: "Role",
        pending: "PENDING",
        resend_invitation: "Resend invitation",
        delete: "Delete",
        edit: "Edit",
        invite: "Invite",
        link_to_institution_team: "Add",
        search_members_placeholder: "Search members",
        no_found: "No members found",
        copy: "Copy to clipboard",
        copied: "Copied",
        one_admin_warning: "You are the only admin in the team. It is best practice for back-up purposes to have at least two administrators for each team.",
        add: "INVITE",
        role_changed: "Role for {{name}} changed to {{role}}",
        downgrade_current_user: "Are you sure you don't want to be administrator anymore in team {{name}}? You can't reverse this decision yourself.",
        action_options: {
            join_request_accept: "Accept join request",
            join_request_reject: "Reject join request",
            invite_resend: "Resent invitation",
            invite_delete: "Resent invitation",
            member_delete: "Delete member"
        }
    },
    join_request : {
        title: "Join request",
        team: {
            name: "Team name",
            description: "Description",
            admins: "Administrators",
        },
        cancel: "Cancel",
        submit: "Join request",
        resubmit: "Resent",
        flash: "Your request to join {{name}} has been sent to the administrators",
        previous: "Outstanding join request",
        previous_message: "You have a pending join request for this team sent on {{date}}",
        share_info: "Share this information with the applications used by this team.",
        approval_required: "You need to approve that the information may be shared",
        message: "Message",
        message_info: "Your personal invitation message for the fellow admin of this team",
        message_placeholder: "Your personal message",
    },
    icon_legend: {
        admin: "Admin",
        manager: "Manager",
        member: "Member",
        invitation: "Invitation",
        join_request: "Join Request"
    },
    sort: {
        label: "SORT BY",
        name: "Name",
        status: "Status",
        email: "Email",
        role: "Role",
        description: "Description",
        membershipCount: "Members"
    },
    filter: {
        ADMIN: "Admins",
        MANAGER: "Manager",
        MEMBER: "Members",
        JOIN_REQUEST: "Join requests",
        INVITATION: "Invitations",
        label: "SHOW",
        all: "ALL",
        selected: "FILTERED",

    },

    new_team: {
        title: "New team",
        name: "Team name",
        name_info: "The name of the team cannot be changed once the team has been created.",
        format_error: "The allowed characters for a team name are words, spaces, minuses and the ' separator",
        already_exists_error: "There is already a team with this name",
        required: "The name is required",
        description: "Description",
        description_info: "The description of the team is visible for everyone if you make this a public team. Otherwise only members can view the description.",
        viewable_info: "List this team in the public teams index so people can see team information and request membership for this team.",
        personal_note: "Personal note",
        personal_note_info: "This is ony visible for yourself and other administrators of the team. It is recommended to express here what you want to do with the team, if you can.",
        admins: "admins",
        admins_info: "It is highly recommended to invite another administrator.",
        admins_email_placeholder: "Enter email address for another admin...",
        invalid_email: "Invalid email",
        invitation_message: "Message",
        invitation_message_info: "Your personal invitation message for the fellow admin of this team",
        invitation_language: "Invitation language",
        current_user: "{{name}} (It's you)",
        share_info: "Share this information with the applications used by this team.",
        approval_required: "You need to approve that the information may be shared",
        submit: "CREATE",
        cancel: "CANCEL",
        cancel_confirmation: "Are you sure you want to leave this page?"
    },
    invite: {
        title: "Invite member",
        email: "Add members by email address",
        emails_placeholder: "Enter one or more email address...",
        email_required: "Email is required - either add an email or select a file containing comma separated emails",
        email_invalid: "Email format is invalid.",
        file_import: "Add members by file import",
        file_placeholder: "Select csv or txt file...",
        file_import_result: "Import {{nbr}} emails from {{fileName}}",
        file_extension_error: "Only csv extension files are allowed",
        role: "Role within the team",
        invitation_language: "Invitation language",
        expiry_date: "Expiry date",
        expiry_date_placeholder: "Expiry date for membership",
        expiry_date_none: "None",
        message: "Message",
        message_info: "Your personal invitation message",
        submit: "Invite members",
        cancel: "Cancel",
        flash: "Invitation has been sent",
        message_placeholder: "Personal message to be included in the invitation email"

    },

    profile: {
        email: "Email",
        role: "Role",
        true: "SURFconext Guest",
        false: "SURFconext Member"
    },

    auto_complete: {
        no_results: "No results"
    },

    not_found: {
        title: "The requested page could not be found.",
        description_html: "Please try again later or contact <a href=\"mailto:support@surfconext.nl\">support@surfconext.nl</a>."
    },

    server_error: {
        title: "The Teams application is currently unavailable.",
        description_html: "Please try again later or contact <a href=\"mailto:support@surfconext.nl\">support@surfconext.nl</a>."
    },

    logout: {
        title: "Logout completed successfully.",
        description_html: "You <strong>MUST</strong> close your browser to complete the logout process."
    },

    footer: {
        surfnet_html: "<a href=\"https://www.surfnet.nl/en\" target=\"_blank\">SURFnet</a>",
        terms_html: "<a href=\"https://wiki.surfnet.nl/display/conextsupport/Terms+of+Service+%28EN%29\" target=\"_blank\">Terms of Service</a>",
        contact_html: "<a href=\"mailto:support@surfconext.nl\">support@surfconext.nl</a>"
    }

};
