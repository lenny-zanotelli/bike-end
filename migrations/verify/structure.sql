-- Verify bikeend-back:structure on pg

BEGIN;

SELECT * FROM "user" WHERE false;

ROLLBACK;
