-- Add usernames for new and existing accounts.
ALTER TABLE "User" ADD COLUMN "username" TEXT;

-- Existing accounts receive a deterministic, valid username (20 characters max).
UPDATE "User"
SET "username" = 'user_' || substring(md5("id") FROM 1 FOR 15)
WHERE "username" IS NULL;

ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
