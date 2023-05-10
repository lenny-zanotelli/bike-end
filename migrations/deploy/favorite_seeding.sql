-- Deploy bikeend-back:favorite_seeding to pg
BEGIN;
INSERT INTO "favorite" (
        "origin",
        "destination",
        "comment",
        "journey_time",
        "user_id"
    )
VALUES (
        'Paris',
        'Mayenne',
        'Bonne idée découverte',
        180,
        1
    ),
    (
        'Rouen',
        'Calais',
        'Pluie pluie pluie',
        55,
        2
    );
COMMIT;