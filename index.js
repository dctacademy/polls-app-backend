require('dotenv').config() 
const express = require('express')
const cors = require('cors')
const configureDB = require('./config/db')
const port = 3090
const app = express() 
app.use(express.json())
app.use(cors())

configureDB()

app.listen(port, () => {
    console.log('server running on port', port)
})