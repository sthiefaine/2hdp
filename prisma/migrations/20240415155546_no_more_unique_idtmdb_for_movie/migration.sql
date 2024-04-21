-- DropIndex
DROP INDEX "Movies_idTmdb_key";

-- AlterTable
ALTER TABLE "Movies" ALTER COLUMN "idTmdb" DROP NOT NULL;
