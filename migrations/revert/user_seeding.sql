-- Revert bikeend-back:user_seeding from pg

BEGIN;

TRUNCATE "user";

COMMIT;
