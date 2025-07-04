const  mongoose  = require("mongoose");
const Schema = mongoose.Schema


const userSchema = new Schema({
    username:{ 
        type: String,
        required: true,
      },   
    firstname:{
        type:String,
        required:true,

      }   ,         
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobileno:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
})

const UserSchema = mongoose.model('user',userSchema)
module.exports =UserSchema
