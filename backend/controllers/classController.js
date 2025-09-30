const FitnessClass = require('../models/FitnessClassModel');
const Booking = require('../models/BookingModel');

// @desc    Get all classes
// @route   GET /api/classes
// @access  Public
exports.getAllClasses = async (req, res) => {
    try {
        const classes = await FitnessClass.find({}).lean();
        for (let cls of classes) {
            cls.enrollmentCount = await Booking.countDocuments({ fitnessClass: cls._id });
        }
        res.json(classes);
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

// @desc    Add a new class
// @route   POST /api/classes
// @access  Private/Admin
exports.addClass = async (req, res) => {
    // --- THIS IS THE CRITICAL FIX ---
    // We now destructure ALL the possible fields from the request body.
    const { 
        name, description, category, schedule, duration, price, 
        instructor, capacity, durationType, durationText, 
        priceMonthly, priceQuarterly, priceAnnually 
    } = req.body;
    
    const imageUrl = req.file ? `/${req.file.path.replace(/\\/g, "/")}` : '';

    const newClass = new FitnessClass({
        name, description, category, schedule, duration, price, 
        instructor, capacity, imageUrl, durationType, durationText,
        priceMonthly, priceQuarterly, priceAnnually
    });
    // --- END OF CRITICAL FIX ---

    try {
        const savedClass = await newClass.save();
        res.status(201).json(savedClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update a class
// @route   PUT /api/classes/:id
// @access  Private/Admin
exports.updateClass = async (req, res) => {
    try {
        const fitnessClass = await FitnessClass.findById(req.params.id);

        if (fitnessClass) {
            // Update all fields if they exist in the request
            const fieldsToUpdate = [
                'name', 'description', 'category', 'schedule', 'duration', 'price', 
                'instructor', 'capacity', 'durationType', 'durationText', 
                'priceMonthly', 'priceQuarterly', 'priceAnnually'
            ];
            
            fieldsToUpdate.forEach(field => {
                if (req.body[field] !== undefined) {
                    fitnessClass[field] = req.body[field];
                }
            });

            if (req.file) {
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
            await fitnessClass.deleteOne();
            res.json({ message: 'Class removed' });
        } else {
            res.status(404).json({ message: 'Class not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};