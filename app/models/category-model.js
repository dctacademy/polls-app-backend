const mongoose = require('mongoose') 
const { Schema, model } = mongoose 

const categorySchema = new Schema({
    name: String 
})

const Category = model('Category', categorySchema) 

module.exports = Category 