-- Deploy bikeend-back:favorite_seeding to pg
BEGIN;
INSERT INTO "favorite" (
        "departure_date_time",
        "duration",
        "from_name",
        "from_id",
        "to_name",
        "to_id",
        "link"
    )
VALUES (
        '20230517T180000',
        480,
        '9 Place d''Aligre (Paris)',
        '2.378441;48.84916',
        'Faidherbe - Chaligny (Paris)',
        'stop_point:IDFM:463172',
        1
    ),
    (
        '20230517T180000',
        540,
        '9 Place d''Aligre (Paris)',
        '2.378441;48.84916',
        'Reuilly - Diderot (Paris)',
        'stop_point:IDFM:463293',
        1
    );
COMMIT;