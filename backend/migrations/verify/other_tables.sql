-- Verify bikeend-back:other_tables on pg

BEGIN;

SELECT * FROM "favorite" WHERE false;

SELECT * FROM "filter" WHERE false;

ROLLBACK;
