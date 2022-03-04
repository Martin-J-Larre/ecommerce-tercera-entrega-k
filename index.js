require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

const PORT = process.env.PORT || 5001;

//-----------Imports
const { dbConnect } = require("./config/mongoDB");
const userRoute = require("./routers/userRouter");

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "./views");
// app.set("trust proxy", 1); pal NGNX?
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

//ROUTES
app.use("/", userRoute);

dbConnect();
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
