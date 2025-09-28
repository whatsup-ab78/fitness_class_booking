// backend/routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const { addBooking, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/bookings
// @desc    Add a new booking (for logged-in users)
router.post('/', protect, addBooking);

// @route   GET /api/bookings/mybookings
// @desc    Get the logged-in user's bookings
// vvv THIS IS THE CRUCIAL LINE THAT NEEDS TO BE CORRECT vvv
router.get('/mybookings', protect, getMyBookings);

module.exports = router;