const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductSchema = new Schema({
    name:{
        type: String,
    },
    price: {
        type: String,
    }
})


const Product = mongoose.model('Product', ProductSchema)


module.exports = Product