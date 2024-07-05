-- CreateTable
CREATE TABLE "Humans" (
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
    "identification" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Humans_id_key" ON "Humans"("id");
