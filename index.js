require('dotenv').config() 
const express = require('express')
const cors = require('cors')
const { checkSchema } = require('express-validator')
const configureDB = require('./config/db')

const usersCltr = require('./app/controllers/users-cltr')
const categoriesCltr = require('./app/controllers/categories-cltr') 
const pollsCltr = require('./app/controllers/polls-cltr')
const { authenticateUser } = require('./app/middlewares/authentication')
const { userRegisterValidationSchema, userLoginValidationSchema } = require('./app/helpers/user-validation')
const categoryValidationSchema = require('./app/helpers/category-validation')
const pollValidationSchema = require('./app/helpers/poll-validation')

const port = 3090
const app = express() 
app.use(express.json())
app.use(cors())

configureDB()

app.post('/auth/register', checkSchema(userRegisterValidationSchema), usersCltr.register)
app.post('/auth/login', checkSchema(userLoginValidationSchema), usersCltr.login)
app.get('/api/users/account', authenticateUser, usersCltr.account)

app.get('/api/categories', categoriesCltr.list)
app.post('/api/categories', authenticateUser, checkSchema(categoryValidationSchema), categoriesCltr.create )

app.post('/api/polls', authenticateUser, checkSchema(pollValidationSchema), pollsCltr.create) 
app.get('/api/polls/mypolls', authenticateUser, pollsCltr.myPolls)

app.listen(port, () => {
    console.log('server running on port', port)
})