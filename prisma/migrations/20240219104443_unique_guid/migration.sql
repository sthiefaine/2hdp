-- CreateTable
CREATE TABLE "podcasts" (
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

    CONSTRAINT "podcasts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "podcasts_guid_key" ON "podcasts"("guid");
