const { Router } = require('express');
const express = require('express');
const router = express.Router();
const passport = require('passport')

const { renderIndex, 
        renderRegister, 
        createrRegister, 
        renderLogin, 
        userLogin } = require('../controllers/userController');

        
router.get('/', renderIndex );
//----------REGISTRATION
router.get('/register', renderRegister);
router.post('/register', createrRegister);

//----------LOGINS
router.get('/login', renderLogin);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/login-success',
    failureRedirect: '/login-failed'
}), userLogin);

module.exports = router;