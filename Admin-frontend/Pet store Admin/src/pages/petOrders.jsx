import React, { useEffect, useState } from 'react'
import './petOrders.css'
import { FindOrder } from '../../api.js/petApi'
import { getOrder } from '../../api.js/petApi'
import { deleteOrder } from '../../api.js/petApi'


const PetOrders = () => {

  const [orderID,setOrderID]=useState("")
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null); // Tracks the selected order by index
  const [orderDetails, setOrderDetails]= useState({
    orderId: '',
    petId: '',
    quantity: '',
    shippingDate: '',
    orderStatus:'',
    
  })
  const [Error,setError]=useState("")
  const[order,setOrder] =useState([])
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getOrder();
        setOrder(data.data.reverse());
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    }, 2000); // Fetch every 5 seconds
  
    return () => clearInterval(interval); // Clean up
  }, []);
  
  const handleOrderClick = (order, index) => {
    setOrderDetails(order); // Set details of the clicked order
    setSelectedOrderIndex(index); // Highlight the selected order
    setOrderID(order.orderId)
  };

  

  const handleFindOrder = async () => {
    if (!orderID) {
      setError("Please enter a valid Order ID.");
      return;
    }

    try {
      
      const response = await FindOrder(orderID); // Fetch order details
      
      if (response) {
        setOrderDetails(response); // Save fetched data to state
  
        setError(""); // Clear any previous error messages
      } else {
        setOrderDetails(null); // Clear previous data
        setError("No order found with the given Order ID.");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError("An error occurred while fetching order details.");
    }
  };

  const handleDelete = async () => {
    console.log("Current orderID:", orderID);
    if (!orderID) {
      console.error("No order ID to delete");
     
      return;
    }
  
    try {
      const result = await deleteOrder(orderID); // Pass the pet ID to deletePet
      console.log("order deleted successfully:", result);
      setOrderDetails("")
    } catch (error) {
      console.error("Failed to delete order:", error);
      
    }
  };
  return (
 
    <div className='container'> 
    <div className='petOrders'>

           <div className='title'> 
            <h3 >Manage Pet Orders</h3>
            </div>


        <div className="outline " >
            <h3 style={{ display:"flex",color: "white",marginLeft:"20px" ,fontWeight:"bold",fontSize:"20px"}}>Find Your Pet Order Status</h3>
            <div className="header">
              <input style={{ width: "450px", height: "40px", borderRadius: "8px" }} type="text"
               placeholder="Enter your order id" value={orderID}
               onChange={(e) => setOrderID(e.target.value)}></input>
              <button className="findbtn" onClick={handleFindOrder}>Find status</button>
          </div>
        </div>
   
    <div className='row' >
    <div className='order mt-5'style={{marginRight:"50px",width:"580px"}}>
      <h2 className='mt-4'style={{color:"darkorange",fontWeight:"bold",fontSize:"20px"}}>Pet Order Summary</h2>
      <div className='summary'>
        
      <p style={{marginBottom:"30px"}}>Pet ID :{orderDetails.petId}</p>
      <p style={{marginBottom:"30px"}}>Quantity : {orderDetails.quantity}</p>
      <p style={{marginBottom:"30px"}}>Shipdate: {orderDetails.shippingDate}</p>
      <p style={{marginBottom:"30px"}}>Status: {orderDetails.orderStatus}</p>
      <p style={{marginBottom:"30px"}}>Complete: {orderDetails.shippingDate}</p>
      
      <div  >
        <button className='findbtn' 
        style={{borderColor:"rgb(7, 21, 61)",borderRadius:"40px",position:'absolute',top:"190px",left:"300px"}} onClick={handleDelete}>Delete order</button></div>
      
      </div>
      {Error && <p style={{ color: "red" }}>{Error}</p>}
                    

     </div>
    <div className='order mt-5'style={{height:"500px",width:"430px"}}>
    <h2>Recent Orders</h2>  
    
    {order.length>0? (order.map((order,index)=>(
    <div className="outline " key={index}
    style={{height:"60px",color:selectedOrderIndex === index ? "white" : "navy",
    backgroundColor:selectedOrderIndex === index ? "navy" : "white", display:"flex",
    flexDirection:"column",justifyContent:"space-around",alignItems:"center"}}>
    
    <div key ={index} >
      <div>
      <span style={{marginRight:"25px"}}>{order.orderId}</span>
      <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
      </div>
      <div><span style={{marginRight:"25px"}}>{new Date(order.createdAt).toLocaleDateString()}</span>
      <span style={{cursor:"pointer" ,textDecoration:"underline"}} onClick={() => handleOrderClick(order, index)}>view details</span></div>
      </div>
      </div>
    ))
  ):(
    <div>
      </div>
  )
  }
    
    </div>
 </div>
 </div>
 </div>
  )
}

export default PetOrders
