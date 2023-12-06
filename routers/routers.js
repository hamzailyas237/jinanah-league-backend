// const router = require("express").Router()
// OR
const express = require("express");
const router = express.Router();

const {
  restaurants,
  review,
  addProduct,
  getAllRestaurants,
  getSingleRestaurant,
} = require("../controllers/restaurantController");
const { payment } = require("../controllers/paymentController");
const { createOrder, updateOrder } = require("../controllers/orderController");

router.post("/restaurants", restaurants);
router.put("/review", review);
router.put("/product", addProduct);
router.get("/restaurants", getAllRestaurants);
router.get("/restaurant/:id", getSingleRestaurant);
router.post("/create-checkout-session", payment);
router.post("/order", createOrder);
router.patch("/order", updateOrder);

module.exports = router;
