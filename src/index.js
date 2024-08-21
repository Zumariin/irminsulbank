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

const ENV = process.env.ENV || 'staging'; 

let apiBaseUrl;

if (ENV === 'production') {
    apiBaseUrl = 'http://103.127.137.138:3772';
} else if (ENV === 'staging') {
    apiBaseUrl = 'https://bw2nj1xt-3000.asse.devtunnels.ms';
} else {
    apiBaseUrl = 'http://localhost';
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

            console.log(req.params.character)
            console.log(req.params.character.toLowerCase())
            const response = await axios.get(`${apiBaseUrl}/api/v1/character/name/${req.params.character}`);

            console.log(response.data)
            const data = response.data;
            const characterSubstats = substats[`${req.params.character.toLowerCase().split(' ')[0]}`]
            return res.render('characterdetail', { data : data.data, valueSubstats: characterSubstats, apiBaseUrl: apiBaseUrl});
        } catch (error) {
            console.log(error)
            return res.status(500).send('Error fetching data');
        }
    })

    .get('/login', async (req, res) => {

        console.log(apiBaseUrl)
        try {
            return res.render('login',  { apiBaseUrl : apiBaseUrl });
        } catch (error) {
            return res.status(500).send('Error fetching data');
        }
    })

    .get('/character-tips', async (req, res) => {
        try {

            const karakter = await prisma.karakter.findMany({
                select : {
                    Nama_chara : true,
                    link_avatar : true,
                }
            })
            return res.render('charactertips', { karakter });
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
            return res.render('dashboard', { apiBaseUrl: apiBaseUrl });
        } catch (error) {
            return res.status(500).send('Error fetching data');
        }
    })

    .get("/dashboard/character-main", async (req, res) => {
        try {
            const data = await getAllKarakter(); 

            console.log(data)

            console.log("disini")
            return res.render('admin_character', { data, apiBaseUrl: apiBaseUrl });
        } catch (err) {
            return res.status(500).send('Error fetching data');
        }
    })

    .get("/dashboard/admin/tambah-character", async (req, res) => {
        try {
            return res.render('add_character', { apiBaseUrl: apiBaseUrl });
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
    
            return res.render('update_character', { character, apiBaseUrl: apiBaseUrl });
        } catch (err) {
            console.error('Error fetching character for update:', err);
            return res.status(500).send('Error fetching data');
        }
    })

    .get('/dashboard/character-sup', async (req, res) => {
        try {

            const characterSupport = await prisma.karakter_Support.findMany()
    
            return res.render('admin_character_support', { characterSupport, apiBaseUrl: apiBaseUrl });

        } catch (err) {
            console.error('Error fetching character for update:', err);
            return res.status(500).send('Error fetching data');
        }
    })

    .get('/dashboard/artefak', async (req, res) => {
        try {
            const artefak = await prisma.artefak.findMany()
    
            return res.render('admin_artefak', { artefak, apiBaseUrl: apiBaseUrl });
        } catch(err) {
            console.error('Error fetching character for update:', err);
            return res.status(500).send('Error fetching data');
        }
    })

    .get('/dashboard/batu-ascend', async (req, res) => {
        try {
            const batu_ascend = await prisma.batu_ascend.findMany()
    
            return res.render('admin_batu_ascend', { batu_ascend, apiBaseUrl: apiBaseUrl });
        } catch(err) {
            console.error('Error fetching character for update:', err);
            return res.status(500).send('Error fetching data');
        }
    })
    
    

    .listen(PORT, ()=> {
        console.log(`server running on port 3000`)
    })

module.exports = app