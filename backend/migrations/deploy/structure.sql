-- Deploy bikeend-back:structure to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "user" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE, -- impossibilité d'avoir deux utilisateurs avec le meme email
  "password" TEXT NOT NULL,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "accepted_conditions" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMIT;
