require('dotenv').config() 
const express = require('express')
const cors = require('cors')
const { checkSchema } = require('express-validator')
const configureDB = require('./config/db')

const usersCltr = require('./app/controllers/users-cltr')
const userValidationSchema = require('./app/helpers/user-validation')

const port = 3090
const app = express() 
app.use(express.json())
app.use(cors())

configureDB()

app.post('/auth/register', checkSchema(userValidationSchema), usersCltr.register)

app.listen(port, () => {
    console.log('server running on port', port)
})