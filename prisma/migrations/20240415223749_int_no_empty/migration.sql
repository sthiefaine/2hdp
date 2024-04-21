/*
  Warnings:

  - Made the column `idTmdb` on table `Movies` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Movies" ALTER COLUMN "idTmdb" SET NOT NULL;
