

const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    reviews: [{
        reviewer: String,
        review: String,
    }],
    dishes: [{
        name: String,
        image: String,
        description: String,
        price: Number,
    }],
})
const productModel = mongoose.model('restuarant', productSchema)

module.exports = productModel