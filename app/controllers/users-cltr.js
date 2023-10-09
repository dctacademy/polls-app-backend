const User = require('../models/user-model') 
const usersCltr = {} 

usersCltr.register = async (req, res) => {
    const body = req.body 
    try {
        const user = new User(body) 
        await user.save()
        res.json({
            message: "User registered successfully"
        })
    } catch(e) {
        res.json(e) 
    }
}

module.export = usersCltr 