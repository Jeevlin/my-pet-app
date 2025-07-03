const UserSchema =require('../models/userModel')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const addUser= async (req,res)=>{
    try{
       const newUser = new UserSchema(req.body)
       const UserData = await newUser.save()
       res.status(200).json({
        success:true,
        message:UserData
    });
    }catch(error){
        res.status(500).json({ error: error.message });

    }
}

module.exports={addUser}