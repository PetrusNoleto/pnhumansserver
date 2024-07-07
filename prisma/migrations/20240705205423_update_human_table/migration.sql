/*
  Warnings:

  - Added the required column `password` to the `Humans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Humans` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Humans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "cell" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "streetName" TEXT NOT NULL,
    "streetNumber" TEXT NOT NULL,
    "postCode" INTEGER NOT NULL,
    "coordinatesLatitude" TEXT NOT NULL,
    "coordinatesLongitude" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Humans" ("age", "cell", "city", "coordinatesLatitude", "coordinatesLongitude", "country", "createdAt", "createdBy", "email", "gender", "id", "identification", "lastName", "name", "phone", "picture", "postCode", "state", "streetName", "streetNumber") SELECT "age", "cell", "city", "coordinatesLatitude", "coordinatesLongitude", "country", "createdAt", "createdBy", "email", "gender", "id", "identification", "lastName", "name", "phone", "picture", "postCode", "state", "streetName", "streetNumber" FROM "Humans";
DROP TABLE "Humans";
ALTER TABLE "new_Humans" RENAME TO "Humans";
CREATE UNIQUE INDEX "Humans_id_key" ON "Humans"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
