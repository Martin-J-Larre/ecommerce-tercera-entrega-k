const User = require('../models/UserModel');
const { registerSchema } = require('../utils/authValidation');
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormater');


const renderIndex = (req, res) => {
    console.log('User:', req.user)
    return res.render('index')
}


//----------RIGISTER
const renderRegister = (req, res) => {
    return res.render('register');
}
    
const createrRegister = async (req, res) => {
    try {
        const validationResult = registerSchema.validate(req.body, {
            abortEarly: false
        })  
        if (validationResult.error) {
            req.session.flashData = {
                message: {
                    type: 'error',
                    body: 'Validation Error',
                },
                errors: joiErrorFormatter(validationResult.error),
                formData: req.body
            }
            return res.redirect('/register')
        }
        const user = new User(req.body)
        await user.save()
        req.session.flashData = {
            message: {
                type: 'success',
                body: 'Registration success'
            },
            formData: req.body
        }
        return res.redirect( '/register')
        
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
    return res.render('login')
}

const userLogin = (req, res) => {

    return res.render('login', {
        message: {
            type: 'success',
            body: 'Login Success'
        }
    })
}

// LOGOUT
const userLogout = (req, res) => {
    req.logout()
    res.redirect('/')
}


module.exports = { 
    renderIndex, 
    renderRegister, 
    createrRegister, 
    renderLogin,
    userLogin,
    userLogout
}
