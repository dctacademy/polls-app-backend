const Category = require('../models/category-model')
const categoryValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: 'category name is required'
        },
        custom: {
            options: async (value) => {
                const category = await Category.findOne({ name: { '$regex' : value, $options: 'i'}})
                if(!category) {
                    return true 
                } else {
                    throw new Error('category already present')
                }
            }
        }
    }
}

module.exports = categoryValidationSchema