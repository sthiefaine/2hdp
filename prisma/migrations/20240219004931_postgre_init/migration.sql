-- CreateTable
CREATE TABLE "Podcasts" (
    "id" SERIAL NOT NULL,
    "guid" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "saison" INTEGER NOT NULL,
    "episode" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Podcasts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Podcasts_guid_key" ON "Podcasts"("guid");
