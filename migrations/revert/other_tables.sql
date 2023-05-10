-- Revert bikeend-back:other_tables from pg
BEGIN;

ALTER TABLE "favorite" DROP CONSTRAINT "favorite_user_id_fkey";

ALTER TABLE "filter" DROP CONSTRAINT "filter_user_id_fkey";

DROP TABLE IF EXISTS "favorite";

DROP TABLE IF EXISTS "filter";

COMMIT;
