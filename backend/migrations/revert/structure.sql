-- Revert bikeend-back:structure from pg

BEGIN;

Drop table "user" CASCADE;

COMMIT;
