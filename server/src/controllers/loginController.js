// src/controllers/authController.js
const loginModel = require("../model/loginModel.js");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send random password to email and save hashed password in DB
const sendPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if the user exists
  let user = await loginModel.findOne({ email });

  // Generate a random password
  const randomPassword = crypto.randomBytes(8).toString("hex");
  const hashedPassword = await bcrypt.hash(randomPassword, 10);

  console.log("Generated Random Password:", randomPassword); // Add logging for debugging

  if (!user) {
    // If user doesn't exist, create a new user with a temporary password
    user = new loginModel({
      email,
      password: hashedPassword, // Set the hashed password for the new user
    });

    // Save the new user to the database
    await user.save();

    // Send the email with the new password
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your New Password",
      text: `Here is your new password: ${randomPassword}\nPlease log in and change it immediately.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent:", info.response);
      res.json({ message: "Password sent to your email successfully" });
    });
  } else {
    // If the user already exists, update the password and send an email
    user.password = hashedPassword;
 
    // Save the updated password to the database
    await user.save();

    // Send the email with the new password
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your New Password",
      text: `Here is your new password: ${randomPassword}\nPlease log in and change it immediately.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent:", info.response);
      res.json({ message: "Password sent to your email successfully" });
    });
  } 
});

// Verify the password provided by the user
const verifyPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await loginModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  console.log("Provided Password:", password); // Log the provided password
  console.log("Stored Hashed Password:", user.password); // Log the stored hashed password

  // Compare the provided password with the hashed password in the database
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  } 

  res.json({
    message: "Password verified successfully",
    user: {
      email: user.email,
      _id: user._id,
    },
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.query.id; // Get userId from the query parameter
  
  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }
 
  const user = await loginModel.findById(userId).select("-password"); // Exclude password from the response

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


module.exports = { sendPassword, verifyPassword, getUserProfile };
