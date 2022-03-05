require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require('morgan')
require("./config/mongoDB");
const MongoStore = require('connect-mongo')(session);
const mongoDbConnection = require('./config/mongoDB')
const passport = require('passport');
require('./utils/localStrategy');

const userRoute = require("./routers/userRouter");

const PORT = process.env.PORT || 5001;
const app = express();


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
        store: new MongoStore({ mongooseConnection: mongoDbConnection })
    })
);
app.use(express.static('public'));

app.use(logger('dev'))
app.use(passport.initialize())
app.use(passport.session())
app.locals.message = {}
app.locals.formData = {}
app.locals.errors = {}


//ROUTES
app.use("/", userRoute);
app.use((req, res, next) => {
    res.status(404).render("404")
})
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
