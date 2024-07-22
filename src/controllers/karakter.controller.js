const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllKarakter = async(req, res) => {
    try {
        const karakter = await prisma.karakter.findMany()

        return res.status(200).json(
            {
                status : true,
                message : 'success',
                data : karakter
            }
        )
    } catch(err) {
        throw err
    }
}

const findCharacter = async(req, res) => {
    try {
       const nama = req.params.character

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

module.exports = { getAllKarakter, findCharacter }