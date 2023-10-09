const userValidationSchema = {
    username: {
        notEmpty: {
            errorMessage: 'username is required'
        },
    },
    email: {
        notEmpty: {
            errorMessage: 'email is required'
        },
        isEmail: {
            errorMessage: 'invalid email format'
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'password is required'
        },
        isLength: {
            options: { min: 8, max: 128},
            errorMessage: 'password should be between 8 - 128 characters'
        }
    }
}

module.exports = userValidationSchema