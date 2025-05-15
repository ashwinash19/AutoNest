const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);       // Place new order
router.get("/mine", protect, getMyOrders);    // Get user's order history

module.exports = router;
