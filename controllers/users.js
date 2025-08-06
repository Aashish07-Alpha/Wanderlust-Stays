const User=require("../models/user");

module.exports.renderSignupForm=(req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup=async (req, res, next) => {
        try {
            const { username, email, password } = req.body;
            const newUser = new User({ email, username });
            const registeredUser = await User.register(newUser, password);

            console.log(registeredUser); // Optional: Log the registered user

            req.login(registeredUser, (err) => {
                if (err) {
                    return next(err);
                }
                req.flash("success", "Welcome to Wanderlust!");
                res.redirect("/listings");
            });
        } catch (e) {
            req.flash("error", e.message);
            res.redirect("/signup");
        }
    };

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=(req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    const redirectUrl = res.locals.redirectUrl || "/listings"; // Default redirect if none saved
    res.redirect(redirectUrl);
};

module.exports.logout=(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You were logged out");
        res.redirect("/listings");
    });
};

module.exports.renderProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('listings');
        
        // Get user's bookings
        const Booking = require('../models/booking.js');
        const bookings = await Booking.find({ user: req.user._id })
            .populate('listing')
            .sort({ bookingDate: -1 })
            .limit(5); // Show only recent bookings
        
        // Get user's reviews
        const Review = require('../models/review.js');
        const reviews = await Review.find({ author: req.user._id })
            .populate('listing')
            .sort({ createdAt: -1 })
            .limit(5); // Show only recent reviews
        
        res.render("users/profile.ejs", { 
            user, 
            bookings, 
            reviews,
            totalBookings: bookings.length,
            totalReviews: reviews.length
        });
    } catch (error) {
        console.error('Error rendering profile:', error);
        req.flash("error", "Failed to load profile");
        res.redirect("/listings");
    }
};