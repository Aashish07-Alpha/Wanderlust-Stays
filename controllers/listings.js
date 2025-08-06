const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// Modified Index Controller with Search and Filtering
module.exports.index = async (req, res) => {
  const { search, category, trending } = req.query;
  let query = {};

  // Search functionality
  if (search && search.trim()) {
    query.title = {
      $regex: new RegExp(search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i')
    };
  }

  // Category filtering
  if (category && category !== 'all') {
    if (category === 'trending') {
      query.isTrending = true;
    } else if (category === 'iconic-cities') {
      query.category = 'iconic-cities';
    } else if (category === 'rooms') {
      query.category = 'rooms';
    } else {
      query.category = category;
    }
  }

  // Trending filter (alternative way to filter trending)
  if (trending === 'true') {
    query.isTrending = true;
  }

  const allListings = await Listing.find(query);
  res.render("listings/index.ejs", {
    allListings,
    searchQuery: search,
    activeCategory: category || 'all'
  });
}

// Rest of the code remains unchanged
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author"
      }
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  
  // Set default category if not provided
  if (!newListing.category || newListing.category === '') {
    newListing.category = 'rooms';
  }
  
  // Set trending status based on category or random chance
  if (newListing.category === 'trending' || Math.random() < 0.3) {
    newListing.isTrending = true;
  }

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  
  // Ensure category is set if not provided
  if (!req.body.listing.category || req.body.listing.category === '') {
    req.body.listing.category = 'rooms';
  }
  
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    listing.image = { url: req.file.path, filename: req.file.filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};