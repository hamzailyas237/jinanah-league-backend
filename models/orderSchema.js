const { default: mongoose } = require("mongoose");


const orderSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    isPaymentDone: {
        type: Boolean,
    },
    status: {
        type: String,
        default: 'pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

})
const orderModel = mongoose.model('order', orderSchema)
module.exports = orderModel 