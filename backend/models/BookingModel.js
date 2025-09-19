const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fitnessClass: { type: mongoose.Schema.Types.ObjectId, ref: 'FitnessClass', required: true },
    bookingDate: { type: Date, default: Date.now },
    paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
});

module.exports = mongoose.model('Booking', bookingSchema);