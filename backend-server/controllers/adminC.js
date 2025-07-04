const AdminSchema =require('../models/adminModel')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const sendEmail = require('../middleware/sentEmail');


const addAdmin= async (req,res)=>{
    try{
      console.log(req.body)
       const newAdmin = new AdminSchema(req.body)
       const adminData = await newAdmin.save()
       const token = await adminData.genAuthToken();
       res.status(200).json({
        success:true,token,
        message:adminData
    });
    }catch(error){
        res.status(500).json({ error: error.message });

    }
}


const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Incoming login:", email, password); // ✅

  try {
    const admin = await AdminSchema.findOne({ email });
    console.log("Admin found:", admin); // ✅

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = bcrypt.compareSync(password, admin.password);
    console.log("Password match:", isMatch); // ✅

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const accessToken = await admin.genAuthToken();
    console.log("Token generated"); // ✅

    return res.status(200).json({
      message: 'Login successful',
      token: accessToken
    });
  } catch (error) {
    console.error("Login error:", error); // ✅ important
    res.status(500).json({ message: 'Error logging in', error });
  }
};

const sendCredentials= async (req,res)=>{
const { email } = req.body;

  try {
    // Check if the email belongs to an admin
    const admin = await AdminSchema.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: 'Email is not registered as an admin' });
    }

    // Send the saved password (NOT recommended; see notes below)
    const subject = 'Your Admin Credentials';
    const message = `Your password is: ${admin.password}`; // Only for demonstration. Avoid this in production!

    await sendEmail(email, subject, message);

    res.status(200).json({ message: 'Credentials sent to the provided email' });
  } catch (error) {
    console.error('Error sending credentials:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports={addAdmin,login,sendCredentials}