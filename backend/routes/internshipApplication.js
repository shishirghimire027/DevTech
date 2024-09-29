const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const InternshipApplication = require('../models/internshipApplication');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'bhattaraiaashish100@gmail.com', 
    pass: 'kqde bnmo daxm bjhh', 
  },
});

// POST route to handle internship application submission
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, role, github, linkedin, message } = req.body;

    // Create a new internship application
    const newInternshipApplication = new InternshipApplication({
      fullName: name,
      email,
      phone,
      role,
      githubProfile: github,
      linkedinProfile: linkedin,
      message,
    });

    // Save the application to the database
    await newInternshipApplication.save();

    // Send a confirmation email to the applicant
    const mailOptions = {
      from: 'bhattaraiaashish@gmail.com', // Your email
      to: email, // Applicant's email address from the form
      subject: 'Internship Application Received - DevTech PVT. LTD.',
      text: `Dear ${name},\n\nThank you for applying for the internship position for ${role} at our company. We have received your application and will be in touch soon.\n\nBest regards,\nYour Company Name`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit application.' });
  }
});

module.exports = router;
