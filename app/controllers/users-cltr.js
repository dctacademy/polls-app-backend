const User = require('../models/user-model') 
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

module.exports = usersCltr 