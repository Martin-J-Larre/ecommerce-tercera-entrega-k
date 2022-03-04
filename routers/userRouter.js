const { Router } = require('express');
const express = require('express');
const router = express.Router();
const passport = require('passport')

const { authMiddleware } = require('../middlewares/authMiddleware');        
const { guestMiddleware } = require('../middlewares/guestMiddleware');        
const { renderIndex, 
        renderRegister, 
        createrRegister, 
        renderLogin, 
        userLogin 
} = require('../controllers/userController');


//-----------INDEX/HOMEPAGE
router.get('/', renderIndex );

//todo: Llevar la tercera función al controller
router.get('/homepage', authMiddleware, (req, res) => {
    res.send(`Welcome ${req.user.name}`)
} );


//----------REGISTRATION
router.get('/register',guestMiddleware, renderRegister);
router.post('/register',guestMiddleware, createrRegister);

//----------LOGINS
router.get('/login',guestMiddleware, renderLogin);

router.post('/login',guestMiddleware, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}), userLogin);

module.exports = router;