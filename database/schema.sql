set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "username" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "patientDemographics" (
  "demographicId" serial PRIMARY KEY,
  "userId" int NOT NULL,
  "age" int NOT NULL,
  "gender" text NOT NULL,
  "weight" numeric,
  "height" numeric,
  "createdAt" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "preExistingConditions" (
  "conditionId" serial PRIMARY KEY,
  "demographicId" int NOT NULL,
  "conditionName" text NOT NULL,
  "severity" text,
  "createdAt" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "chatSessions" (
  "sessionId" serial PRIMARY KEY,
  "userId" int NOT NULL,
  "startedAt" timestamptz NOT NULL DEFAULT (now()),
  "endedAt" timestamptz
);

CREATE TABLE "chatMessages" (
  "messageId" serial PRIMARY KEY,
  "sessionId" int NOT NULL,
  "sender" text NOT NULL,
  "message" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT (now())
);

COMMENT ON COLUMN "chatMessages"."sender" IS 'User or chatbot';

ALTER TABLE "patientDemographics" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "preExistingConditions" ADD FOREIGN KEY ("demographicId") REFERENCES "patientDemographics" ("demographicId");

ALTER TABLE "chatSessions" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "chatMessages" ADD FOREIGN KEY ("sessionId") REFERENCES "chatSessions" ("sessionId");
