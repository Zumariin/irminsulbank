const express = require('express')
const v1 = require('./routes/api.route')
const axios = require('axios')
const path = require('path')
require('dotenv').config();
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
    .use(express.static(path.join(__dirname, '..', 'public')))
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
    
    
    .use("/api/v1", v1)
    .listen(PORT, ()=> {
        console.log(`server running on port 3000`)
    })

module.exports = app