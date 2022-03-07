const express = require("express");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
require("./config/mongoDB");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const compression = require('compression');

const errorController = require("./controllers/error");
const User = require("./models/user");
let { loggerInfo } = require('./utils/logs');

const app = express();

//--------------Cluster

let cluster = require('cluster');
let numCPUs = require('os').cpus().length;
const modoCluster = process.argv[2] == 'CLUSTER'

// Master/Primary
if (modoCluster && cluster.isMaster) {
    loggerInfo.info(`Master ${process.pid} is running`);

    for (let index = 0; index < numCPUs; index++) {
        cluster.fork();
    }
    cluster.on("exit", (worker) =>
        loggerInfo.info(`Worker ${worker.process.pid} died`)
    );
} else {

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.DB_MONGO_ATLAS_URI;

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions",
});
const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: process.env.API_KEY,
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then((user) => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch((err) => {
            next(new Error(err));
        });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get("/500", errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
    res.status(500).render("500", {
        pageTitle: "Error!",
        path: "/500",
        isAuthenticated: req.session.isLoggedIn,
    });
});

app.listen(PORT, () => {
    loggerInfo.info(`Server listening on http://localhost:${PORT} || PID: ${process.pid}`);
})

}