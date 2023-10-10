const User = require('../models/user-model') 
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const _ = require('lodash')
const usersCltr = {} 

usersCltr.register = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = _.pick(req.body, ['username','email','password'])
    try {
        const user = new User(body) 
        const salt = await bcryptjs.genSalt() 
        const hashedPassword  = await bcryptjs.hash(user.password, salt) 
        user.password = hashedPassword
        await user.save()
        res.json({
            message: "User registered successfully",
            user
        })
    } catch(e) {
        res.json(e) 
    }
}

usersCltr.login = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = _.pick(req.body, ['email', 'password']) 
    try {
        const user = await User.findOne({ email: body.email })
        if(!user) {
            return res.status(404).json({ errors: [{ msg: 'invalid email or password' }]})
        }  

        const result = await bcryptjs.compare(body.password, user.password)
        if(!result) {
            return res.status(404).json({ errors: [{ msg: 'invalid email or password' }] })
        }

        const tokenData = { id: user._id }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d'})
        res.json({ token: `Bearer ${token}`})
    } catch(e) {
        res.status(500).json(e)
    }
}

usersCltr.account = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.json(user)
    } catch(e) {
        res.status(500).json({ errors: 'something went wrong'})
    }
}

module.exports = usersCltr 