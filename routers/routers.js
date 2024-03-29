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
const { createOrder, updateOrder, getOrdersByUserId } = require("../controllers/orderController");
const {
  signup,
  login,
  googleAuth,
  updateUser,
  getUsersByRole,
} = require("../controllers/authController");
const { bookTable } = require("../controllers/bookTableController");

router.post("/restaurants", restaurants);
router.put("/review", review);
router.put("/product", addProduct);
router.get("/restaurants", getAllRestaurants);
router.get("/restaurant/:id", getSingleRestaurant);
router.post("/create-checkout-session", payment);
router.post("/order", createOrder);
router.patch("/order", updateOrder);
router.get("/order/:id", getOrdersByUserId);
router.post("/signup", signup);
router.post("/login", login);
router.post("/google-auth", googleAuth);
router.post("/book-table", bookTable);
router.patch("/user", updateUser);
router.get("/users/:role", getUsersByRole)

module.exports = router;
