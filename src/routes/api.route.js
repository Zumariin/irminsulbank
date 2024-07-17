const { getAllKarakter, findCharacter } = require('../controllers/karakter.controller')

const route = require('express').Router()
    .get('/character/name/:character', findCharacter)
    .get('/character', getAllKarakter)
module.exports = route