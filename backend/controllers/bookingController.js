// backend/controllers/bookingController.js
const Booking = require('../models/BookingModel');

// Get all bookings (Admin only)
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user', 'username').populate('fitnessClass', 'name');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new booking (for a logged-in user)
exports.addBooking = async (req, res) => {
    // We would get the user ID from the JWT token in a real implementation
    const { userId, classId } = req.body;

    const newBooking = new Booking({
        user: userId,
        fitnessClass: classId,
        paymentStatus: 'completed' // Assuming payment is handled
    });

    try {
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};