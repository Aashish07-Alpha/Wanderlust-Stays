const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");

module.exports.renderBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('listing')
            .sort({ bookingDate: -1 });
        
        res.render("bookings/index.ejs", { bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        req.flash("error", "Failed to load bookings");
        res.redirect("/listings");
    }
};

module.exports.createBooking = async (req, res) => {
    try {
        const { startDate, endDate, guests, totalPrice, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
        const listingId = req.params.id;
        
        const newBooking = new Booking({
            user: req.user._id,
            listing: listingId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            guests: parseInt(guests),
            totalPrice: parseFloat(totalPrice),
            paymentStatus: 'completed',
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature,
            status: 'confirmed'
        });
        
        await newBooking.save();
        
        req.flash("success", "Booking confirmed successfully!");
        res.json({
            success: true,
            message: "Booking created successfully",
            bookingId: newBooking._id
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({
            success: false,
            message: "Failed to create booking"
        });
    }
};

module.exports.cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId);
        
        if (!booking) {
            req.flash("error", "Booking not found");
            return res.redirect("/bookings");
        }
        
        if (!booking.user.equals(req.user._id)) {
            req.flash("error", "You don't have permission to cancel this booking");
            return res.redirect("/bookings");
        }
        
        booking.status = 'cancelled';
        await booking.save();
        
        req.flash("success", "Booking cancelled successfully");
        res.redirect("/bookings");
    } catch (error) {
        console.error('Error cancelling booking:', error);
        req.flash("error", "Failed to cancel booking");
        res.redirect("/bookings");
    }
}; 