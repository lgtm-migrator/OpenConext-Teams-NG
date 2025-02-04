INSERT INTO `teams` (`id`, `urn`, `name`, `description`, `viewable`, `public_link`, `public_link_disabled`)
VALUES (1, 'demo:openconext:org:riders', 'riders', 'we are riders', 1, 'wZiomLDTk3CU2FR9bRy1IFCfYSqt5AFwSAs74M1EuIQs3D', 0);
INSERT INTO `teams` (`id`, `urn`, `name`, `description`, `viewable`, `personal_note`, `public_link`, `public_link_disabled`)
VALUES (2, 'demo:openconext:org:giants', 'giants', 'we are giants', 1, 'Why did I create this team', 'ErtOpeSiYdEluAMd53CXs4TnN3RyrHUIHdaxImw3q1A3D', 1);
INSERT INTO `teams` (`id`, `urn`, `name`, `description`, `viewable`, `public_link`, `public_link_disabled`)
VALUES (3, 'demo:openconext:org:gliders', 'gliders', 'we are gliders', 1, '72MpWBjvo2F753r2ff960VMgwx113svKq9u4js8MBu303D', 0);
INSERT INTO `teams` (`id`, `urn`, `name`, `description`, `viewable`, `public_link`, `public_link_disabled`)
VALUES (4, 'demo:openconext:org:masters', 'masters', 'we are masters', 1, 'n78zCdrYZJ3SeZuD9OKNNzdHU2BkHusBn3ywL2FjVnGg3D', 0);
INSERT INTO `teams` (`id`, `urn`, `name`, `description`, `viewable`, `public_link`, `public_link_disabled`)
VALUES (5, 'demo:openconext:org:wolves', 'wolves', 'we are wolves', 1, '2FZL8C58WtmVqOot12Fz2FJLMCZk5PzFq4tbOl5sm3Z7hk3D', 0);
INSERT INTO `teams` (`id`, `urn`, `name`, `description`, `viewable`, `public_link`, `public_link_disabled`)
VALUES (6, 'demo:openconext:org:private', 'private', 'we are private', 0, 'secret', 1);
INSERT INTO `teams` (`id`, `urn`, `name`, `description`, `viewable`, `public_link`, `public_link_disabled`)
VALUES (7, 'demo:openconext:org:orphan', 'orphans', 'i am orphan', 1, 'V7cp5sisDgFnrcYekbTYOx3KqhkJlk2M5pBBtuvp6gU3D', 0);
INSERT INTO `teams` (`id`, `urn`, `name`, `description`, `viewable`, `public_link`, `public_link_disabled`)
VALUES (8, 'demo:openconext:org:super_admins', 'super_admins', 'super_admins', 1, NULL, 1);


INSERT INTO `persons` (`id`, `urn`, `name`, `email`, `guest`)
VALUES (1, 'urn:collab:person:surfnet.nl:jdoe', 'John Doe', 'john.doe@example.org', 0);
INSERT INTO `persons` (`id`, `urn`, `name`, `email`, `guest`)
VALUES (2, 'urn:collab:person:surfnet.nl:mdoe', 'Mary Doe', 'mary.doe@example.org', 1);
INSERT INTO `persons` (`id`, `urn`, `name`, `email`, `guest`)
VALUES (3, 'urn:collab:person:surfnet.nl:wdoe', 'William Doe', 'william.doe@example.org', 0);
INSERT INTO `persons` (`id`, `urn`, `name`, `email`, `guest`)
VALUES (4, 'urn:collab:person:surfnet.nl:tdoe', 'Tracey Doe', 'tracey.doe@example.org', 1);
INSERT INTO `persons` (`id`, `urn`, `name`, `email`, `guest`)
VALUES (5, 'urn:collab:person:surfnet.nl:rdoe', 'Ronald Doe', 'ronald.doe@example.org', 0);
INSERT INTO `persons` (`id`, `urn`, `name`, `email`, `guest`)
VALUES (6, 'urn:collab:person:example.com:john.doe', 'John Doe Junior', 'junior@domain.net', 1);
INSERT INTO `persons` (`id`, `urn`, `name`, `email`, `guest`, `last_login_date`)
VALUES (7, 'urn:collab:person:example.com:unhappy', 'Unhappy User', 'unhappy@domain.net', 0, '2018-05-17 09:32:12');
INSERT INTO `persons` (`id`, `urn`, `name`, `email`, `guest`, `last_login_date`)
VALUES (8, 'urn:collab:person:example.com:owner', 'Owner User', 'owner@domain.net', 0, '2018-05-17 09:32:12');
INSERT INTO `persons` (`id`, `urn`, `name`, `email`, `guest`, `last_login_date`)
VALUES (9, 'urn:collab:person:surfnet.nl:super_admin', 'Super Admin', 'super@admin.net', 0, '2032-05-17 09:32:12');

