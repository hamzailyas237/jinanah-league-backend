

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
    image: {
        type: String,
    },
    reviews: [{
        reviewer: String,
        review: String,
        rating: Number
    }],
    dishes: [{
        name: String,
        image: String,
        description: String,
        price: Number,
        isAvailable: Boolean
    }],
    isActive: Boolean
})
const productModel = mongoose.model('restuarant', productSchema)

module.exports = productModel