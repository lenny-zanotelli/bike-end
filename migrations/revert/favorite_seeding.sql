-- Revert bikeend-back:favorite_seeding from pg

BEGIN;

TRUNCATE "favorite";

COMMIT;
