const mongoose = require('mongoose');

// Define the job application schema
const JobApplicationSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  qualifications: {
    type: String,
    required: true
  },
  linkedinProfile: {
    type: String
  }
});

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);

module.exports = JobApplication;
