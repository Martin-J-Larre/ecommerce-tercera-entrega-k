require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require('passport');
require('./utils/localStrategy');

const PORT = process.env.PORT || 5001;
const app = express();

//-----------Imports
const { dbConnect } = require("./config/mongoDB");
const userRoute = require("./routers/userRouter");

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "./views");
//Session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);
// Passport
app.use(passport.initialize())
app.use(passport.session())

//ROUTES
app.use("/", userRoute);

dbConnect();
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
