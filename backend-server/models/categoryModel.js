const  mongoose  = require("mongoose");
const Schema = mongoose.Schema

const categorySchema = new Schema({

    category:{
        type:String,
        required:true,
    },

})
const CategorySchema = mongoose.model("category",categorySchema)
module.exports = CategorySchema