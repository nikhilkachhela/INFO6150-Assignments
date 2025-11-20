const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

// Register/Create user
router.post('/user/create', authController.createUser);

// Login
router.post('/auth/login', authController.login);

// Get current user
router.get('/auth/me', authenticate, authController.getCurrentUser);

module.exports = router;