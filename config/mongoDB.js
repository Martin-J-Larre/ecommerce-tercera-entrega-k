require('dotenv').config()
const mongoose = require('mongoose');
let { loggerInfo } = require('../utils/logs');
const DB_URI = process.env.DB_MONGO_ATLAS_URI;

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.once('open', () =>{
    loggerInfo.info("****** DATABASE CONNECTED ******");
})

module.exports = mongoose.connection

