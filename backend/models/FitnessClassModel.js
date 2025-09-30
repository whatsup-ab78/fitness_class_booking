const mongoose = require('mongoose');

const fitnessClassSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Yoga', 'Gym', 'Dance', 'Zumba'], required: true },
    schedule: { type: Date },
    duration: { type: Number }, // No longer strictly required
    instructor: { type: String, required: true },
    imageUrl: { type: String, required: false },
    capacity: { type: Number, required: true, default: 15 },
    
    // Fields for dynamic duration and pricing
    durationType: { type: String, enum: ['singleDay', 'multiDay'], default: 'singleDay' },
    durationText: { type: String }, // For 'multi-day' text like 'Mon, Wed, Fri'
    
    // New pricing fields for multi-day plans
    price: { type: Number, required: true }, // This will be the single-day price
    priceMonthly: { type: Number },
    priceQuarterly: { type: Number },
    priceAnnually: { type: Number }
});

module.exports = mongoose.model('FitnessClass', fitnessClassSchema);