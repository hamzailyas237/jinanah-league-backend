const orderModel = require("../models/orderSchema");

const orderController = {
    createOrder: (req, res) => {
        console.log('req body', req.body);
        const { email, phone, address } = req.body
        if (!email || !phone || !address) {
            res.status(400).json({
                message: 'Required fields are missing',
            })
            return
        }
        else {
            orderModel.create(req.body).then(order => {
                res.status(200).json({
                    message: 'Order Placed Successfully',
                    order
                })
            })
                .catch(err => {
                    res.status(500).json({
                        message: 'Something went wrong in placing order'
                    })
                })
        }
    },
    updateOrder: (req, res) => {
        orderModel.findByIdAndUpdate(req.body.id, { isPaymentDone: req.body.isPaymentDone }).then(order => {
            res.status(200).json({
                message: 'Payment Done Successfully',
            })
        })
            .catch(err => {
                res.status(500).json({
                    message: 'Something went wrong in placing order'
                })
            })
    }
}
module.exports = orderController