const express = require('express')
const v1 = require('./routes/api.route')
const axios = require('axios')
const path = require('path')
require('dotenv').config();
const PORT = 3000

const app = express()
    .set('view engine', 'ejs')
    .set('views', path.join(__dirname, 'views'))

    .get("/", (req, res) => {
        return res.json({message : 'hello irpan'})
    })

    //operasi api halaman
    .get('/karakter', async (req, res) => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/karakter');
            const data = response.data;
            res.render('karakterdetail', { data });
        } catch (error) {
            console.error('Error fetching data from API:', error);
            res.status(500).send('Error fetching data');
        }
    })
    
    
    .use("/api/v1", v1)
    .listen(PORT, ()=> {
        console.log(`server running on port 3000`)
    })

module.exports = app