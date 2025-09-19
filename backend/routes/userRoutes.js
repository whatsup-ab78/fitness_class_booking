
const express = require('express');
const router = express.Router();

// vvv We import BOTH functions in ONE single, clean statement vvv
const { registerUser, loginUser } = require('../controllers/userController');

// Define the routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// Export the router
module.exports = router;