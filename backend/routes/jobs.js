//backend/routes/jobs.js

const express = require('express');
const router = express.Router();
const JobModel = require('../models/jobs');

// Create a new job
router.post('/', async (req, res) => {
  try {
    const { title, description, requirements, location, employmentType, salaryRange, benefits, status} = req.body;

    const jobs = await JobModel.create({
      title,
      description,
      requirements,
      location,
      employmentType,
      salaryRange,
      benefits,
      status  
    });

    console.log('Job Added Successfully:', jobs);
    res.status(200).json({ message: 'Job Added Successfully', jobs });
  } catch (err) {
    console.error('Error Adding Job:', err);
    res.status(500).json({ error: 'An error occurred while adding the job' });
}
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await JobModel.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a job
router.put('/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await JobModel.findByIdAndUpdate(jobId, req.body, { new: true });
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a job
router.delete('/:id', async (req, res) => {
    const jobId = req.params.id;
    JobModel.findByIdAndDelete(jobId)
    .then((deletedJob) => res.json(deletedJob))
    .catch((err) => res.json(err));
});

module.exports = router;
