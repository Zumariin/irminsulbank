const { getAllKarakter } = require('../controllers/karakter.controller')

const route = require('express').Router()
    .get('/karakter', getAllKarakter)
module.exports = route