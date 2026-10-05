-- ====================================================================
-- Roxiler Systems Store Rating Platform - Production Demo & Seed Dataset
-- Idempotent SQL Insert Script (ON DUPLICATE KEY UPDATE)
-- Database: MySQL (mysql2)
--
-- Passwords:
-- Admin:        Admin@123
-- Store Owners: Owner@123
-- Users:        User@123
-- ====================================================================

USE `roxiler_db`;

SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------------------
-- 1. USERS (75 Records: Admins, Store Owners, Normal Users)
-- --------------------------------------------------------------------
INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('d817b9cf-7649-4c9d-9d7a-af094f05464d', 'Abhishek Ramanathan Iyer', 'abhishek.iyer@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'Plot 42, 4th Cross, Gandhi Nagar, Adyar, Chennai, Tamil Nadu 600020', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('d1d730a7-8606-40fc-88ab-84f603f5ce09', 'Alexander Christian Montgomery', 'addr400.1791185755473@example.com', '$2a$10$WC6lCbJxc4EY8.mJbgfrbe3wuswd2y5eV7B.8XXhmcx4BzZxXrMku', 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('cb740fd4-e3a9-449f-b0fa-30cc27e7f24a', 'Alexander Christian Montgomery', 'addr400.1791191757652@example.com', '$2a$10$o4mw9sXP3lhmQc5kpjablO4KZc7JWOX2tlwQqHsnw2Yt4CCh/oX3S', 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('95910edc-5291-4f37-b40d-c2cab8b2b9ac', 'Alexander Christian Montgomery', 'addr400.1791193474216@example.com', '$2a$10$D681y7UGU/VrjjAWQ7sNsuGHlgRohyCypybuTm8Xevi8.YuSm2KSq', 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('0d4b25eb-f4bd-4f8a-8288-a2d22bbc658d', 'Aditya Narayan Deshmukh', 'aditya.deshmukh@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'B-12 Woodland Heights, Kothrud, Pune, Maharashtra 411038', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('3721556f-4916-41b7-bc22-e327e49511a4', 'Executive Systems Director Roxiler', 'admin.added.admin.1791185756363@example.com', '$2a$10$bAZoPcYRmPSQNaBIwk.shOWI3JY2UmhAJSKuuH59mOVZUTNP3gIbm', '100 Enterprise Way, Suite 800, San Jose, CA', 'ADMIN', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('4b4428b2-eb05-44b3-9b69-5293b520969b', 'Executive Systems Director Roxiler', 'admin.added.admin.1791191759067@example.com', '$2a$10$w0uDUvsKMz0oZrs7Dn/.ueBnzBnwnemBTM3UZnAep9BTWy5F62wgu', '100 Enterprise Way, Suite 800, San Jose, CA', 'ADMIN', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('8024798e-15a1-4395-bddb-aae946260011', 'Executive Systems Director Roxiler', 'admin.added.admin.1791193474725@example.com', '$2a$10$gODADDWL3SPJqBP8YNJJneh0S34cIvETsl9YHFbztDW4qZlfS57Sm', '100 Enterprise Way, Suite 800, San Jose, CA', 'ADMIN', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('f0e1e54f-487d-49ee-b637-2f999708c5fe', 'Benjamin Harrison Abernathy', 'admin.added.user.1791185756162@example.com', '$2a$10$SkKpAvWiQcujlY60KUyFEO7DFoiQoEmuTYwbcki60BPuLMO7jNula', '900 Grand Avenue, Suite 10, Denver, CO', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('5b84c49c-b9b2-4191-9b77-b7cbce4eeb36', 'Benjamin Harrison Abernathy', 'admin.added.user.1791191758747@example.com', '$2a$10$/UB6hPiIXI3Vye4dPDDUFuM/5Ri/j2ULNlM/.FRLkyeMCSxor24E6', '900 Grand Avenue, Suite 10, Denver, CO', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('9ca707da-8550-49ae-90a4-e6b3392c38c5', 'Benjamin Harrison Abernathy', 'admin.added.user.1791193474615@example.com', '$2a$10$3AeCFQ1IpF6Lc3HWkzaDbOD6wVjCL0yK75KH/xtv8TKT/WukoaoHy', '900 Grand Avenue, Suite 10, Denver, CO', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('b88d7835-d6a7-49fe-8f59-50cd0b0e4c44', 'Chief Technology Administrator', 'admin.demo@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.vUf6hQ8n2R6FCEOLZkqrmpyowmRxAhe', 'Plot 104, IT Park, Bhopal, Madhya Pradesh 462023', 'ADMIN', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('b505fc37-4372-4410-9b8c-532238bec4d5', 'Senior Compliance Administrator', 'admin.super@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.vUf6hQ8n2R6FCEOLZkqrmpyowmRxAhe', 'Level 14, Tower B, Cyber City, Gurugram, Haryana 122002', 'ADMIN', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('d9a2d32d-8bcf-4db6-bea0-2a7b4da11fb8', 'System Administrator Roxiler', 'admin@roxiler.com', '$2a$10$2dqyjFem2UBPETy.gDNkVOdapMvwxcLRG9wrAS8zsliX1vHUL6Qd6', '742 Evergreen Terrace, Springfield Sector 4, Enterprise City', 'ADMIN', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('0da1d6da-3f1e-45e3-8266-56265d994ebe', 'Aishwarya Ravindra Bhat', 'aishwarya.bhat@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'Flat 603, Manipal Heights, Light House Hill, Mangaluru, Karnataka 575001', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('6f87f33f-61a4-4470-abbb-33e5a1be55e2', 'Ajay Singh Rathorefdjnsd', 'ajaygurjar78692@gmail.com', '$2a$10$Q5GnTX7KxzaxwGOZDmN/y.a5dLIeTl2QS0k7/xztJaBOvA77uKRKu', 'berfad kurd post machalur teshil maheswer district khargone', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('f0b46aae-5b4e-4b80-a929-8467b5f9674a', 'Alexandra Turner Montgomery', 'alexandra.turner@example.com', '$2a$10$2dqyjFem2UBPETy.gDNkVOL6kdT8b9qz7diEX0vw7j7jNW8Gc9DFa', '124 Elm Street, Apt 3B, Boston, MA 02108', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('d6978395-c18b-43e6-9121-94d7ec97ea22', 'Anjali Shashikant Kulkarni', 'anjali.kulkarni@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'Flat 304, Swapnapurti Enclave, Aundh, Pune, Maharashtra 411007', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('df1c065b-a8a1-49e2-aea0-ed992d199c4d', 'Arjun Chandrasekhar Varma', 'arjun.varma@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'Villa 19, Whisper Valley, Jubilee Hills, Hyderabad, Telangana 500033', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('7960d563-b5a5-4dff-bc71-0893da29039d', 'Alexander Christian Montgomery', 'audit.user.1791185753104@example.com', '$2a$10$wMQ75KGtzjfqPTJqho0eXeRprj9/kFzSHEUvpMYBrcuxI8BZd9C7m', '742 Evergreen Terrace, Sector 7, Enterprise City', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('5aab0cb4-340e-473e-b8b5-995afd9e0b1d', 'Alexander Christian Montgomery', 'audit.user.1791191754877@example.com', '$2a$10$ppnBWd91CQWoOSXdDlV76Oqq6IrgUYIgp32mOogB57jVqypmcHYP.', '742 Evergreen Terrace, Sector 7, Enterprise City', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('da517ce3-d4b8-4d2a-bbe5-c80f2a873f4d', 'Alexander Christian Montgomery', 'audit.user.1791193472929@example.com', '$2a$10$XcKvFxga5l7O/fIQBRI07e7uAHh1aCIOnVh6K/50hDHbCecgQ9lbi', '742 Evergreen Terrace, Sector 7, Enterprise City', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('a56e6d27-f813-4d1c-8ff9-a76dd29b576c', 'Christopher Benjamin Hayes', 'christopher.hayes@example.com', '$2a$10$2dqyjFem2UBPETy.gDNkVOL6kdT8b9qz7diEX0vw7j7jNW8Gc9DFa', '884 Pinehurst Avenue, Austin, TX 78701', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('f9d84cf0-15a4-4fbc-936a-0bbd48dbceee', 'Divya Priyadarshini Menon', 'divya.menon@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', '18 Jawahar Nagar, Kadavanthra, Ernakulam, Kerala 682020', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('145dce9f-e7db-4e3a-b7b6-96275501a1ac', '12345678901234567890', 'exact20.1791185755112@example.com', '$2a$10$AtSIVwbDPJZdos7q74j1Puxd4m3E0WnqkbmK0NsjVE7tzM8Wlc.a2', '123 Valid Address Boulevard', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('4533fa1f-fe15-49b5-a7fc-8d735d54a054', '12345678901234567890', 'exact20.1791191757067@example.com', '$2a$10$wcqRy.7Pu0pyhhJuHw26O.93hHwTanQL.D5wleoFfoUerGVAJ6frq', '123 Valid Address Boulevard', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('6c0e84e1-9dd2-41d6-acae-42bb70e3b1b4', '12345678901234567890', 'exact20.1791193473985@example.com', '$2a$10$cjB.umzMv6so.EWSUhnMbej3rCuj8WLcScIHYa0VRKzuiV6rwskL.', '123 Valid Address Boulevard', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('1932bd3e-e5f4-4fb7-abc3-d115ca0b35e0', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'exact60.1791185755282@example.com', '$2a$10$1bg/bzZ.FPBdm0x1JtYOduQBi/CcjrKPHy0OryjUJ2CJFfT4i5Nf.', '123 Valid Address Boulevard', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('22dd9795-c460-47fa-ad8a-6efc1d379c18', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'exact60.1791191757354@example.com', '$2a$10$wDty7WS7nnG..q0AYInTDOTMVc4hScwVYDiDscSOouaNPsRx1kfP.', '123 Valid Address Boulevard', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('9b36eaaa-1d89-489d-ba91-5479daaa09f7', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'exact60.1791193474094@example.com', '$2a$10$f3dybmy/Yiy9Wg99tJtAi.l8fIT7Hxe6qhvkBt2qjBLu/PrRZVdNm', '123 Valid Address Boulevard', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('7c57de1f-7938-4165-9cc6-30b39a74c2f7', 'Gaurav Birendra Shekhawat', 'gaurav.shekhawat@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'C-28 Malviya Nagar, Near Calgiri Hospital, Jaipur, Rajasthan 302017', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('1a987bd6-afc0-4a97-9f83-827e05209a17', 'Genevieve Katherine Campbell', 'genevieve.campbell@example.com', '$2a$10$2dqyjFem2UBPETy.gDNkVOL6kdT8b9qz7diEX0vw7j7jNW8Gc9DFa', '512 Oakwood Boulevard, Seattle, WA 98101', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('e84da208-b5c7-451a-a6c4-c115e37b5bbb', 'Karthik Soundararajan Mani', 'karthik.mani@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', '77 Luz Church Road, Mylapore, Chennai, Tamil Nadu 600004', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('80ea9876-8325-4466-b6be-1e07b5092b98', 'Kavita Rajendran Nambiar', 'kavita.nambiar@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'Block D, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('c25cc27c-4a70-4ec5-a5a8-bd42ab9ec176', 'Kunal Harishchandra Jadhav', 'kunal.jadhav@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', '56 Ramdas Peth, Central Avenue Road, Nagpur, Maharashtra 440010', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('dd4fa5d2-fba9-4205-9b54-99184036d0f3', 'Manish Chandrashekhar Rao', 'manish.rao@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'House 89, Banjara Hills Road No 12, Hyderabad, Telangana 500034', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('95484a85-a954-4cf6-87c2-4de5acec1be6', 'Meera Ramakrishnan Pillai', 'meera.pillai@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', '22 Poes Garden, Cathedral Road, Chennai, Tamil Nadu 600086', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('651b5258-e229-46c4-a125-f332b6cbef8d', 'Naveen Gangadharan Namboodiri', 'naveen.namboodiri@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'House 4, Sasthamangalam Junction, Thiruvananthapuram, Kerala 695010', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('6b0aea84-aa56-4eef-9a7e-2601fd36fe11', 'Neha Suryakant Chaurasia', 'neha.chaurasia@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'Sector B, Aliganj Housing Scheme, Lucknow, Uttar Pradesh 226024', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('1815e249-de70-4eea-a9ce-47be3aec0870', 'Anuradha Vikramaditya Joshi', 'owner.anuradha@heritagebooks.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.zKnz5avtY6l8cFlH7XCcpYVKujVEqZO', 'Fergusson College Road, Shivajinagar, Pune, Maharashtra 411004', 'STORE_OWNER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('3574921e-519f-4acf-8f39-fe3abdb106de', 'Deepak Ranganathan Bengaluru', 'owner.deepak@phonecare.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.zKnz5avtY6l8cFlH7XCcpYVKujVEqZO', '100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038', 'STORE_OWNER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('059717f9-8c38-4427-81f2-46cce9018de8', 'Roxiler Demo Store Owner Account', 'owner.demo@example.com', '$2a$10$8htdhsxuZPb0tiw9NGhCtOrSK5yGWg6vCWs8fRKxsN0y7xhE8aSq6', 'Shop 102, Commercial Arcade, MP Nagar Zone 2, Bhopal, MP 462011', 'STORE_OWNER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('392822c5-9d63-48eb-baa4-fba61e7d1926', 'Devendra Singh Rathore Bhopal', 'owner.devendra@artisanbakery.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.zKnz5avtY6l8cFlH7XCcpYVKujVEqZO', 'Arera Colony, E-3 Sector, Bhopal, Madhya Pradesh 462016', 'STORE_OWNER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('4a76f670-6e99-4557-ba02-740c086f81e3', 'Pooja Suryavanshi Hyderabad', 'owner.empty@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.zKnz5avtY6l8cFlH7XCcpYVKujVEqZO', 'Road No 36, Jubilee Hills, Hyderabad, Telangana 500033', 'STORE_OWNER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('e3515f29-2299-4176-beaa-056722b0c939', 'Harshavardhan Kalyanrao Patil', 'owner.harsh@apexathletic.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.zKnz5avtY6l8cFlH7XCcpYVKujVEqZO', 'Linking Road, Bandra West, Mumbai, Maharashtra 400050', 'STORE_OWNER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('caf244ac-5aec-4ede-9137-c6ff256ba26e', 'Jonathan Edward Masterson', 'owner.john@freshmart.com', '$2a$10$2dqyjFem2UBPETy.gDNkVOiFnyH/f0giKDcRSxpFfDqPTfJlHdl02', '100 Market Boulevard, Suite 400, New York, NY 10001', 'STORE_OWNER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('12860d6d-37c1-44c0-9a0d-c0fd568dadc4', 'Meenakshi Sundaram Pillai', 'owner.meenakshi@quickbite.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.zKnz5avtY6l8cFlH7XCcpYVKujVEqZO', '45 Usman Road, T Nagar, Chennai, Tamil Nadu 600017', 'STORE_OWNER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('b11ff5fc-c9e9-4306-a0df-97c5d36a9d43', 'Rajeshwar Prasad Srivastava', 'owner.rajesh@technova.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.zKnz5avtY6l8cFlH7XCcpYVKujVEqZO', 'Zone 1, Maharana Pratap Nagar, Bhopal, Madhya Pradesh 462011', 'STORE_OWNER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('ce5ec672-f3ae-4ad1-9831-fa48bcc82725', 'Sunil Kumar Chakraborty Kolkata', 'owner.sunil@comfortzone.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.zKnz5avtY6l8cFlH7XCcpYVKujVEqZO', 'Sector 5, Salt Lake City, Bidhannagar, Kolkata, West Bengal 700091', 'STORE_OWNER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('401a8525-933b-40e0-b9fe-f2ebe5d60623', 'Victoria Elizabeth Sterling', 'owner.victoria@techhub.com', '$2a$10$2dqyjFem2UBPETy.gDNkVOiFnyH/f0giKDcRSxpFfDqPTfJlHdl02', '450 Technology Parkway, Innovation District, San Jose, CA 95110', 'STORE_OWNER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('d52d920b-604c-4603-b3b5-63728597731b', 'Pallavi Sachidanand Hegde', 'pallavi.hegde@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', '14 Temple Trees Apartment, Sadashivanagar, Bengaluru, Karnataka 560080', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('a8e3a1f0-55ea-44dd-b521-70a41d671714', 'Pooja Chandrakant Mahajan', 'pooja.mahajan@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'Plot 18, Sindhi Society, Chembur East, Mumbai, Maharashtra 400071', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('3e6b1200-f606-41cf-959a-930d77c6e9fd', 'Priya Darshini Venkatesh', 'priya.venkatesh@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', '32 Alagesan Road, Saibaba Colony, Coimbatore, Tamil Nadu 641011', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('9049e109-68a9-47e7-a28d-f84d24526d83', 'Rahul Ravindranath Tiwari', 'rahul.tiwari@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', '42 Tagore Town, Near Colonelganj, Prayagraj, Uttar Pradesh 211002', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('3984c407-45e4-41e3-9605-addd7bf84c7a', 'Ritika Devenbhai Vaghela', 'ritika.vaghela@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', '102 Shivalik Western, University Road, Ahmedabad, Gujarat 380009', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('024c3e67-1d20-4da9-8f21-23554b2476f9', 'Rohan Dattatraya Kulkarni', 'rohan.kulkarni@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', '34 Tilak Road, Near SP College, Sadashiv Peth, Pune, Maharashtra 411030', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('e0bd7cf7-79d6-4151-9913-f69070a4e2f0', 'Shweta Raghunath Kulkarni', 'shweta.kulkarni@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', '77 Prabhat Road, Lane 11, Deccan Gymkhana, Pune, Maharashtra 411004', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('f364dcf9-fe1d-4bac-94a2-4eae148cefef', 'Siddharth Vijayaraghavan', 'siddharth.v@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'Flat 12A, Brigade Gateway, Malleshwaram, Bengaluru, Karnataka 560055', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('231697a6-5e86-4327-b599-0374c195b0d9', 'Sneha Parameshwaran Nair', 'sneha.nair@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'Flat 5B, Skyline Towers, Panampilly Nagar, Kochi, Kerala 682036', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('a5355709-bf75-4ff8-abef-36e07d03240f', 'Suresh Satyanarayan Gupta', 'suresh.gupta@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', '88 Saket Nagar, Near AIIMS Campus, Bhopal, Madhya Pradesh 462020', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('6dbdfa11-83fa-423b-beab-11384212ab37', 'Swati Ramchandra Bharadwaj', 'swati.bharadwaj@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'Flat 202, Surya Enclave, Shahpura Sector C, Bhopal, MP 462039', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('06b125f0-ad09-43dd-8012-3450a8c294f8', 'Tanvi Shailendra Bandekar', 'tanvi.bandekar@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'B-701 Lake Homes, Powai Vihar Complex, Mumbai, Maharashtra 400076', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('65cd09a5-dc6a-4060-8a82-0744f97be11f', 'Samantha Jacqueline Abernathy', 'test.user.1791179500587@example.com', '$2a$10$uUNon8FTaQqgrsFy8LMRJe/5ulsUwd82WncN.SZkZ0NWkPFXy.6G2', '742 Evergreen Terrace, Springfield Sector 4', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('f1fac246-9a46-4b46-8d33-18de1dc3f80b', 'Samantha Jacqueline Abernathy', 'test.user.1791179705895@example.com', '$2a$10$t9w1PaQlt/ECJ0FyFH7APuQ7xLg6TiaRrXMk/hIKggqgcUO6kcoSm', '742 Evergreen Terrace, Springfield Sector 4', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('5a3d7a37-c7f6-4663-a066-827c9d93e02a', 'Samantha Jacqueline Abernathy', 'test.user.1791185132610@example.com', '$2a$10$.3kWx.oU7s9kue4u3YbuyOdMb2tn7SQ.U6NyiVHS5jbZOyXPLkx/6', '742 Evergreen Terrace, Springfield Sector 4', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('c1edd898-fb76-48b7-a0f0-ce307bb2b49f', 'Samantha Jacqueline Abernathy', 'test.user.1791185182614@example.com', '$2a$10$txP3NoM1tkPtemI8rlBZ7e2AMLtUmIjXzlPxKEdGst6oUyH0qlSra', '742 Evergreen Terrace, Springfield Sector 4', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('4246fac1-cbf1-4903-8c34-727582100693', 'Samantha Jacqueline Abernathy', 'test.user.1791185261216@example.com', '$2a$10$UK.4hEj.hRmxMpRH32bNTONWcnc79FnFGfMbXzLkl2QQYpgyxbo8.', '742 Evergreen Terrace, Springfield Sector 4', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('7036ec02-1fcd-49b1-9da6-25650264c5b4', 'Samantha Jacqueline Abernathy', 'test.user.1791185280706@example.com', '$2a$10$HwkKOPLdS8z49p2se1L5S.M1Riz1uMBhJ.UZL9buan7ayHhFkXfA.', '742 Evergreen Terrace, Springfield Sector 4', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('1d2b1073-87d2-494c-bfca-678703d31be0', 'Samantha Jacqueline Abernathy', 'test.user.1791185532730@example.com', '$2a$10$rE7PZq/4Ao2ocVBE/jZS8ub8n7/HHx7PiiIPdJimN619U66jw7CaG', '742 Evergreen Terrace, Springfield Sector 4', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('2b8f6459-9c13-4bbc-a427-62357473e582', 'Samantha Jacqueline Abernathy', 'test.user.1791185576198@example.com', '$2a$10$fx721bCjkOVWh/LUw90vXObZgX3y/9SQGk5gIzIIZjGahy8HfAUt2', '742 Evergreen Terrace, Springfield Sector 4', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('012f307e-ec24-4a0f-8079-9362a0a07c05', 'Samantha Jacqueline Abernathy', 'test.user.1791191744802@example.com', '$2a$10$Kzg.IGH9N.vovYa8mf9Au.BYrCWhiFG4DT1/KlfPvlFMF/yG/8d8y', '742 Evergreen Terrace, Springfield Sector 4', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('fcd3111c-9381-4c4d-962d-d8abd21ec4b2', 'Samantha Jacqueline Abernathy', 'test.user.1791193380234@example.com', '$2a$10$xZPRcrX6SGIQ2irJSpBO8uJOCE1TzptmfbTX.d7cMc3phX8LDIa1q', '742 Evergreen Terrace, Springfield Sector 4', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('5a1891cf-d538-46ac-b2d4-3e167ce45378', 'Primary Demo Customer User', 'user.demo@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', 'Flat 402, Royal Palms Residency, MP Nagar, Bhopal, MP 462011', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('2355c35c-f735-441a-b0aa-b34fa4eaae2a', 'Vikramaditya Hemant Joshi', 'vikram.joshi@example.com', '$2a$10$aTpUIh.ukJjsPW08LSXPO.2B6JnogL0uP5y2.fziUZ2/L8oEIErhy', '15 Civil Lines, Near Raj Bhavan, Bhopal, Madhya Pradesh 462002', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`)
VALUES ('2aadeb67-bbda-46a8-bda8-0a3ac54615c9', 'Zachary Nathaniel Kensington', 'zachary.kensington@example.com', '$2a$10$2dqyjFem2UBPETy.gDNkVOL6kdT8b9qz7diEX0vw7j7jNW8Gc9DFa', '920 Sunset Terrace, Denver, CO 80202', 'USER', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `address` = VALUES(`address`);

-- --------------------------------------------------------------------
-- 2. STORES (17 Records Across India & Varied Categories)
-- --------------------------------------------------------------------
INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('1fa260c9-4177-42f4-824f-6046708301a4', 'chourasia_pan_bhandar', 'amanc3103@gmail.com', 'bhopal', '401a8525-933b-40e0-b9fe-f2ebe5d60623', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('70c1df9f-0048-4d83-a4ce-77d1555281cf', 'RoyalElegance Ethnic Fashion Boutique', 'boutique@royalelegancefashion.in', 'MGF Metropolitan Mall, Ground Floor, MI Road, Jaipur, Rajasthan 302001', '059717f9-8c38-4427-81f2-46cce9018de8', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('69f62df7-21cc-4df1-b0f9-dca69951b94a', 'TechNova Digital Electronics Hub', 'care@technovadigital.in', 'Opposite Jyoti Cinema, Zone 2, MP Nagar, Bhopal, Madhya Pradesh 462011', 'b11ff5fc-c9e9-4306-a0df-97c5d36a9d43', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('1bd12a62-319d-47c8-8006-1ad9ab739daa', 'FreshHarvest Organic Supermart', 'contact@freshharvestsupermart.com', 'Shop 12-15, DB City Mall, MP Nagar, Bhopal, Madhya Pradesh 462011', 'caf244ac-5aec-4ede-9137-c6ff256ba26e', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('a5f72b5a-0856-4e50-9186-59d443743e79', 'Fresh Organic Market & Deli', 'contact@freshmartorganic.com', '100 Market Boulevard, Suite 400, New York, NY 10001', 'caf244ac-5aec-4ede-9137-c6ff256ba26e', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('ff3593a0-efd6-4b06-a8d6-6ccac2d2cd7c', 'Heritage Books & Literary Lounge', 'curator@heritagebookstore.com', '77 Heritage Row, Philadelphia, PA 19106', '1815e249-de70-4eea-a9ce-47be3aec0870', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('eed267ed-94ad-4a7b-ad0f-811e2921e306', 'Artisan Bakery & Coffee Roasters', 'hello@artisanbakerycoffee.com', '240 Maple Leaf Avenue, Portland, OR 97201', '392822c5-9d63-48eb-baa4-fba61e7d1926', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('148e54ce-0031-4f82-bb8b-f23fa878e41f', 'ComfortZone Home Appliances Depot', 'help@comfortzoneappliances.in', 'Block EP & GP, Sector 5, Salt Lake City, Kolkata, West Bengal 700091', 'ce5ec672-f3ae-4ad1-9831-fa48bcc82725', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('06dc5498-99a9-406b-a7b6-2e99782e7677', 'Apex Athletic Apparel & Gear', 'orders@apexathleticgear.com', '350 Olympic Plaza, Suite 12, Chicago, IL 60601', 'e3515f29-2299-4176-beaa-056722b0c939', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('ace68d8f-2c3c-4680-9a96-acb12e9a248d', 'MetroMart Departmental Supercenter', 'service@metromartsupercenter.in', 'Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('5cdd2f39-97eb-4c8f-b132-0781cf1a07a8', 'QuickBite Daily Essentials Mart', 'service@quickbitemart.in', '12 South Boag Road, T Nagar, Chennai, Tamil Nadu 600017', '12860d6d-37c1-44c0-9a0d-c0fd568dadc4', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('4b3c3beb-989f-46d7-acb0-8b4a9d114e3b', 'Prestige Global Electronics Outlet', 'store.1791185756136@example.com', '500 Innovation Boulevard, Tech Park Tower 3', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('493f3911-0431-45ea-b840-a23798c2dfdb', 'Prestige Global Electronics Outlet', 'store.1791191758711@example.com', '500 Innovation Boulevard, Tech Park Tower 3', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('010ae270-b47b-4b76-904f-fc411fe8085f', 'Prestige Global Electronics Outlet', 'store.1791193474600@example.com', '500 Innovation Boulevard, Tech Park Tower 3', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('e0b883f1-2aca-43b6-98ab-6a752a35691c', 'PhoneCare Gadgets & Accessories', 'support@phonecaregadgets.in', '567 CMH Road, 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038', '3574921e-519f-4acf-8f39-fe3abdb106de', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('bb7c4f51-2d78-49f3-a895-b3ffdbfa38c3', 'Silicon Valley Tech Superstore', 'support@techhubdevices.com', '450 Technology Parkway, Innovation District, San Jose, CA 95110', '401a8525-933b-40e0-b9fe-f2ebe5d60623', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

INSERT INTO `stores` (`id`, `name`, `email`, `address`, `ownerId`, `createdAt`, `updatedAt`)
VALUES ('48bf7baf-a7b7-4ce9-8368-735dc675e89a', 'UrbanNest Living & Furniture Studio', 'support@urbannestfurniture.in', 'Plot 48, Road No 36, Jubilee Hills, Hyderabad, Telangana 500033', '4a76f670-6e99-4557-ba02-740c086f81e3', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `address` = VALUES(`address`), `ownerId` = VALUES(`ownerId`);

-- --------------------------------------------------------------------
-- 3. RATINGS (116 Varied Ratings: Realistic Distributions & No Duplicates)
-- --------------------------------------------------------------------
INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('1ebf35c0-05f1-4634-8049-955895b68045', '0d4b25eb-f4bd-4f8a-8288-a2d22bbc658d', '06dc5498-99a9-406b-a7b6-2e99782e7677', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('223f48fc-4452-456a-893d-4ad5dc6b64f5', '1a987bd6-afc0-4a97-9f83-827e05209a17', '06dc5498-99a9-406b-a7b6-2e99782e7677', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('c99315fa-c5e0-42a6-9ada-33b9863ff9fb', '231697a6-5e86-4327-b599-0374c195b0d9', '06dc5498-99a9-406b-a7b6-2e99782e7677', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('4fa88387-bd42-4fe2-9039-cce7a77d4070', '2aadeb67-bbda-46a8-bda8-0a3ac54615c9', '06dc5498-99a9-406b-a7b6-2e99782e7677', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('fff51821-7f2f-4034-adb9-5df70a295932', '3e6b1200-f606-41cf-959a-930d77c6e9fd', '06dc5498-99a9-406b-a7b6-2e99782e7677', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('49f4b6eb-44d5-4eb7-9eaf-c318402c5ff0', '5a1891cf-d538-46ac-b2d4-3e167ce45378', '06dc5498-99a9-406b-a7b6-2e99782e7677', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('34c08712-d48b-4d6b-b6d1-ec70739c7767', '5aab0cb4-340e-473e-b8b5-995afd9e0b1d', '06dc5498-99a9-406b-a7b6-2e99782e7677', 2, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('8b9832eb-e290-4ce5-a279-cefd5615104e', '6f87f33f-61a4-4470-abbb-33e5a1be55e2', '06dc5498-99a9-406b-a7b6-2e99782e7677', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('91184788-7a5c-4a45-99bd-fd63dff65973', '7960d563-b5a5-4dff-bc71-0893da29039d', '06dc5498-99a9-406b-a7b6-2e99782e7677', 2, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('abef8372-cda7-4c2d-a807-a5ae39783a78', '80ea9876-8325-4466-b6be-1e07b5092b98', '06dc5498-99a9-406b-a7b6-2e99782e7677', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('3e62f8b1-a0ff-468b-a3b1-d9e62ce07d6f', 'a56e6d27-f813-4d1c-8ff9-a76dd29b576c', '06dc5498-99a9-406b-a7b6-2e99782e7677', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('f6f8aa2e-b4cb-4af4-ac77-3692ab53016e', 'da517ce3-d4b8-4d2a-bbe5-c80f2a873f4d', '06dc5498-99a9-406b-a7b6-2e99782e7677', 2, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('c25cb6c9-94f9-429e-8dc6-785a539d4f9d', 'dd4fa5d2-fba9-4205-9b54-99184036d0f3', '06dc5498-99a9-406b-a7b6-2e99782e7677', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('8587cc60-1cda-4212-aab3-72b66b99fcf7', 'f0b46aae-5b4e-4b80-a929-8467b5f9674a', '06dc5498-99a9-406b-a7b6-2e99782e7677', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('7de7aada-f28a-48e0-afac-8b63807d0951', '2355c35c-f735-441a-b0aa-b34fa4eaae2a', '148e54ce-0031-4f82-bb8b-f23fa878e41f', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('3bb4f067-741a-4e78-bd45-ea06d435d6cd', '6b0aea84-aa56-4eef-9a7e-2601fd36fe11', '148e54ce-0031-4f82-bb8b-f23fa878e41f', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('c35efc98-ec82-4a44-9e5e-f878a88738f8', '7c57de1f-7938-4165-9cc6-30b39a74c2f7', '148e54ce-0031-4f82-bb8b-f23fa878e41f', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('bfe4a19a-11a3-4ebb-bcf4-643a0a6b96d0', 'd817b9cf-7649-4c9d-9d7a-af094f05464d', '148e54ce-0031-4f82-bb8b-f23fa878e41f', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('b3daa69b-267b-4499-a7bf-3c777f20732a', 'e0bd7cf7-79d6-4151-9913-f69070a4e2f0', '148e54ce-0031-4f82-bb8b-f23fa878e41f', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('96434680-1822-4148-8785-65b22a386d44', '0d4b25eb-f4bd-4f8a-8288-a2d22bbc658d', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('621f5166-e74b-4540-a518-5ae30953a5f9', '1a987bd6-afc0-4a97-9f83-827e05209a17', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('7f4b4cf6-f2a7-4149-8eaa-10fe185b73d6', '231697a6-5e86-4327-b599-0374c195b0d9', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('cb7c0891-3bb0-430c-aae3-4f359d909c62', '2355c35c-f735-441a-b0aa-b34fa4eaae2a', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('643ab2c9-cda4-4587-a3bd-ceac9db0c04d', '2aadeb67-bbda-46a8-bda8-0a3ac54615c9', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('bc8682b5-2636-40aa-a5b7-ba6b568e0328', '3e6b1200-f606-41cf-959a-930d77c6e9fd', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('7b04b13f-eece-4f25-bc06-f4b8ad050926', '5a1891cf-d538-46ac-b2d4-3e167ce45378', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('b8052cb9-04ff-4ab4-bae8-74411fc6699f', '6b0aea84-aa56-4eef-9a7e-2601fd36fe11', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('d82b09a9-f303-401d-9e73-5e54be07900e', '7c57de1f-7938-4165-9cc6-30b39a74c2f7', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('cdd25b26-64db-4292-a8bb-e71f67ca5bcd', '80ea9876-8325-4466-b6be-1e07b5092b98', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('f3b4413a-0f5b-4c5e-bc81-33e21d5b9314', '9049e109-68a9-47e7-a28d-f84d24526d83', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('c98f060c-ccf7-4c9e-911a-8d762baff850', 'a56e6d27-f813-4d1c-8ff9-a76dd29b576c', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('581b4973-cb55-4708-bf4d-97d73d8d1f8d', 'd6978395-c18b-43e6-9121-94d7ec97ea22', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('0cd224ea-2766-4e50-90db-e741a6605f2d', 'd817b9cf-7649-4c9d-9d7a-af094f05464d', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('a95b7f81-b1ff-4ea1-b1b1-41a5f2220b04', 'dd4fa5d2-fba9-4205-9b54-99184036d0f3', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('1707ed5a-2fc8-4805-a219-16c34e5441f5', 'e0bd7cf7-79d6-4151-9913-f69070a4e2f0', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('68f0477c-f87d-4612-9300-2ab6672028fc', 'f0b46aae-5b4e-4b80-a929-8467b5f9674a', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('d5edf41a-17b6-4b61-be9b-149ccfd98897', 'f9d84cf0-15a4-4fbc-936a-0bbd48dbceee', '1bd12a62-319d-47c8-8006-1ad9ab739daa', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('a6773802-f40c-4529-96ee-4cc9bd91d7ef', '2aadeb67-bbda-46a8-bda8-0a3ac54615c9', '1fa260c9-4177-42f4-824f-6046708301a4', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('e7120690-e183-4973-a544-f8125dfec2fd', '5a1891cf-d538-46ac-b2d4-3e167ce45378', '1fa260c9-4177-42f4-824f-6046708301a4', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('ef88879a-f973-402c-bbf6-fc5c03c53caa', 'd9a2d32d-8bcf-4db6-bea0-2a7b4da11fb8', '1fa260c9-4177-42f4-824f-6046708301a4', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('d055f416-8b76-494e-805e-89756a317b75', '5a1891cf-d538-46ac-b2d4-3e167ce45378', '5cdd2f39-97eb-4c8f-b132-0781cf1a07a8', 2, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('7d06f388-efda-4809-aeb5-7787c101eb7d', '6b0aea84-aa56-4eef-9a7e-2601fd36fe11', '5cdd2f39-97eb-4c8f-b132-0781cf1a07a8', 2, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('02f2d735-49fc-40f5-b535-ad3bc6ebe86b', '7c57de1f-7938-4165-9cc6-30b39a74c2f7', '5cdd2f39-97eb-4c8f-b132-0781cf1a07a8', 2, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('518add53-974b-41be-8903-3cbdaab3837d', '9049e109-68a9-47e7-a28d-f84d24526d83', '5cdd2f39-97eb-4c8f-b132-0781cf1a07a8', 2, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('2f2e8044-6b59-40db-a9dd-3ac03366096e', 'a5355709-bf75-4ff8-abef-36e07d03240f', '5cdd2f39-97eb-4c8f-b132-0781cf1a07a8', 2, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('673372cb-1702-42ea-8608-40230a8c59a0', 'a8e3a1f0-55ea-44dd-b521-70a41d671714', '5cdd2f39-97eb-4c8f-b132-0781cf1a07a8', 2, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('85a5b68e-6429-48ce-859e-9938dad0fc8b', 'd6978395-c18b-43e6-9121-94d7ec97ea22', '5cdd2f39-97eb-4c8f-b132-0781cf1a07a8', 1, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('b2183ac6-358a-4601-8b4a-6c1c9973e82d', 'd817b9cf-7649-4c9d-9d7a-af094f05464d', '5cdd2f39-97eb-4c8f-b132-0781cf1a07a8', 1, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('eeed0d7e-07d0-4075-8b12-fd64f987bb08', 'f9d84cf0-15a4-4fbc-936a-0bbd48dbceee', '5cdd2f39-97eb-4c8f-b132-0781cf1a07a8', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('b7424bb6-2d4c-4902-8fa4-42224b45c77d', '231697a6-5e86-4327-b599-0374c195b0d9', '69f62df7-21cc-4df1-b0f9-dca69951b94a', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('e8de88c7-676f-430e-9962-42865491419d', '2355c35c-f735-441a-b0aa-b34fa4eaae2a', '69f62df7-21cc-4df1-b0f9-dca69951b94a', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('ddf51d96-4eb5-43e5-a6c1-33abd64d97c7', '5a1891cf-d538-46ac-b2d4-3e167ce45378', '69f62df7-21cc-4df1-b0f9-dca69951b94a', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('65f2e793-47b7-464c-a33e-94a20378b5e9', '6b0aea84-aa56-4eef-9a7e-2601fd36fe11', '69f62df7-21cc-4df1-b0f9-dca69951b94a', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('2c285a7d-814e-454f-aa82-6101f52110a6', '7c57de1f-7938-4165-9cc6-30b39a74c2f7', '69f62df7-21cc-4df1-b0f9-dca69951b94a', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('e1138e21-db59-4ef0-bb93-2f86660fe6ec', '80ea9876-8325-4466-b6be-1e07b5092b98', '69f62df7-21cc-4df1-b0f9-dca69951b94a', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('9fb78b99-cf12-45c3-90f1-d7e01550bd89', 'd817b9cf-7649-4c9d-9d7a-af094f05464d', '69f62df7-21cc-4df1-b0f9-dca69951b94a', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('dcb99843-33d1-4904-be4c-4b561359d28e', 'dd4fa5d2-fba9-4205-9b54-99184036d0f3', '69f62df7-21cc-4df1-b0f9-dca69951b94a', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('ec5b0acd-dc73-4274-9b28-076ca93deb81', 'e0bd7cf7-79d6-4151-9913-f69070a4e2f0', '69f62df7-21cc-4df1-b0f9-dca69951b94a', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('a62a8362-f491-416b-ae51-eebd34eba018', '7c57de1f-7938-4165-9cc6-30b39a74c2f7', '70c1df9f-0048-4d83-a4ce-77d1555281cf', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('edbae37e-6d44-4f17-8d2c-65ec71df85e2', '9049e109-68a9-47e7-a28d-f84d24526d83', '70c1df9f-0048-4d83-a4ce-77d1555281cf', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('ce789adc-c382-4c00-84ce-e652ce09b58e', 'a5355709-bf75-4ff8-abef-36e07d03240f', '70c1df9f-0048-4d83-a4ce-77d1555281cf', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('cb8ab053-6fff-423a-aee4-8f375e7ca41c', 'a8e3a1f0-55ea-44dd-b521-70a41d671714', '70c1df9f-0048-4d83-a4ce-77d1555281cf', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('94303622-ec7e-4a31-927f-f1f7515e3f00', 'c25cc27c-4a70-4ec5-a5a8-bd42ab9ec176', '70c1df9f-0048-4d83-a4ce-77d1555281cf', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('1408eb68-0f5a-4ab6-9a57-d54c4f75a90c', 'd6978395-c18b-43e6-9121-94d7ec97ea22', '70c1df9f-0048-4d83-a4ce-77d1555281cf', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('c0378aa0-e2ff-4d89-9c5c-1e42b2fb6a84', 'f9d84cf0-15a4-4fbc-936a-0bbd48dbceee', '70c1df9f-0048-4d83-a4ce-77d1555281cf', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('75d6f1c1-e803-4b16-aa08-a3a475b8667b', '1a987bd6-afc0-4a97-9f83-827e05209a17', 'a5f72b5a-0856-4e50-9186-59d443743e79', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('ad8001f6-07a1-46f1-8abd-048ca548e1dd', '2aadeb67-bbda-46a8-bda8-0a3ac54615c9', 'a5f72b5a-0856-4e50-9186-59d443743e79', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('ee808d92-f2da-4bd4-bacb-bdcabcd136b0', 'a56e6d27-f813-4d1c-8ff9-a76dd29b576c', 'a5f72b5a-0856-4e50-9186-59d443743e79', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('423075a5-bcfd-4e00-987b-ed49fa9781d0', 'f0b46aae-5b4e-4b80-a929-8467b5f9674a', 'a5f72b5a-0856-4e50-9186-59d443743e79', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('17a52d73-3a63-427f-a303-583c08010f63', '3984c407-45e4-41e3-9605-addd7bf84c7a', 'ace68d8f-2c3c-4680-9a96-acb12e9a248d', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('f2834cc9-353a-4849-ba76-fca6449bc41f', '651b5258-e229-46c4-a125-f332b6cbef8d', 'ace68d8f-2c3c-4680-9a96-acb12e9a248d', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('e28a3a92-ad56-446c-9f74-f30e3e625747', '95484a85-a954-4cf6-87c2-4de5acec1be6', 'ace68d8f-2c3c-4680-9a96-acb12e9a248d', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('cce0cd17-7c56-4d90-bbbd-8352dcbb4cdc', 'a5355709-bf75-4ff8-abef-36e07d03240f', 'ace68d8f-2c3c-4680-9a96-acb12e9a248d', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('9116c999-1074-4477-bfeb-7382b79901b9', 'a8e3a1f0-55ea-44dd-b521-70a41d671714', 'ace68d8f-2c3c-4680-9a96-acb12e9a248d', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('ed417229-5932-4f6a-8aa7-fc6425358d9d', 'c25cc27c-4a70-4ec5-a5a8-bd42ab9ec176', 'ace68d8f-2c3c-4680-9a96-acb12e9a248d', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('e2db0e86-2a59-4255-9cd0-c685a445980f', 'f364dcf9-fe1d-4bac-94a2-4eae148cefef', 'ace68d8f-2c3c-4680-9a96-acb12e9a248d', 2, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('a7a27432-cd9d-4eee-9e1c-a9c785902723', '0d4b25eb-f4bd-4f8a-8288-a2d22bbc658d', 'bb7c4f51-2d78-49f3-a895-b3ffdbfa38c3', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('bdee7292-61dc-419b-bab2-5d6822b88877', '1a987bd6-afc0-4a97-9f83-827e05209a17', 'bb7c4f51-2d78-49f3-a895-b3ffdbfa38c3', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('819cecd9-e37b-45f0-8652-4d833cadd8b5', '231697a6-5e86-4327-b599-0374c195b0d9', 'bb7c4f51-2d78-49f3-a895-b3ffdbfa38c3', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('59490131-331b-49b2-be12-68d4ce5ec757', '2355c35c-f735-441a-b0aa-b34fa4eaae2a', 'bb7c4f51-2d78-49f3-a895-b3ffdbfa38c3', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('2f3b4d94-855e-4aaf-8fb9-e2c7ffdde5ab', '2aadeb67-bbda-46a8-bda8-0a3ac54615c9', 'bb7c4f51-2d78-49f3-a895-b3ffdbfa38c3', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('e7ffbe00-d15b-4f8c-b733-b16b39fe43ba', '3e6b1200-f606-41cf-959a-930d77c6e9fd', 'bb7c4f51-2d78-49f3-a895-b3ffdbfa38c3', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('75869c65-c4dd-4eaf-92b0-198947e375a9', '6f87f33f-61a4-4470-abbb-33e5a1be55e2', 'bb7c4f51-2d78-49f3-a895-b3ffdbfa38c3', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('f61cb758-d6d6-4e9e-ab5b-95772576aa73', '80ea9876-8325-4466-b6be-1e07b5092b98', 'bb7c4f51-2d78-49f3-a895-b3ffdbfa38c3', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('8da071d2-0f8b-43c9-8e9e-6a3f11d1b5a8', 'a56e6d27-f813-4d1c-8ff9-a76dd29b576c', 'bb7c4f51-2d78-49f3-a895-b3ffdbfa38c3', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('d34a3d73-2732-4740-958b-73256d09f5dd', 'dd4fa5d2-fba9-4205-9b54-99184036d0f3', 'bb7c4f51-2d78-49f3-a895-b3ffdbfa38c3', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('a4329404-5034-466b-9edb-41d87548af90', 'e0bd7cf7-79d6-4151-9913-f69070a4e2f0', 'bb7c4f51-2d78-49f3-a895-b3ffdbfa38c3', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('952fef03-f74b-4152-aae8-dd6f39341746', 'f0b46aae-5b4e-4b80-a929-8467b5f9674a', 'bb7c4f51-2d78-49f3-a895-b3ffdbfa38c3', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('d0dff565-da82-452e-8cb3-c3bcef455c0b', '0d4b25eb-f4bd-4f8a-8288-a2d22bbc658d', 'e0b883f1-2aca-43b6-98ab-6a752a35691c', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('1309fc18-5beb-4a40-a815-c142c07b61a5', '231697a6-5e86-4327-b599-0374c195b0d9', 'e0b883f1-2aca-43b6-98ab-6a752a35691c', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('ad3b94df-6a51-4905-87c4-c81efb45453c', '2355c35c-f735-441a-b0aa-b34fa4eaae2a', 'e0b883f1-2aca-43b6-98ab-6a752a35691c', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('03e0eae1-e56c-4aca-96ed-4927a9cecf08', '80ea9876-8325-4466-b6be-1e07b5092b98', 'e0b883f1-2aca-43b6-98ab-6a752a35691c', 3, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('4d27b428-9c1a-46c0-bc1e-206cb3bec802', 'dd4fa5d2-fba9-4205-9b54-99184036d0f3', 'e0b883f1-2aca-43b6-98ab-6a752a35691c', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('e9385b4e-a6bf-4317-9b46-a62ec0e1d3df', 'e0bd7cf7-79d6-4151-9913-f69070a4e2f0', 'e0b883f1-2aca-43b6-98ab-6a752a35691c', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('61a2d15e-386b-4b9e-beee-013de43e3879', '2aadeb67-bbda-46a8-bda8-0a3ac54615c9', 'eed267ed-94ad-4a7b-ad0f-811e2921e306', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('56d1ec3c-ecf2-45b5-96b8-58550a132784', '3984c407-45e4-41e3-9605-addd7bf84c7a', 'eed267ed-94ad-4a7b-ad0f-811e2921e306', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('0bff1158-b6c6-4007-aff7-c2af10ac34ec', '5a1891cf-d538-46ac-b2d4-3e167ce45378', 'eed267ed-94ad-4a7b-ad0f-811e2921e306', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('4aebf222-e4a0-4d4d-8436-a253c41d9f6b', '651b5258-e229-46c4-a125-f332b6cbef8d', 'eed267ed-94ad-4a7b-ad0f-811e2921e306', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('1896e64e-4928-4cff-9445-aa54b0a28425', '6f87f33f-61a4-4470-abbb-33e5a1be55e2', 'eed267ed-94ad-4a7b-ad0f-811e2921e306', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('a29e2d30-260c-4862-9101-f19ae9c096a0', '9049e109-68a9-47e7-a28d-f84d24526d83', 'eed267ed-94ad-4a7b-ad0f-811e2921e306', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('260caa50-922b-4826-9fcb-669b7e49bcd1', '95484a85-a954-4cf6-87c2-4de5acec1be6', 'eed267ed-94ad-4a7b-ad0f-811e2921e306', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('62be4a29-f428-4070-a03b-2df6a45b216a', 'a5355709-bf75-4ff8-abef-36e07d03240f', 'eed267ed-94ad-4a7b-ad0f-811e2921e306', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('b8f198eb-13bc-4b4e-b012-acb43bbac7d4', 'a56e6d27-f813-4d1c-8ff9-a76dd29b576c', 'eed267ed-94ad-4a7b-ad0f-811e2921e306', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('634f3ebc-68a8-45bb-afe5-927ae6f7c6bc', 'a8e3a1f0-55ea-44dd-b521-70a41d671714', 'eed267ed-94ad-4a7b-ad0f-811e2921e306', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('7140da82-872d-424e-9fd9-3147a600ce2e', 'c25cc27c-4a70-4ec5-a5a8-bd42ab9ec176', 'eed267ed-94ad-4a7b-ad0f-811e2921e306', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('af73dff9-b0b0-4c5e-8920-91a319cb55e3', 'd6978395-c18b-43e6-9121-94d7ec97ea22', 'eed267ed-94ad-4a7b-ad0f-811e2921e306', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('639b5371-7fc3-40c3-8858-76238035eeba', 'f364dcf9-fe1d-4bac-94a2-4eae148cefef', 'eed267ed-94ad-4a7b-ad0f-811e2921e306', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('25d87cb6-d4e5-4b9b-a489-dc08190c5388', 'f9d84cf0-15a4-4fbc-936a-0bbd48dbceee', 'eed267ed-94ad-4a7b-ad0f-811e2921e306', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('2aaf2b79-5713-4a69-91a5-0a41e10b6c0f', '06b125f0-ad09-43dd-8012-3450a8c294f8', 'ff3593a0-efd6-4b06-a8d6-6ccac2d2cd7c', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('87b49236-a011-4b9e-919e-d3744e60a72f', '1a987bd6-afc0-4a97-9f83-827e05209a17', 'ff3593a0-efd6-4b06-a8d6-6ccac2d2cd7c', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('77c8863b-bf5c-420e-8f7e-ca3316720b5f', '3984c407-45e4-41e3-9605-addd7bf84c7a', 'ff3593a0-efd6-4b06-a8d6-6ccac2d2cd7c', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('6ce016df-9b45-4fa3-9f8c-fefc5a73742e', '651b5258-e229-46c4-a125-f332b6cbef8d', 'ff3593a0-efd6-4b06-a8d6-6ccac2d2cd7c', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('1efb92fb-b611-48e1-8813-38e2d4207a71', '95484a85-a954-4cf6-87c2-4de5acec1be6', 'ff3593a0-efd6-4b06-a8d6-6ccac2d2cd7c', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('e1e45b05-dc37-460f-b7f2-9aa786955220', 'c25cc27c-4a70-4ec5-a5a8-bd42ab9ec176', 'ff3593a0-efd6-4b06-a8d6-6ccac2d2cd7c', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('65dc8287-5ef8-42e3-8a83-5497bec34c4c', 'f0b46aae-5b4e-4b80-a929-8467b5f9674a', 'ff3593a0-efd6-4b06-a8d6-6ccac2d2cd7c', 4, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

INSERT INTO `ratings` (`id`, `userId`, `storeId`, `rating`, `createdAt`, `updatedAt`)
VALUES ('f96b8d69-3c54-4dd1-9289-2f5c57c95047', 'f364dcf9-fe1d-4bac-94a2-4eae148cefef', 'ff3593a0-efd6-4b06-a8d6-6ccac2d2cd7c', 5, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `rating` = VALUES(`rating`);

SET FOREIGN_KEY_CHECKS = 1;
