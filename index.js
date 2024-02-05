
const express = require('express')
const router = require('./routers/routers')
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const cors = require('cors')
require('dotenv').config()

mongoose.connect(process.env.BASE_URL)
    .then(res => {
        console.log('MongoDB Connected');
    })
    .catch(err => {
        console.log(err);
    })

app.use(express.json())
app.use(cors())

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})