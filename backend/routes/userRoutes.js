// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

const {
    registerUser,
    loginUser,
    getAllUsers,
    deleteUser
} = require('../controllers/userController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin-only routes
router.get('/', protect, admin, getAllUsers);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;