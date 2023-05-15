-- Revert bikeend-back:user_seeding from pg

BEGIN;

TRUNCATE TABLE "user";

COMMIT;
