-- Revert bikeend-back:favorite_seeding from pg

BEGIN;

TRUNCATE TABLE "favorite";

COMMIT;
