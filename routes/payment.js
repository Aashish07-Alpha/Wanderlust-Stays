const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.js');
const { isLoggedIn } = require('../middleware.js');

// Create payment order
router.post("/create-order", isLoggedIn, paymentController.createOrder);

// Verify payment
router.post("/verify", isLoggedIn, paymentController.verifyPayment);

// Get payment details
router.get("/details/:paymentId", isLoggedIn, paymentController.getPaymentDetails);

module.exports = router; 