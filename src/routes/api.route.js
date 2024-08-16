const { getAllKarakter, findCharacter, createKarakter, updateKarakter } = require('../controllers/karakter.controller')
const { loginController, whoAmIController } = require('../controllers/auth.controller')
const multer = require('../libs/multer.lib')

const upload = multer.image.fields([
    { name: 'link_avatar', maxCount: 1 },
    { name: 'Gambar_mat', maxCount: 1 },
    { name: 'gambar_lokalmat', maxCount: 1 },
    { name: 'Gambar_Senjata1', maxCount: 1 },
    { name: 'Gambar_Senjata2', maxCount: 1 },
    { name: 'Gambar_Senjata3', maxCount: 1 },
    { name: 'Gambar_Senjata4', maxCount: 1 },
  ]);

const route = require('express').Router()
    .get('/character/name/:character', findCharacter)
    .get('/character', getAllKarakter)
    .post('/auth/login', loginController)
    .get('/auth/whoami', whoAmIController)
    
    .post('/create/character', upload, createKarakter)
    .post('/update/character/:id', upload, updateKarakter )


module.exports = route