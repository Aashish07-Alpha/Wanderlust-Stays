const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookings.js");
const { isLoggedIn } = require("../middleware.js");

// Show user's bookings
router.get("/", isLoggedIn, bookingController.renderBookings);

// Create a new booking (after payment)
router.post("/:id", isLoggedIn, bookingController.createBooking);

// Cancel a booking
router.delete("/:bookingId", isLoggedIn, bookingController.cancelBooking);

module.exports = router; 