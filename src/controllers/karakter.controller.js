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


module.exports = { getAllKarakter }