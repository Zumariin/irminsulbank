const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const imagekit = require('../libs/imagekit.lib');
const fs = require('fs');
const path = require('path');

const getAllKarakter = async(req, res) => {
    try {

        console.log("tes")
        const karakter = await prisma.karakter.findMany({
            select: {
                id :true,
                Nama_chara: true,
                link_avatar: true,
            },
        });


        return karakter

    } catch(err) {
        throw err
    }
}

const findCharacter = async(req, res) => {
    try {
       const nama = String(req.params.character).split(' ')[0]

       console.log(nama)

       const result = await prisma.karakter.findFirst({
        where : {
            Nama_chara : {
                contains : nama,
                mode : 'insensitive'
            }
        },
        include : {
            artefak : true,
            karakter_support : true,
            batu_ascend : true,
        }
       })

       if(!result) {
            return res.send(`character with name ${nama} is not exist`)
       }

       return res.status(200).json(
        {
            status : true,
            message : 'success',
            data : result
        })

    } catch (err){
        throw err
    }
}

  
const createKarakter = async (req, res) => {
    try {
      const {
        Nama_chara,
        Mat_ascend,
        Elemen,
        ID_artefak,
        ID_charasup,
        ID_batu,
        Lokal_mat,
        Senjata1,
        Senjata2,
        Senjata3,
        Senjata4,
      } = req.body;
  
      // Validasi input
      if (!Nama_chara || !Mat_ascend || !Elemen || !ID_artefak || !ID_charasup || !ID_batu || !Lokal_mat || !Senjata4 || !Senjata3 || !Senjata2 || !Senjata1) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
      }

  
      const uploadImage = async (file) => {
        if (file) {
          const fileBase64 = file.buffer.toString("base64");
          const response = await imagekit.upload({
            fileName: Date.now() + path.extname(file.originalname),
            file: fileBase64,
            folder: "avatars",
          });
          return response.url;
        }
        return null;
      };
  
      const [
        link_avatar,
        Gambar_mat,
        gambar_lokalmat,
        Gambar_Senjata1,
        Gambar_Senjata2,
        Gambar_Senjata3,
        Gambar_Senjata4,
      ] = await Promise.all([
        uploadImage(req.files.link_avatar ? req.files.link_avatar[0] : null),
        uploadImage(req.files.Gambar_mat ? req.files.Gambar_mat[0] : null),
        uploadImage(req.files.gambar_lokalmat ? req.files.gambar_lokalmat[0] : null),
        uploadImage(req.files.Gambar_Senjata1 ? req.files.Gambar_Senjata1[0] : null),
        uploadImage(req.files.Gambar_Senjata2 ? req.files.Gambar_Senjata2[0] : null),
        uploadImage(req.files.Gambar_Senjata3 ? req.files.Gambar_Senjata3[0] : null),
        uploadImage(req.files.Gambar_Senjata4 ? req.files.Gambar_Senjata4[0] : null),
      ]);
  
      // Simpan data ke database
      const newKarakter = await prisma.karakter.create({
        data: {
          Nama_chara,
          Mat_ascend,
          Elemen,
          Lokal_mat,
          ID_artefak: parseInt(ID_artefak),
          ID_charasup: parseInt(ID_charasup),
          ID_batu: parseInt(ID_batu),
          Senjata1,
          Senjata2,
          Senjata3,
          Senjata4,
          link_avatar,
          Gambar_mat,
          gambar_lokalmat,
          Gambar_Senjata1,
          Gambar_Senjata2,
          Gambar_Senjata3,
          Gambar_Senjata4,
        },
      });
  
      return res.status(201).json({
        status: true,
        message: 'Karakter berhasil dibuat',
        data: newKarakter,
      });
    } catch (err) {
      console.error('Terjadi kesalahan saat membuat karakter:', err);
      return res.status(500).json({ status: false, message: 'Terjadi kesalahan internal server' });
    }
  };
  
  const updateKarakter = async (req, res) => {
    try {
        const {
            Nama_chara,
            Mat_ascend,
            Elemen,
            ID_artefak,
            ID_charasup,
            ID_batu,
            Lokal_mat,
            Senjata1,
            Senjata2,
            Senjata3,
            Senjata4,
        } = req.body;

        console.log(req.body)

        const id = req.params.id

        if (!id) {
            return res.status(400).json({ message: 'ID karakter wajib diisi' });
        }

        const existingKarakter = await prisma.karakter.findUnique({
            where: { id: parseInt(id) },
        });

        console.log(existingKarakter)

        if (!existingKarakter) {
            return res.status(404).json({ message: 'Karakter tidak ditemukan' });
        }

        const uploadImage = async (file) => {
            if (file) {
                const fileBase64 = file.buffer.toString("base64");
                try {
                    const response = await imagekit.upload({
                        fileName: Date.now() + path.extname(file.originalname),
                        file: fileBase64,
                        folder: "avatars",
                    });
                    return response.url;
                } catch (uploadError) {
                    console.error('Error saat mengupload gambar:', uploadError);
                    return null;
                }
            }
            return null;
        };

        const [
            link_avatar,
            Gambar_mat,
            gambar_lokalmat,
            Gambar_Senjata1,
            Gambar_Senjata2,
            Gambar_Senjata3,
            Gambar_Senjata4,
        ] = await Promise.all([
            uploadImage(req.files?.link_avatar ? req.files.link_avatar[0] : null),
            uploadImage(req.files?.Gambar_mat ? req.files.Gambar_mat[0] : null),
            uploadImage(req.files?.gambar_lokalmat ? req.files.gambar_lokalmat[0] : null),
            uploadImage(req.files?.Gambar_Senjata1 ? req.files.Gambar_Senjata1[0] : null),
            uploadImage(req.files?.Gambar_Senjata2 ? req.files.Gambar_Senjata2[0] : null),
            uploadImage(req.files?.Gambar_Senjata3 ? req.files.Gambar_Senjata3[0] : null),
            uploadImage(req.files?.Gambar_Senjata4 ? req.files.Gambar_Senjata4[0] : null),
        ]);

        const updatedKarakter = await prisma.karakter.update({
            where: { id: parseInt(id) },
            data: {
                Nama_chara: Nama_chara !== undefined ? Nama_chara : existingKarakter.Nama_chara,
                Mat_ascend: Mat_ascend !== undefined ? Mat_ascend : existingKarakter.Mat_ascend,
                Elemen: Elemen !== undefined ? Elemen : existingKarakter.Elemen,
                Lokal_mat: Lokal_mat !== undefined ? Lokal_mat : existingKarakter.Lokal_mat,
                ID_artefak: ID_artefak !== undefined ? parseInt(ID_artefak) : existingKarakter.ID_artefak,
                ID_charasup: ID_charasup !== undefined ? parseInt(ID_charasup) : existingKarakter.ID_charasup,
                ID_batu: ID_batu !== undefined ? parseInt(ID_batu) : existingKarakter.ID_batu,
                Senjata1: Senjata1 !== undefined ? Senjata1 : existingKarakter.Senjata1,
                Senjata2: Senjata2 !== undefined ? Senjata2 : existingKarakter.Senjata2,
                Senjata3: Senjata3 !== undefined ? Senjata3 : existingKarakter.Senjata3,
                Senjata4: Senjata4 !== undefined ? Senjata4 : existingKarakter.Senjata4,
                link_avatar: link_avatar || existingKarakter.link_avatar,
                Gambar_mat: Gambar_mat || existingKarakter.Gambar_mat,
                gambar_lokalmat: gambar_lokalmat || existingKarakter.gambar_lokalmat,
                Gambar_Senjata1: Gambar_Senjata1 || existingKarakter.Gambar_Senjata1,
                Gambar_Senjata2: Gambar_Senjata2 || existingKarakter.Gambar_Senjata2,
                Gambar_Senjata3: Gambar_Senjata3 || existingKarakter.Gambar_Senjata3,
                Gambar_Senjata4: Gambar_Senjata4 || existingKarakter.Gambar_Senjata4,
            },
        });


        return res.status(200).json({
            status: true,
            message: 'Karakter berhasil diperbarui',
            data: updatedKarakter,
        });
    } catch (err) {
        console.error('Terjadi kesalahan saat memperbarui karakter:', err);
        return res.status(500).json({ status: false, message: 'Terjadi kesalahan internal server' });
    }
};

const deleteKarakter = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: 'ID karakter wajib diisi' });
        }

        const existingKarakter = await prisma.karakter.findUnique({
            where: { id: parseInt(id) },
        });

        console.log(existingKarakter)

        if (!existingKarakter) {
            return res.status(404).json({ message: 'Karakter tidak ditemukan' });
        }

        await prisma.karakter.delete({
            where: { id: parseInt(id) },

        })

        return res.json( {status : true, message : 'karakter berhasil dihapus'})

    } catch(err) {
        console.error('Terjadi kesalahan saat memperbarui karakter:', err);
        return res.status(500).json({ status: false, message: 'Terjadi kesalahan internal server' });
    }
}

module.exports = { getAllKarakter, findCharacter, createKarakter, updateKarakter, deleteKarakter }