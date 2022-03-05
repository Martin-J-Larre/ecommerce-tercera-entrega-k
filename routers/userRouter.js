const { Router } = require('express');
const express = require('express');
const router = express.Router();
const passport = require('passport')

const { authMiddleware } = require('../middlewares/authMiddleware');        
const { guestMiddleware } = require('../middlewares/guestMiddleware'); 
const flasherMiddleware = require('../middlewares/flasherMiddleware')       
const { renderIndex, 
        renderRegister, 
        createrRegister, 
        renderLogin, 
        userLogin,
        userLogout 
} = require('../controllers/userController');


//-----------INDEX/HOMEPAGE
router.get('/', renderIndex );

//todo: Llevar la tercera función al controller
router.get('/homepage', authMiddleware, (req, res) => {
    res.send(`Welcome ${req.user.name}`)
} );


//----------REGISTER
router.get('/register',guestMiddleware, flasherMiddleware, renderRegister);
router.post('/register',guestMiddleware, createrRegister);

//----------LOGIN
router.get('/login',guestMiddleware, renderLogin);

router.post('/login',guestMiddleware, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}), userLogin);

//---------LOG OUT
router.get('/logout',authMiddleware, userLogout);


module.exports = router;