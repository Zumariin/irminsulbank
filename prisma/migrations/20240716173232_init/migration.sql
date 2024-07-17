/*
  Warnings:

  - The primary key for the `Artefak` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Artefak` table. All the data in the column will be lost.
  - You are about to drop the `BatuAscend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KarakterSupport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArtefakTokarakter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArtefakTokarakter" DROP CONSTRAINT "_ArtefakTokarakter_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtefakTokarakter" DROP CONSTRAINT "_ArtefakTokarakter_B_fkey";

-- DropForeignKey
ALTER TABLE "karakter" DROP CONSTRAINT "karakter_ID_batu_fkey";

-- DropForeignKey
ALTER TABLE "karakter" DROP CONSTRAINT "karakter_ID_charasup_fkey";

-- DropIndex
DROP INDEX "karakter_Gambar_Senjata1_key";

-- DropIndex
DROP INDEX "karakter_ID_batu_key";

-- DropIndex
DROP INDEX "karakter_ID_charasup_key";

-- DropIndex
DROP INDEX "karakter_Senjata1_key";

-- AlterTable
ALTER TABLE "Artefak" DROP CONSTRAINT "Artefak_pkey",
DROP COLUMN "id",
ADD COLUMN     "ID_artefak" SERIAL NOT NULL,
ADD CONSTRAINT "Artefak_pkey" PRIMARY KEY ("ID_artefak");

-- AlterTable
ALTER TABLE "karakter" ALTER COLUMN "ID_artefak" DROP NOT NULL,
ALTER COLUMN "ID_charasup" DROP NOT NULL,
ALTER COLUMN "ID_batu" DROP NOT NULL;

-- DropTable
DROP TABLE "BatuAscend";

-- DropTable
DROP TABLE "KarakterSupport";

-- DropTable
DROP TABLE "_ArtefakTokarakter";

-- CreateTable
CREATE TABLE "Batu_ascend" (
    "ID_batu" SERIAL NOT NULL,
    "Silver" TEXT NOT NULL,
    "Gambar_silver" TEXT NOT NULL,
    "Fragment" TEXT NOT NULL,
    "Gambar_fragment" TEXT NOT NULL,
    "Chunk" TEXT NOT NULL,
    "Gambar_chunk" TEXT NOT NULL,
    "Gemstone" TEXT NOT NULL,
    "Gambar_gemstone" TEXT NOT NULL,

    CONSTRAINT "Batu_ascend_pkey" PRIMARY KEY ("ID_batu")
);

-- CreateTable
CREATE TABLE "Karakter_Support" (
    "ID_charasup" SERIAL NOT NULL,
    "Nama_charasup" TEXT NOT NULL,
    "Foto_charasup" TEXT NOT NULL,

    CONSTRAINT "Karakter_Support_pkey" PRIMARY KEY ("ID_charasup")
);

-- AddForeignKey
ALTER TABLE "karakter" ADD CONSTRAINT "karakter_ID_artefak_fkey" FOREIGN KEY ("ID_artefak") REFERENCES "Artefak"("ID_artefak") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "karakter" ADD CONSTRAINT "karakter_ID_charasup_fkey" FOREIGN KEY ("ID_charasup") REFERENCES "Karakter_Support"("ID_charasup") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "karakter" ADD CONSTRAINT "karakter_ID_batu_fkey" FOREIGN KEY ("ID_batu") REFERENCES "Batu_ascend"("ID_batu") ON DELETE SET NULL ON UPDATE CASCADE;
