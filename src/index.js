const express = require('express')
const v1 = require('./routes/api.route')
const axios = require('axios')
const path = require('path')
require('dotenv').config();
const bodyParser = require('body-parser');
const { getAllKarakter } = require('./controllers/karakter.controller');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const PORT = 3000

const substats = {
    cyno:"Energy Recharge%, CRIT Rate/DMG, Elemental Mastery, ATK%",
    arlecchino:"CRIT Rate, CRIT DMG, Energy Recharge, ATK%",
    neuvilette:"HP%, CRIT Rate, CRIT DMG, Energy Recharge, Elemental Mastery",
    ayaka:"CRIT DMG, Energy Recharge, ATK%, CRIT Rate",
    wanderer:"CRIT Rate, CRIT DMG, Energy Recharge, ATK%",
    nahida:"Elemental Mastery, CRIT Rate, CRIT DMG, Energy Recharge",
    zhongli:"HP%, HP, Energy Recharge",
    raiden:"Energy Recharge, CRIT DMG, CRIT Rate, ATK%, Elemental Mastery",
}

const app = express()
    .use(express.json())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(express.static(path.join(__dirname, '..', 'public')))
    .use("/api/v1", v1)
    .set('view engine', 'ejs')
    .set('views', path.join(__dirname, 'views'))

    .get("/irfan", (req, res) => {
        return res.json({message : 'hello irpan'})
    })

    //halaman
    .get("/", (req, res) => {
        try {
            return res.render('home');
        } catch (error) {
            return res.status(500).send('Error fetching data');
        }
    })
    .get('/character-details/name/:character', async (req, res) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/character/name/${req.params.character}`);
            const data = response.data;
            const characterSubstats = substats[`${req.params.character}`]
            return res.render('characterdetail', { data : data.data, valueSubstats: characterSubstats});
        } catch (error) {
            return res.status(500).send('Error fetching data');
        }
    })

    .get('/login', async (req, res) => {
        try {
            return res.render('login');
        } catch (error) {
            return res.status(500).send('Error fetching data');
        }
    })

    .get('/character-tips', async (req, res) => {
        try {
            return res.render('charactertips');
        } catch (error) {
            return res.status(500).send('Error fetching data');
        }
    })
    .get('/thankyou', (req, res) => {
        try {
            return res.render('thankyou');
        } catch (error) {
            return res.status(500).send('Error fetching data');
        }
    })
    .get("/about", (req, res) => {
        try {
            return res.render('aboutus');
        } catch (error) {
            return res.status(500).send('Error fetching data');
        }
    })


    //dashboard

    .get("/dashboard", (req, res) => {
        try {
            return res.render('dashboard');
        } catch (error) {
            return res.status(500).send('Error fetching data');
        }
    })

    .get("/dashboard/character-main", async (req, res) => {
        try {
            const data = await getAllKarakter(); 

            console.log(data)

            console.log("disini")
            return res.render('admin_character', { data });
        } catch (err) {
            return res.status(500).send('Error fetching data');
        }
    })

    .get("/dashboard/admin/tambah-character", async (req, res) => {
        try {
            return res.render('add_character');
        } catch (err) {
            return res.status(500).send('Error fetching data');
        }
    })
    .get('/dashboard/admin/update-character/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const character = await prisma.karakter.findUnique({
                where: { id: parseInt(id) },
                include: {
                    artefak: true,
                    karakter_support: true,
                    batu_ascend: true,
                },
            });
    
            if (!character) {
                return res.status(404).send('Character not found');
            }
    
            return res.render('update_character', { character });
        } catch (err) {
            console.error('Error fetching character for update:', err);
            return res.status(500).send('Error fetching data');
        }
    })
    
    

    .listen(PORT, ()=> {
        console.log(`server running on port 3000`)
    })

module.exports = app