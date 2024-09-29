const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
    },
    description: {
        type: String,
        required: true, 
    },
    requirements: {
        type: [String], 
        required: true, 
    },
    location: {
        type: [String],
        required: true,
    },
    employmentType: { 
        type: String,
        enum: ['Full-Time', 'Part-Time'],
        default: 'Full-Time',
    },
    salaryRange: {
        type: String, 
    },
    benefits: {
        type: [String], 
    },
    datePosted: { 
        type: Date,
        default: Date.now, 
    },
    status: { 
        type: String,
        enum: ['Open', 'Closed', 'On Hold'],
        default: 'Open', 
    }
});

const JobModel = mongoose.model("jobs", JobSchema);
module.exports = JobModel;
