const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {type: String, require: true, max: 100},
    price: {type: Number, require: true},
    description: {type: String, require: true, max: 20},
    img: {type: String, require: true},
    category: {type: String, require: true, max: 10},
    stock: {type: Number, require: true}
})

module.exports = mongoose.model('product', ProductSchema);