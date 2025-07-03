const OrderSchema = require('../models/OrderModel')

const addOrder= async (req,res)=>{
    try{
        const orderData = req.body;

        // Attach the logged-in user's UID to the order
        orderData.userId = req.user.uid;
        console.log("Decoded user data: ", req.user);
       const newOrder= new OrderSchema(orderData)
       const OrderData = await newOrder.save()
       res.status(200).json({
        success:true,
        message:OrderData
    });
    }catch(error){
        res.status(500).json({ error: error.message });

    }
}
const findOrder = async (req, res) => {
    try {
        
        const userId = req.user.uid; 
        const {orderId}= req.params
        console.log('User ID:', userId);
        console.log('Order ID:', orderId);
    
      const order= await OrderSchema.findOne({orderId:orderId,userId:userId});
      
      if (!order) {
        return res.status(404).send('order not found');
      }
      res.json(order);
    } catch (error) {
      res.status(500).send('Error finding order');
    }
  }

  

  const deleteOrder = async(req,res)=>{
    try{
        const {orderId} = req.params
        console.log("Order ID received in backend:", orderId);

        const deletedOrder = await OrderSchema.findOneAndDelete({orderId : orderId})

        res.status(200).json({
            success : true,
            data : deletedOrder
        }) 


    }catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })

    }
}

const getOrder= async(req,res)=>{
  try{
      const orders = await OrderSchema.find()
      const order = orders.map(order=>{
          return order

      })
      res.status(200).json({
          success:true,
          data:order
      })
      
  }catch(error){
      res.status(500).json({
          success:false,
          message:error.message
      })
  

  }
}

module.exports={addOrder,findOrder,deleteOrder,getOrder}