INSERT INTO `memberships` (`id`, `role`, `team_id`, `urn_team`, `person_id`, `urn_person`, `origin`, `approved_by`)
VALUES (1, 'ADMIN', 1, 'demo:openconext:org:riders', 1, 'urn:collab:person:surfnet.nl:jdoe', 'INITIAL_ADMIN', 'John Doe');
INSERT INTO `memberships` (`id`, `role`, `team_id`, `urn_team`, `person_id`, `urn_person`, `origin`, `approved_by`)
VALUES (2, 'MANAGER', 2, 'demo:openconext:org:giants', 1, 'urn:collab:person:surfnet.nl:jdoe', 'PUBLIC_LINK', 'John Doe');
INSERT INTO `memberships` (`id`, `role`, `team_id`, `urn_team`, `person_id`, `urn_person`, `origin`, `approved_by`)
VALUES (3, 'MEMBER', 3, 'demo:openconext:org:gliders', 1, 'urn:collab:person:surfnet.nl:jdoe', 'INVITATION_ACCEPTED', 'John Doe');
INSERT INTO `memberships` (`id`, `role`, `team_id`, `urn_team`, `person_id`, `urn_person`, `origin`, `approved_by`)
VALUES (4, 'ADMIN', 2, 'demo:openconext:org:giants', 2, 'urn:collab:person:surfnet.nl:mdoe', 'JOIN_REQUEST_ACCEPTED', 'John Doe');
INSERT INTO `memberships` (`id`, `role`, `team_id`, `urn_team`, `person_id`, `urn_person`, `origin`, `approved_by`)
VALUES (5, 'OWNER', 2, 'demo:openconext:org:giants', 3, 'urn:collab:person:surfnet.nl:wdoe', 'INITIAL_ADMIN', 'John Doe');
INSERT INTO `memberships` (`id`, `role`, `team_id`, `urn_team`, `person_id`, `urn_person`, `origin`, `approved_by`)
VALUES (6, 'MEMBER', 2, 'demo:openconext:org:giants', 4, 'urn:collab:person:surfnet.nl:tdoe', 'INITIAL_ADMIN', 'John Doe');
INSERT INTO `memberships` (`id`, `role`, `team_id`, `urn_team`, `person_id`, `urn_person`)
VALUES (7, 'ADMIN', 3, 'demo:openconext:org:gliders', 4, 'urn:collab:person:surfnet.nl:tdoe');
INSERT INTO `memberships` (`id`, `role`, `team_id`, `urn_team`, `person_id`, `urn_person`)
VALUES (8, 'ADMIN', 3, 'demo:openconext:org:gliders', 5, 'urn:collab:person:surfnet.nl:rdoe');
INSERT INTO `memberships` (`id`, `role`, `team_id`, `urn_team`, `person_id`, `urn_person`)
VALUES (9, 'ADMIN', 4, 'demo:openconext:org:masters', 5, 'urn:collab:person:surfnet.nl:rdoe');
INSERT INTO `memberships` (`id`, `role`, `team_id`, `urn_team`, `person_id`, `urn_person`, `expiry_date`)
VALUES (10, 'MEMBER', 1, 'demo:openconext:org:riders', 5, 'urn:collab:person:surfnet.nl:rdoe', '2032-05-17 09:32:12');
INSERT INTO `memberships` (`id`, `role`, `team_id`, `urn_team`, `person_id`, `urn_person`)
VALUES (11, 'ADMIN', 5, 'demo:openconext:org:wolves', 3, 'urn:collab:person:surfnet.nl:wdoe');
INSERT INTO `memberships` (`id`, `role`, `team_id`, `urn_team`, `person_id`, `urn_person`)
VALUES (12, 'ADMIN', 7, 'demo:openconext:org:orphan', 7, 'urn:collab:person:example.com:unhappy');
INSERT INTO `memberships` (`id`, `role`, `team_id`, `urn_team`, `person_id`, `urn_person`)
VALUES (13, 'OWNER', 1, 'demo:openconext:org:riders', 8, 'urn:collab:person:example.com:owner');
INSERT INTO `memberships` (`id`, `role`, `team_id`, `urn_team`, `person_id`, `urn_person`)
VALUES (14, 'MEMBER', 8, 'demo:openconext:org:super_admins', 9, 'urn:collab:person:surfnet.nl:super_admin');
INSERT INTO `memberships` (`id`, `role`, `team_id`, `urn_team`, `person_id`, `urn_person`)
VALUES (15, 'ADMIN', 6, 'demo:openconext:org:private', 8, 'urn:collab:person:example.com:owner');


