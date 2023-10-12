const mongoose = require('mongoose')
const {Schema, model} = mongoose 
const pollSchema = new Schema({
    question: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    options: [
        {
            optionText: String
        }
    ],
    endDate: Date,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
})

const Poll = model('Poll', pollSchema) 

module.exports = Poll