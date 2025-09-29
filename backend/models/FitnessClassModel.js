const mongoose = require('mongoose');

const fitnessClassSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Yoga', 'Gym', 'Dance'], required: true },
    schedule: { type: Date, required: true },
    duration: { type: Number, required: true }, // in minutes
    price: { type: Number, required: true },
    instructor: { type: String, required: true },
    imageUrl: { type: String, required: false },
    capacity: { type: Number, required: true, default: 15 }
});

module.exports = mongoose.model('FitnessClass', fitnessClassSchema);