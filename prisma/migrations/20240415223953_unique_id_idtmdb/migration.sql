/*
  Warnings:

  - A unique constraint covering the columns `[idTmdb]` on the table `Movies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movies_idTmdb_key" ON "Movies"("idTmdb");
