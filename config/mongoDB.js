
const mongoose = require('mongoose');

const dbConnect = () => {
    const DB_URI = process.env.DB_MONGO_ATLAS_URI
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },(err, res) =>{
        if (!err) {
            console.log("****** DATABASE CONNECTED ******");
        } else {
            console.log("****** CONNECTION ERROR ******");
        }
    })
}

module.exports = { dbConnect }