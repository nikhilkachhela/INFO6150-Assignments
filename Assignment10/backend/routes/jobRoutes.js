const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// Create job (Admin only)
router.post('/create/job', authenticate, isAdmin, jobController.createJob);

// Get all jobs
router.get('/jobs', authenticate, jobController.getAllJobs);

module.exports = router;