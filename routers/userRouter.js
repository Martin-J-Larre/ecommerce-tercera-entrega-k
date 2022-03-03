const { Router } = require('express');
const express = require('express');
const router = express.Router();

const { renderIndex, renderRegister, createrRegister } = require('../controllers/userController');

router.get('/', renderIndex );

router.get('/register', renderRegister);

router.post('/register', createrRegister);



module.exports = router;