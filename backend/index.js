const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const Contact = require("./models/Contact");
const sendEmail = require("./routes/emailService");

// Initialize Express
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB without deprecated options
mongoose
  .connect("mongodb://localhost:27017/DevTech")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Contact us API
app.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    // Send an email notification
    const emailSubject = `Customer support: ${subject}`;
    const emailText = `You have received a new message from ${name} (${email}).\n\nSubject: ${subject}\n\nMessage:\n${message}`;

    sendEmail("shishirghimire027@gmail.com", emailSubject, emailText);

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to send message." });
  }
});

// Start the server
app.listen(3001, () => console.log("Server is running on port 3001!"));
