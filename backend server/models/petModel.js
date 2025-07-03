const  mongoose  = require("mongoose");
const Schema = mongoose.Schema


const petSchema = new Schema({
    name:{ 
        type: String,
        required: true,
      },   
      id:{
        type:String,
        required:true,

      }   ,         
    category:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    photoURLs:{ 
      type:Buffer,

    }
  
})

const PetSchema = mongoose.model('Pet',petSchema)
module.exports =PetSchema
