const mongoose = require('mongoose');

// Define the internship application schema
const InternshipApplicationSchema = new mongoose.Schema({
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
  role: {
    type: String,
    required: true
  },
  githubProfile: {
    type: String
  },
  linkedinProfile: {
    type: String
  },
  message: {
    type: String,
    required: true
  }
});

const InternshipApplication = mongoose.model('InternshipApplication', InternshipApplicationSchema);

module.exports = InternshipApplication;
