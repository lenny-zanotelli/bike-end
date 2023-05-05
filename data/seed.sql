BEGIN;

INSERT INTO "user" ("email","password","firstname", "lastname") VALUES
('test@gmail.com', 'Azerty-1234', 'tester', 'testé'),
('pierre@gmail.com', 'Bcde!1234', 'pierre', 'paul');

COMMIT;
