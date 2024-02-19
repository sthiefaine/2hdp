/*
  Warnings:

  - You are about to drop the `podcasts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "podcasts";

-- CreateTable
CREATE TABLE "Podcasts" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "movieId" TEXT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "saison" TEXT,
    "episode" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Podcasts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Podcasts_guid_key" ON "Podcasts"("guid");
