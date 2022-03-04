const User = require('../models/UserModel');
const { registerSchema } = require('../utils/authValidation');
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormater');


// TODO : Index PONERLO EN OTRO LADO O EN EL INDEX.JS nO mAtcH with User I think
const renderIndex = (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    console.log(`You have visited ${req.session.views} times`);
    return res.render('index');
}


//----------RIGISTER
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

// LOGIN
const renderLogin = (req, res) => {
    return res.render('login', {
        message: {},
        formData: {},
        errors: {}
    })
}

const userLogin = (req, res) => {
    return res.render('login', {
        message: {
            type: 'success',
            body: 'Login Success'
        },
        formData: {},
        errors: {}
    })
}


module.exports = { 
    renderIndex, 
    renderRegister, 
    createrRegister, 
    renderLogin,
    userLogin }
