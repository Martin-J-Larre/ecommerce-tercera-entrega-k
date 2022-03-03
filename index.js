require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5001;

//-----------Imports
const { dbConnect } = require('./config/mongoDB');
const userRoute = require('./routers/userRouter');

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));


//EJS
app.set('view engine', 'ejs');
app.set("views", "./views");


//ROUTES
app.use('/', userRoute);


dbConnect()
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

