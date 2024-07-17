/*
  Warnings:

  - The primary key for the `Batu_ascend` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID_batu` on the `Batu_ascend` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "karakter" DROP CONSTRAINT "karakter_ID_batu_fkey";

-- DropIndex
DROP INDEX "karakter_Gambar_mat_key";

-- DropIndex
DROP INDEX "karakter_Lokal_mat_key";

-- DropIndex
DROP INDEX "karakter_Mat_ascend_key";

-- DropIndex
DROP INDEX "karakter_Nama_chara_key";

-- DropIndex
DROP INDEX "karakter_gambar_lokalmat_key";

-- AlterTable
ALTER TABLE "Batu_ascend" DROP CONSTRAINT "Batu_ascend_pkey",
DROP COLUMN "ID_batu",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Batu_ascend_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "karakter" ADD CONSTRAINT "karakter_ID_batu_fkey" FOREIGN KEY ("ID_batu") REFERENCES "Batu_ascend"("id") ON DELETE SET NULL ON UPDATE CASCADE;
