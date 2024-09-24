const nodemailer = require('nodemailer');

// Configure the transporter for your email service
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use any email service you prefer
  auth: {
    user: "np01cp4s220018@islingtoncollege.edu.np",
    pass: "bzdb xkcr kxxd uqxl",
  },
});

// Function to send email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "np01cp4s220018@islingtoncollege.edu.np",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;
