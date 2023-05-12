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
        -- 'Azerty-1234'
        '$2b$10$AnnwC7Dg4G0HHQ0OzLJpU.nyj67hVR4j.ORfkRlP/YzKLZ/wtbArW',
        'tester',
        'testé',
        true
    ),
    (
        'pierre@gmail.com',
        -- Bcde!1234
        '$2b$10$kokgHAGHqUNNDDQhAiad1eBWA7plHJe3Trdy.86vYnZGZYjmImol6',
        'pierre',
        'paul',
        true
    );
COMMIT;