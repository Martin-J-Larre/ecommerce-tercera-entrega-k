require('dotenv').config()
const mongoose = require('mongoose');

const DB_URI = process.env.DB_MONGO_ATLAS_URI;

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.once('open', () =>{
    console.log("****** DATABASE CONNECTED ******");
})

module.exports = mongoose.connection

