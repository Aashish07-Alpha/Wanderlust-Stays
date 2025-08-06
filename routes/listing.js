const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const mongoose = require("mongoose"); // Import mongoose for ObjectId validation
const Listing = require("../models/listing.js"); // Importing Listing schema (used for certain operations)
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const {storage}=require("../cloudConfig.js");

const multer  = require('multer')
const upload = multer({ storage})
// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Invalid Listing ID");
    return res.redirect("/listings");
  }
  next();
};

// Routes for Listings
router
  .route("/")
  .get(wrapAsync(listingController.index)) // Corrected duplicate "/" in the get route
  .post(isLoggedIn,upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListing))
  
// New Route (Create form for new listing)
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));


router
  .route("/:id")
  .get(validateObjectId, wrapAsync(listingController.showListing))
  .put(isLoggedIn, validateObjectId, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, validateObjectId, isOwner, wrapAsync(listingController.destroyListing));




// Edit Route
router.get("/:id/edit", isLoggedIn, validateObjectId, isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;
