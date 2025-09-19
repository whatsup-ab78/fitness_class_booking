const FitnessClass = require('../models/FitnessClassModel');

// Get all classes
exports.getAllClasses = async (req, res) => {
    try {
        const classes = await FitnessClass.find();
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new class (Admin only)
exports.addClass = async (req, res) => {
    const { name, description, category, schedule, duration, price, instructor } = req.body;
    const newClass = new FitnessClass({ name, description, category, schedule, duration, price, instructor });

    try {
        const savedClass = await newClass.save();
        res.status(201).json(savedClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Add functions for update and delete