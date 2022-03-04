const User = require('../models/UserModel');
const { registerSchema } = require('../utils/authValidation');
const renderIndex = (req, res) => {
    res.render('index');
}

const renderRegister = (req, res) => {
    return res.render('register', { message: null });
}
    
const createrRegister = async (req, res) => {
    try {
        const validationResult = registerSchema.validate(req.body, {
            abortEarly: false
        })
        if (validationResult.error) {
            return res.render( 'register', {
                message: "Validation Error!!"
            });
        }
        const user = new User(req.body)
        await user.save()
        return res.render( 'register', {
            message: "Registration successful!!"
        });
        
    } catch (err) {
        console.error(err);
        return res.status(400).render( 'register', {
            message: "Something is wrong :("
        });
    }
}



module.exports = { renderIndex, renderRegister, createrRegister }
