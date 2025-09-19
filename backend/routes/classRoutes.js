const express = require('express');
const router = express.Router();
const { getAllClasses, addClass } = require('../controllers/classController');

router.get('/', getAllClasses);
router.post('/', addClass); // You would add admin authentication middleware here

module.exports = router;