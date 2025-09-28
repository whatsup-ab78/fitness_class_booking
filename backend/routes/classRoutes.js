// backend/routes/classRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// vvv We import all four functions in ONE single statement vvv
const {
    getAllClasses,
    addClass,
    updateClass,
    deleteClass,
    getClassById // <-- Import the new function
} = require('../controllers/classController');

// Import middleware
const { protect, admin } = require('../middleware/authMiddleware');

// --- Multer Config ---
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `class-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

// --- Routes ---

// @route   GET /api/classes
// @access  Public
router.get('/', getAllClasses);

// @route   POST /api/classes
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), addClass);

// @route   PUT /api/classes/:id
// @access  Private/Admin
router.put('/:id', protect, admin, upload.single('image'), updateClass);

// @route   DELETE /api/classes/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteClass);


// @route   GET /api/classes/:id
// @access  Public
router.get('/:id', getClassById);


module.exports = router;