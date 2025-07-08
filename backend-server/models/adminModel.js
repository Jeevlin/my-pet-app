const  mongoose  = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken');
require('dotenv').config()

const adminSchema = new Schema({

    email:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
   

})


adminSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next();
      }
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password= hashedPassword
        next()
    }catch(err){
        console.error(err.message)
        next(err); 
    }
    
} )

adminSchema.methods.genAuthToken= async function () {
    try{
        const token = jwt.sign(
            {_id:this._id.toString()} ,
             process.env.JWT_SECRET ,
             {expiresIn:"1y"} )
        return token
    }catch(err){
        console.error(err.message)
        throw new Error("Error generating token"); 

    }
    
}


const AdminSchema = mongoose.model("admin",adminSchema)
module.exports = AdminSchema