INSERT INTO `external_groups` (`id`, `description`, `group_provider`, `identifier`, `name`)
VALUES (1, 'test description 1', 'org.example', 'urn:collab:group:example.org:name1', 'name1');
INSERT INTO `external_groups` (`id`, `description`, `group_provider`, `identifier`, `name`)
VALUES (2, 'test description 2', 'org.example', 'urn:collab:group:example.org:name2', 'name2');

INSERT INTO `team_external_groups` (`id`, `team_id`, `external_groups_id`) VALUES (1, 1, 1);
INSERT INTO `team_external_groups` (`id`, `team_id`, `external_groups_id`) VALUES (2, 1, 2);
INSERT INTO `team_external_groups` (`id`, `team_id`, `external_groups_id`) VALUES (3, 2, 2);

INSERT INTO `invitations` (`id`, `mailaddress`, `timestamp`, `invitation_uiid`, `denied`, `accepted`, `intended_role`, `language`, `team_id`, `expiry_date`)
VALUES
  (1,'test@example.com', 2491484828910, 'secret', 0, 0, 'MANAGER', 'DUTCH', 1, '2017-09-29 00:00:00');
INSERT INTO `invitations` (`id`, `mailaddress`, `timestamp`, `invitation_uiid`, `denied`, `accepted`, `intended_role`, `language`, `team_id`)
VALUES
  (2,'john.doe@example.org', 2491484828910, 'secret2', 0, 0, 'ADMIN', 'DUTCH', 5);
INSERT INTO `invitations` (`id`, `mailaddress`, `timestamp`, `invitation_uiid`, `denied`, `accepted`, `intended_role`, `language`, `team_id`)
VALUES
  (3,'whoknows@example.org', 2491484828910, 'secret3', 0, 0, 'ADMIN', 'DUTCH', 7);

INSERT INTO `invitation_message` (`id`, `message`, `timestamp`, `invitation_id`, `person_id`)
VALUES
  (1, 'Please join', 2491484828910, 1, 5);
INSERT INTO `invitation_message` (`id`, `message`, `timestamp`, `invitation_id`, `person_id`)
VALUES
  (2, 'Please join now', 2491484828910, 2, 1);

INSERT INTO `requests` (`id`, `message`, `team_id`, `person_id`)
VALUES
  (1, 'Please let me join', 1, 6);
INSERT INTO `requests` (`id`, `message`, `team_id`, `person_id`)
VALUES
  (2, 'Please let me join too', 1, 2);
INSERT INTO `requests` (`id`, `message`, `team_id`, `person_id`)
VALUES
  (3, 'Please, please let me join', 4, 1);
INSERT INTO `requests` (`id`, `message`, `team_id`, `person_id`)
VALUES
  (4, 'Please, please let me join', 7, 7);
