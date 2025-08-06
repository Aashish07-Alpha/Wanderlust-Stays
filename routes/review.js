const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isreviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js"); // Corrected import path to controllers
const Listing = require("../models/listing.js");
const Review = require("../models/review.js"); // Ensure you are not importing unnecessary variables

// POST Route to create a new review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// DELETE Route to delete a review
router.delete("/:reviewId", isLoggedIn, isreviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;
