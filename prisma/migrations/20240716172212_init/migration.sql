/*
  Warnings:

  - The primary key for the `Artefak` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID_artefak` on the `Artefak` table. All the data in the column will be lost.
  - You are about to drop the `Batu_ascend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Karakter_Support` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "karakter" DROP CONSTRAINT "karakter_ID_artefak_fkey";

-- DropForeignKey
ALTER TABLE "karakter" DROP CONSTRAINT "karakter_ID_batu_fkey";

-- DropForeignKey
ALTER TABLE "karakter" DROP CONSTRAINT "karakter_ID_charasup_fkey";

-- DropIndex
DROP INDEX "karakter_Gambar_Senjata2_key";

-- DropIndex
DROP INDEX "karakter_Gambar_Senjata3_key";

-- DropIndex
DROP INDEX "karakter_Gambar_Senjata4_key";

-- DropIndex
DROP INDEX "karakter_ID_artefak_key";

-- DropIndex
DROP INDEX "karakter_Senjata2_key";

-- DropIndex
DROP INDEX "karakter_Senjata3_key";

-- DropIndex
DROP INDEX "karakter_Senjata4_key";

-- AlterTable
ALTER TABLE "Artefak" DROP CONSTRAINT "Artefak_pkey",
DROP COLUMN "ID_artefak",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Artefak_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Batu_ascend";

-- DropTable
DROP TABLE "Karakter_Support";

-- CreateTable
CREATE TABLE "BatuAscend" (
    "id" SERIAL NOT NULL,
    "Silver" TEXT NOT NULL,
    "Gambar_silver" TEXT NOT NULL,
    "Fragment" TEXT NOT NULL,
    "Gambar_fragment" TEXT NOT NULL,
    "Chunk" TEXT NOT NULL,
    "Gambar_chunk" TEXT NOT NULL,
    "Gemstone" TEXT NOT NULL,
    "Gambar_gemstone" TEXT NOT NULL,

    CONSTRAINT "BatuAscend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KarakterSupport" (
    "id" SERIAL NOT NULL,
    "Nama_charasup" TEXT NOT NULL,
    "Foto_charasup" TEXT NOT NULL,

    CONSTRAINT "KarakterSupport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArtefakTokarakter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArtefakTokarakter_AB_unique" ON "_ArtefakTokarakter"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtefakTokarakter_B_index" ON "_ArtefakTokarakter"("B");

-- AddForeignKey
ALTER TABLE "karakter" ADD CONSTRAINT "karakter_ID_charasup_fkey" FOREIGN KEY ("ID_charasup") REFERENCES "KarakterSupport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "karakter" ADD CONSTRAINT "karakter_ID_batu_fkey" FOREIGN KEY ("ID_batu") REFERENCES "BatuAscend"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtefakTokarakter" ADD CONSTRAINT "_ArtefakTokarakter_A_fkey" FOREIGN KEY ("A") REFERENCES "Artefak"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtefakTokarakter" ADD CONSTRAINT "_ArtefakTokarakter_B_fkey" FOREIGN KEY ("B") REFERENCES "karakter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
