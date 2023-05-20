

// const router = require("express").Router()
// OR 
const express = require("express")
const router = express.Router()

const { restaurants, review, addProduct, getAllRestaurants } = require('../controllers/restaurantController')


router.post('/restaurants', restaurants)
router.put('/review', review)
router.put('/product', addProduct)
router.get('/restaurants', getAllRestaurants)



module.exports = router