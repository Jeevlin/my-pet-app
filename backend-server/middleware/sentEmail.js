const AdminSchema = require('../models/adminModel');
const jwt  = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const sendEmail = async (to, subject, text) => {
  try {
    const admin = await AdminSchema.findOne({ email:to });
    if (!admin) throw new Error('User not found');

    // Generate a JWT token with email and expiry (1 hour)
    const resetToken = jwt.sign(
      { email: admin.email }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Expiry time
    );

    // Create a reset link with the token
    const resetLink = `http://localhost:5174/`
    // Configure the transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Example: Gmail SMTP server
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail password or App Password
      },
    });

    // Email options
    const mailOptions = {
      from: '"petStore" <skillstation.jeevlin@gmail.com>', // Sender address
      to, // Recipient email
      subject: 'Password Reset Request', // Subject line
      text: `You requested a password reset. Use the following link to reset your password: ${resetLink}`, // Plain text body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = sendEmail;