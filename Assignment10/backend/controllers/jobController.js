const Job = require('../models/Job');

// Create a new job (Admin only)
exports.createJob = async (req, res) => {
    try {
        const { companyName, jobTitle, description, salary } = req.body;

        // Validate required fields
        if (!companyName || !jobTitle || !description || !salary) {
            return res.status(400).json({ 
                message: 'All fields are required' 
            });
        }

        // Create new job
        const job = new Job({
            companyName,
            jobTitle,
            description,
            salary,
            createdBy: req.user._id
        });

        await job.save();

        res.status(201).json({
            message: 'Job created successfully',
            job
        });
    } catch (error) {
        console.error('Create job error:', error);
        res.status(500).json({ 
            message: 'Error creating job', 
            error: error.message 
        });
    }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const jobs = await Job.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('createdBy', 'name email');

        const totalJobs = await Job.countDocuments();

        res.json({
            jobs,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalJobs / limit),
                totalJobs,
                limit
            }
        });
    } catch (error) {
        console.error('Get jobs error:', error);
        res.status(500).json({ 
            message: 'Error fetching jobs', 
            error: error.message 
        });
    }
};