-- AlterTable
ALTER TABLE "Podcasts" ADD COLUMN     "descriptionHtml" TEXT,
ADD COLUMN     "movieIdAlloCine" INTEGER,
ADD COLUMN     "speakers" TEXT[];

-- AlterTable
ALTER TABLE "Reviews" ADD COLUMN     "display" BOOLEAN NOT NULL DEFAULT true;
