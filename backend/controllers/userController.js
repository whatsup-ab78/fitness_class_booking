// backend/controllers/userController.js

const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- REGISTER USER ---
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User with that email already exists' });
        }
        
        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'Username is already taken' });
        }

        user = new User({ username, email, password });
        await user.save();
        
        res.status(201).json({ msg: 'User registered successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error. Please try again.' });
    }
};


// --- LOGIN USER (WITH SPY LOGS) ---
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log("--- LOGIN ATTEMPT ---");
    console.log("1. Received data from frontend:", req.body);

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log("2. Result: User with that email NOT FOUND in database.");
            console.log("------------------------");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log("2. Result: User FOUND in database:", user.email);
        console.log("3. Comparing passwords...");
        console.log("   - Password from form: ", password);
        console.log("   - Hashed password from DB: ", user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("4. Result: Passwords DO NOT MATCH.");
            console.log("------------------------");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log("4. Result: Passwords MATCHED successfully!");
        console.log("------------------------");
        
        const payload = {
            user: { id: user.id, role: user.role, username: user.username },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: payload.user });
            }
        );
    } catch (err) {
        console.error("!!! A SEVERE ERROR OCCURRED !!!", err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// backend/controllers/userController.js

// ... (at the end of the file, after registerUser and loginUser)

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.remove();
            res.json({ msg: 'User removed' });
        } else {
            res.status(404).json({ msg: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};