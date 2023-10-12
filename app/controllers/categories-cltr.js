const Category = require('../models/category-model')
const { validationResult } = require('express-validator')
const categoriesCltr = {}

categoriesCltr.list = async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch(e) {
        res.status(500).json(e)
    }
}

categoriesCltr.create = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body 
    const categoryObj = await Category.findOne({ name: { '$regex' : body.name, $options: 'i' } })
    if(!categoryObj) {
        const category = new Category(body) 
        try {
            await category.save()
            res.json(category)
        } catch(e) {
            res.status(500).json(e)
        }
    } else {
        res.status(204).json({ error: 'category already present'})
    }
}

module.exports = categoriesCltr 