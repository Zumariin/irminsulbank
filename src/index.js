const express = require('express')
const v1 = require('./routes/api.route')
const axios = require('axios')
const path = require('path')
require('dotenv').config();
const PORT = 3000

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
            console.error('Error fetching data from API:', error);
            return res.status(500).send('Error fetching data');
        }
    })
    .get('/character-details/name/:character', async (req, res) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/character/name/${req.params.character}`);
            const data = response.data;
            console.log(data)
            return res.render('characterdetail', { data : data.data });
        } catch (error) {
            console.error('Error fetching data from API:', error);
            return res.status(500).send('Error fetching data');
        }
    })

    .get('/character-tips', async (req, res) => {
        try {
            return res.render('charactertips');
        } catch (error) {
            console.error('Error fetching data from API:', error);
            return res.status(500).send('Error fetching data');
        }
    })
    .get('/thankyou', (req, res) => {
        try {
            return res.render('thankyou');
        } catch (error) {
            console.error('Error fetching data from API:', error);
            return res.status(500).send('Error fetching data');
        }
    })
    .get("/about", (req, res) => {
        try {
            return res.render('aboutus');
        } catch (error) {
            console.error('Error fetching data from API:', error);
            return res.status(500).send('Error fetching data');
        }
    })
    
    
    .use("/api/v1", v1)
    .listen(PORT, ()=> {
        console.log(`server running on port 3000`)
    })

module.exports = app