-- CreateTable
CREATE TABLE "Podcasts" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "movieIdTmdb" INTEGER,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
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

-- CreateTable
CREATE TABLE "Directors" (
    "id" SERIAL NOT NULL,
    "idTmdb" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Directors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saga" (
    "id" SERIAL NOT NULL,
    "idTmdb" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "films" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Saga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "idTmdb" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "sagaIdTmdb" INTEGER,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "directorsName" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "idTmdb" INTEGER,
    "idAlloCine" INTEGER NOT NULL,
    "userIdAlloCine" TEXT NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Podcasts_guid_key" ON "Podcasts"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "Directors_idTmdb_key" ON "Directors"("idTmdb");

-- CreateIndex
CREATE UNIQUE INDEX "Saga_idTmdb_key" ON "Saga"("idTmdb");

-- CreateIndex
CREATE UNIQUE INDEX "Movies_idTmdb_key" ON "Movies"("idTmdb");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_idTmdb_key" ON "Reviews"("idTmdb");
