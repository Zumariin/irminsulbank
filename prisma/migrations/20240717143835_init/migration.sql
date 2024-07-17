/*
  Warnings:

  - The primary key for the `Artefak` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID_artefak` on the `Artefak` table. All the data in the column will be lost.
  - The primary key for the `Karakter_Support` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID_charasup` on the `Karakter_Support` table. All the data in the column will be lost.
  - Made the column `ID_artefak` on table `karakter` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ID_charasup` on table `karakter` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ID_batu` on table `karakter` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "karakter" DROP CONSTRAINT "karakter_ID_artefak_fkey";

-- DropForeignKey
ALTER TABLE "karakter" DROP CONSTRAINT "karakter_ID_batu_fkey";

-- DropForeignKey
ALTER TABLE "karakter" DROP CONSTRAINT "karakter_ID_charasup_fkey";

-- AlterTable
ALTER TABLE "Artefak" DROP CONSTRAINT "Artefak_pkey",
DROP COLUMN "ID_artefak",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Artefak_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Karakter_Support" DROP CONSTRAINT "Karakter_Support_pkey",
DROP COLUMN "ID_charasup",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Karakter_Support_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "karakter" ALTER COLUMN "ID_artefak" SET NOT NULL,
ALTER COLUMN "ID_charasup" SET NOT NULL,
ALTER COLUMN "ID_batu" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "karakter" ADD CONSTRAINT "karakter_ID_artefak_fkey" FOREIGN KEY ("ID_artefak") REFERENCES "Artefak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "karakter" ADD CONSTRAINT "karakter_ID_charasup_fkey" FOREIGN KEY ("ID_charasup") REFERENCES "Karakter_Support"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "karakter" ADD CONSTRAINT "karakter_ID_batu_fkey" FOREIGN KEY ("ID_batu") REFERENCES "Batu_ascend"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
