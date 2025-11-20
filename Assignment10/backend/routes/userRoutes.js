const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// Get all users (Admin only)
router.get('/users', authenticate, isAdmin, userController.getAllUsers);

module.exports = router;