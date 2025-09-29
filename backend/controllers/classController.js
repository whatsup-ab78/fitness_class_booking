const FitnessClass = require('../models/FitnessClassModel');
const Booking = require('../models/BookingModel');

// Get all classes
exports.getAllClasses = async (req, res) => {
    try {
        // Get all classes as plain JavaScript objects
        const classes = await FitnessClass.find({}).lean();

        // For each class, find how many bookings exist and add it as a new property
        for (let cls of classes) {
            cls.enrollmentCount = await Booking.countDocuments({ fitnessClass: cls._id });
        }
        
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add a new class (Admin only)
exports.addClass = async (req, res) => {
    const { name, description, category, schedule, duration, price, instructor } = req.body;
    const imageUrl = req.file ? `/${req.file.path.replace(/\\/g, "/")}` : '';
    const newClass = new FitnessClass({
        name, description, category, schedule, duration, price, instructor, imageUrl
    });

    try {
        const savedClass = await newClass.save();
        res.status(201).json(savedClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Add functions for update and delete

// @desc    Update a class
// @route   PUT /api/classes/:id
// @access  Private/Admin
exports.updateClass = async (req, res) => {
    try {
        const fitnessClass = await FitnessClass.findById(req.params.id);

        if (fitnessClass) {
            fitnessClass.name = req.body.name || fitnessClass.name;
            fitnessClass.description = req.body.description || fitnessClass.description;
            fitnessClass.category = req.body.category || fitnessClass.category;
            fitnessClass.schedule = req.body.schedule || fitnessClass.schedule;
            fitnessClass.duration = req.body.duration || fitnessClass.duration;
            fitnessClass.price = req.body.price || fitnessClass.price;
            fitnessClass.instructor = req.body.instructor || fitnessClass.instructor;

            if (req.file) {
                // If a new image is uploaded, update the path
                fitnessClass.imageUrl = `/${req.file.path.replace(/\\/g, "/")}`;
            }

            const updatedClass = await fitnessClass.save();
            res.json(updatedClass);
        } else {
            res.status(404).json({ message: 'Class not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete a class
// @route   DELETE /api/classes/:id
// @access  Private/Admin
exports.deleteClass = async (req, res) => {
    try {
        const fitnessClass = await FitnessClass.findById(req.params.id);

        if (fitnessClass) {
            await fitnessClass.remove();
            res.json({ message: 'Class removed' });
        } else {
            res.status(404).json({ message: 'Class not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// @desc    Get a single class by ID
// @route   GET /api/classes/:id
// @access  Public
exports.getClassById = async (req, res) => {
    try {
        const fitnessClass = await FitnessClass.findById(req.params.id);
        if (fitnessClass) {
            res.json(fitnessClass);
        } else {
            res.status(404).json({ message: 'Class not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};