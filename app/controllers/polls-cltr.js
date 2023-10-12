const Poll = require('../models/poll-model')
const { validationResult } = require('express-validator')
const pollsCltr = {}

pollsCltr.myPolls = async (req, res) => {

}

pollsCltr.create = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }) 
    }
    const body = req.body 
    const poll = new Poll(body) 
    poll.creator = req.user.id 
    try {
        await poll.save()
        res.json(poll)
    } catch(e) {
        res.status(500).json(e) 
    }
}

module.exports = pollsCltr