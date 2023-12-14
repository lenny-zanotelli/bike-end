-- Deploy bikeend-back:favorite_seeding to pg
BEGIN;
INSERT INTO "favorite" (
        "departure_date_time",
        "duration",
        "from_name",
        "from_id",
        "to_name",
        "to_id",
        "nb_transfers",
        "queryUrl",
        "user_id"
    )
VALUES (
        '20230603T120000',
        540,
        '17 Place d''Aligre (Paris)',
        '2.3786875;48.8486506',
        'Charonne - Keller (Paris)',
        'stop_point:IDFM:22496',
        0,
        '?from=2.3786875%3B48.8486506&datetime=20230603T120000&max_duration=3600&to=stop_point%3AIDFM%3A22496',
        1
    ),
    (
        '20230603T120000',
        540,
        '17 Place d''Aligre (Paris)',
        '2.3786875;48.8486506',
        'Hôpital Saint-Antoine (Paris)',
        'stop_point:IDFM:24828',
        0,
        '?from=2.3786875%3B48.8486506&datetime=20230603T120000&max_duration=3600&to=stop_point%3AIDFM%3A24828',
        1
    );
COMMIT;