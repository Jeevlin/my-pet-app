const  mongoose  = require("mongoose");
const Schema = mongoose.Schema


const orderSchema = new Schema({
    userId: { 
        type: String, // Storing Firebase UID as a string
        required: true 
    },
    orderId:{
        type:String,
        required:true,
    },
    petId:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    shippingDate:{
        type:String,
        required:true,
    }, 
    orderStatus: { 
        type: String,
        enum: ["Pending", "Processing", "Completed", "Cancelled"], 
        default: 'Pending' 
    },  
    createdAt: {
         type: Date, 
        default: Date.now },



    
})

const OrderSchema = mongoose.model('order',orderSchema)
module.exports =OrderSchema
