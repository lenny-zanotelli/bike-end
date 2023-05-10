-- Deploy bikeend-back:user_seeding to pg
BEGIN;
INSERT INTO "user" (
        "email",
        "password",
        "firstname",
        "lastname",
        "accepted_conditions"
    )
VALUES (
        'test@gmail.com',
        'Azerty-1234',
        'tester',
        'testé',
        true
    ),
    (
        'pierre@gmail.com',
        'Bcde!1234',
        'pierre',
        'paul',
        true
    );
COMMIT;