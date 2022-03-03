const User = require('../models/UserModel');

const renderIndex = (req, res) => {
    res.render('index');
}

const renderRegister = (req, res) => {
    res.render('register');
}
    
const createrRegister = async (req, res) => {
    try {
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
