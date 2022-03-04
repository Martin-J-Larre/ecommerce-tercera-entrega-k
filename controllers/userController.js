const User = require('../models/UserModel');
const { registerSchema } = require('../utils/authValidation');
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormater');

const renderIndex = (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    console.log(`You have visited ${req.session.views} times`);
    return res.render('index');
}

const renderRegister = (req, res) => {
    return res.render('register', { message: {}, formData: {}, errors: {} });
}
    
const createrRegister = async (req, res) => {
    try {
        const validationResult = registerSchema.validate(req.body, {
            abortEarly: false
        })  
        if (validationResult.error) {
            return res.render( 'register', {
                message: {
                    type: 'error',
                    body: 'Validation Error',
                },
                errors: joiErrorFormatter(validationResult.error),
                formData: req.body
            });
        }
        const user = new User(req.body)
        await user.save()
        return res.render( 'register', {
            message: {
                type: 'success',
                body: 'Registration success'
            },
            errors: {},
            formData: req.body
        })
        
    } catch (err) {
        console.error(err);
        return res.status(400).render( 'register', {
            message: {
                type: 'error',
                body: 'Validation Error',
            },
            errors: mongooseErrorFormatter(err),
            formData: req.body
        });
    }
}



module.exports = { renderIndex, renderRegister, createrRegister }
