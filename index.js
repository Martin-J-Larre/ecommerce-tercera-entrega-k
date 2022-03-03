require('dotenv').config()
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5001;

//-----------Imports
const { dbConnect } = require('./config/mongoDB');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

dbConnect()
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

