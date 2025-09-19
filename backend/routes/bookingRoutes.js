// backend/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { getAllBookings, addBooking } = require('../controllers/bookingController');

// @route   GET api/bookings
// @desc    Get all bookings
router.get('/', getAllBookings); // Add admin protection later

// @route   POST api/bookings
// @desc    Create a booking
router.post('/', addBooking); // Add user protection later

module.exports = router;