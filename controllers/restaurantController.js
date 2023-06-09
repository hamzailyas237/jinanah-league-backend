

const productModel = require('../models/productSchema');
var mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const restaurantControllers = {
    restaurants: (req, res) => {
        console.log(req.body);
        const { name, location, phone, reviews, dishes } = req.body
        if (!name || !location || !phone || !reviews || !dishes) {
            res.status(400).json({
                message: 'Required fields are missing',
            })
            return
        }
        else {
            productModel.create({ ...req.body }).then(product => {
                res.status(200).json({
                    message: 'Resturant Added',
                    product
                })
            })
                .catch(err => {
                    res.status(500).json({
                        message: 'Something went wrong in adding resturant'
                    })
                })
        }
    },

    review: (req, res) => {
        const { id } = req.body
        const _id = new ObjectId(id);
        const userReview = { reviewer: req.body.reviewer, review: req.body.review }
        productModel.update({ _id },
            { $push: { reviews: userReview } })
            .then(review => {
                res.status(200).json({
                    message: 'Review Added',
                    review
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Something went wrong in adding review'
                })
            })
    },

    addProduct: (req, res) => {
        const { id } = req.body
        const _id = new ObjectId(id);
        // const checkId = mongoose.Types.ObjectId.isValid(_id);
        const product = {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price
        }
        productModel.update({ _id },
            { $push: { dishes: product } })
            .then(data => {
                res.status(200).json({
                    message: 'Product Added',
                    data
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Something went wrong in adding product'
                })
            })
    },

    getAllRestaurants: (req, res) => {
        productModel.find({}).then(data => {
                res.status(200).json({
                    message: 'Get Restuarants',
                    data
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Something went wrong in adding product'
                })
            })
    }
}

module.exports = restaurantControllers