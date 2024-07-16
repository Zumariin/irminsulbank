-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "karakter" (
    "id" SERIAL NOT NULL,
    "ID_artefak" INTEGER NOT NULL,
    "ID_charasup" INTEGER NOT NULL,
    "ID_batu" INTEGER NOT NULL,
    "Nama_chara" TEXT NOT NULL,
    "Mat_ascend" TEXT NOT NULL,
    "Gambar_mat" TEXT NOT NULL,
    "Lokal_mat" TEXT NOT NULL,
    "gambar_lokalmat" TEXT NOT NULL,
    "Elemen" TEXT NOT NULL,
    "Senjata1" TEXT NOT NULL,
    "Gambar_Senjata1" TEXT NOT NULL,
    "Senjata2" TEXT NOT NULL,
    "Gambar_Senjata2" TEXT NOT NULL,
    "Senjata3" TEXT NOT NULL,
    "Gambar_Senjata3" TEXT NOT NULL,
    "Senjata4" TEXT NOT NULL,
    "Gambar_Senjata4" TEXT NOT NULL,

    CONSTRAINT "karakter_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Artefak" (
    "ID_artefak" SERIAL NOT NULL,
    "Nama_artefak" TEXT NOT NULL,
    "Foto_artefak" TEXT NOT NULL,

    CONSTRAINT "Artefak_pkey" PRIMARY KEY ("ID_artefak")
);

-- CreateIndex
CREATE UNIQUE INDEX "karakter_ID_artefak_key" ON "karakter"("ID_artefak");

-- CreateIndex
CREATE UNIQUE INDEX "karakter_ID_charasup_key" ON "karakter"("ID_charasup");

-- CreateIndex
CREATE UNIQUE INDEX "karakter_ID_batu_key" ON "karakter"("ID_batu");

-- CreateIndex
CREATE UNIQUE INDEX "karakter_Nama_chara_key" ON "karakter"("Nama_chara");

-- CreateIndex
CREATE UNIQUE INDEX "karakter_Mat_ascend_key" ON "karakter"("Mat_ascend");

-- CreateIndex
CREATE UNIQUE INDEX "karakter_Gambar_mat_key" ON "karakter"("Gambar_mat");

-- CreateIndex
CREATE UNIQUE INDEX "karakter_Lokal_mat_key" ON "karakter"("Lokal_mat");

-- CreateIndex
CREATE UNIQUE INDEX "karakter_gambar_lokalmat_key" ON "karakter"("gambar_lokalmat");

-- CreateIndex
CREATE UNIQUE INDEX "karakter_Senjata1_key" ON "karakter"("Senjata1");

-- CreateIndex
CREATE UNIQUE INDEX "karakter_Gambar_Senjata1_key" ON "karakter"("Gambar_Senjata1");

-- CreateIndex
CREATE UNIQUE INDEX "karakter_Senjata2_key" ON "karakter"("Senjata2");

-- CreateIndex
CREATE UNIQUE INDEX "karakter_Gambar_Senjata2_key" ON "karakter"("Gambar_Senjata2");

-- CreateIndex
CREATE UNIQUE INDEX "karakter_Senjata3_key" ON "karakter"("Senjata3");

-- CreateIndex
CREATE UNIQUE INDEX "karakter_Gambar_Senjata3_key" ON "karakter"("Gambar_Senjata3");

-- CreateIndex
CREATE UNIQUE INDEX "karakter_Senjata4_key" ON "karakter"("Senjata4");

-- CreateIndex
CREATE UNIQUE INDEX "karakter_Gambar_Senjata4_key" ON "karakter"("Gambar_Senjata4");

-- AddForeignKey
ALTER TABLE "karakter" ADD CONSTRAINT "karakter_ID_artefak_fkey" FOREIGN KEY ("ID_artefak") REFERENCES "Artefak"("ID_artefak") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "karakter" ADD CONSTRAINT "karakter_ID_charasup_fkey" FOREIGN KEY ("ID_charasup") REFERENCES "Karakter_Support"("ID_charasup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "karakter" ADD CONSTRAINT "karakter_ID_batu_fkey" FOREIGN KEY ("ID_batu") REFERENCES "Batu_ascend"("ID_batu") ON DELETE RESTRICT ON UPDATE CASCADE;
