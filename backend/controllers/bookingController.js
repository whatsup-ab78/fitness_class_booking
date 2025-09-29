// backend/controllers/bookingController.js
const Booking = require('../models/BookingModel');
const FitnessClass = require('../models/FitnessClassModel');

// @desc    Add a new booking
// @route   POST /api/bookings
// @access  Private
exports.addBooking = async (req, res) => {
    const { classId } = req.body;
    const userId = req.user.id; 

    try {
        const fitnessClass = await FitnessClass.findById(classId);
        if (!fitnessClass) {
            return res.status(404).json({ msg: 'Class not found' });
        }

        // --- NEW: DUPLICATE BOOKING CHECK ---
        const existingBooking = await Booking.findOne({ user: userId, fitnessClass: classId });
        if (existingBooking) {
            return res.status(400).json({ msg: 'You have already booked this class' });
        }
        // --- END OF NEW CHECK ---

        const bookingCount = await Booking.countDocuments({ fitnessClass: classId });
        if (bookingCount >= fitnessClass.capacity) {
            return res.status(400).json({ msg: 'This class is already full' });
        }

        const newBooking = new Booking({
            user: userId,
            fitnessClass: classId,
            paymentStatus: 'completed'
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @desc    Get logged-in user's bookings
// @route   GET /api/bookings/mybookings
// @access  Private
exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('fitnessClass') // This is magic! It replaces the classId with the full class document
            .sort({ bookingDate: -1 }); // Show most recent first
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.getClassEnrollments = async (req, res) => {
    try {
        const bookings = await Booking.find({ fitnessClass: req.params.id })
            .populate('user', 'username email'); // Get user's name and email
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};
