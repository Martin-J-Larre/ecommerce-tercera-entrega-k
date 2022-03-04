const { Router } = require('express');
const express = require('express');
const router = express.Router();

const { renderIndex, 
        renderRegister, 
        createrRegister, 
        renderLogin, 
        userLogin } = require('../controllers/userController');

// TODO : Index PONERLO EN OTRO LADO O EN EL INDEX.JS nO mAtcH with User I think
router.get('/', renderIndex );
//----------REGISTRATION
router.get('/register', renderRegister);
router.post('/register', createrRegister);

//----------LOGINS
router.get('/login', renderLogin);
router.post('/login', userLogin);




module.exports = router;