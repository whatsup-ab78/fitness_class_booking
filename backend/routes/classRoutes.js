// backend/routes/classRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getAllClasses, addClass } = require('../controllers/classController');

// --- Multer Storage Configuration ---
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/'); // The folder where files will be saved
    },
    filename(req, file, cb) {
        // Create a unique filename to prevent overwriting
        cb(null, `class-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const {
    getAllClasses,
    addClass,
    updateClass,  // <-- Import updateClass
    deleteClass   // <-- Import deleteClass
} = require('../controllers/classController');

const { protect, admin } = require('../middleware/authMiddleware');

const upload = multer({ storage });



// --- Routes ---
router.get('/', getAllClasses);

router.put('/:id', protect, admin, upload.single('image'), updateClass);
router.delete('/:id', protect, admin, deleteClass);
router.post('/', upload.single('image'), addClass);

module.exports = router;