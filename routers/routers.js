

// const router = require("express").Router()
// OR 
const express = require("express")
const router = express.Router()

const { restaurants, review, addProduct, getAllRestaurants, getSingleRestaurant } = require('../controllers/restaurantController')


router.post('/restaurants', restaurants)
router.put('/review', review)
router.put('/product', addProduct)
router.get('/restaurants', getAllRestaurants)
router.get('/restaurant/:id', getSingleRestaurant)



module.exports = router