import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from "react";
import { auth, db } from "../component/firebase";
import { doc, getDoc ,updateDoc} from "firebase/firestore";
import { useAuthContext } from '../context/auth/AuthContext';
import { toast, ToastContainer } from "react-toastify";
import { addOrder} from '../db/db';
import {deleteOrder} from '../db/db';
import { updatePassword } from "firebase/auth";

export function FirstModal({show,handleClose,orderDetails}){

  const [orderId,setOrderId]=useState('')
 

  useEffect(() => {
    if (orderDetails?.orderId) {
      setOrderId(orderDetails.orderId);
      console.log("Order ID set in state:", orderDetails.orderId);
    }
  }, [orderDetails]);//for maintaining the orderId details


 
  const handleDelete = async () => {
    console.log("Order ID before deletion:", orderId)
    if (!orderId) {
      console.error("No order ID to delete");
      return;
    }
  
    try {
      const result = await deleteOrder(orderId); 
      console.log("order deleted successfully:", result);
      handleClose(); // Close the modal after deletion
      toast.success("Deleted Order Successfully", { position: "top-center" });
    } catch (error) {
      console.error("Failed to delete pet:", error);
      
    }
  };

 return(
    <Modal className="modal-lg" show={show} onHide={handleClose}>
        <Modal.Header className="title" closeButton>
          <Modal.Title >order status</Modal.Title>
        </Modal.Header>
        <Modal.Body >
       
             <><div className="fw-bold fs-5">Order Summary</div><div className="row mt-5">
           <div style={{ display: "flex", justifyContent: "center" }}>
             <div className="col-6">

               <label className="label me-5">OrderId:</label>

               <br></br>
               <label className="label me-5">Pet Id:</label>

               <br></br>
               <label className="label me-5">Quantity:</label>

               <br></br>
               <label className="label me-5">shipping date:</label>

               <br></br>
               <label className="label me-5">status:</label>

               <br></br>

             </div>
             <div className="col-6">
             {orderDetails ? (
               <><input className="input  mb-2" type="text" value={orderDetails.orderId || "" } readOnly />
               <input className="input  mb-2" type="text" value={orderDetails.petId || ""} readOnly  />
               <input className="input mb-2" type="text" value={orderDetails.quantity || ""} readOnly  />
               <input className="input mb-2" type="text" value={orderDetails.shippingDate} readOnly />
               <input className="input mb-2" type="text" value={orderDetails.shippingDate} readOnly /></>
             ):(
              <p></p>
             )}
               <Button className="savebtn mb-5" onClick={handleDelete}>cancel order</Button>
             </div>
           </div>


         </div></>
       


        </Modal.Body>
        </Modal>
    
)  
}


export function SecondModal({ show, handleClose,setUserdata }) {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
    const [newPassword, setNewPassword] = useState(""); // separate state for password

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Start loading

      const user = auth.currentUser; // Get the currently logged-in user
      if (user) {
        try {
          const docSnap = await getDoc(doc(db, "Users", user.uid));
          if (docSnap.exists()) {
            setUserDetails(docSnap.data()); // Set the fetched user data
          } else {
            setUserDetails(null); // No user data found, set null
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserDetails(null); // Set null in case of error
        }
      } else {
        setUserDetails(null); // User is not logged in, set null
      }
      
      setLoading(false); // Stop loading
    };

    fetchUserData();
  }, []); // Run once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading text while fetching data
  }

  const handleSaveChanges = async () => {
    if (!userDetails) {
      console.error("No user details available to update");
      return;
    }
  
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is logged in");
      return;
    }
  
    try {
      const docRef = doc(db, "Users", user.uid); // Reference to the user's document in Firestore
      await updateDoc(docRef, userDetails);// Update Firestore document with new details
      console.log("User details updated:", userDetails);
        if (newPassword.trim() !== "") {
        try {
          await updatePassword(user, newPassword);
          toast.success("Password updated successfully", { position: "top-center" });
        } catch (err) {
          if (err.code === "auth/requires-recent-login") {
            toast.error("Please log in again before updating password", { position: "top-center" });
          } else {
            toast.error(err.message, { position: "top-center" });
          }
          return; // stop here if password update failed
        }
      }
    
      const updatedDocSnap = await getDoc(docRef);  // Optionally, refresh the user details from Firestore
      if (updatedDocSnap.exists()) {
        const updatedData = updatedDocSnap.data(); // Get updated data from Firestore
        setUserDetails(updatedData); // Update state with new data
        setUserdata(updatedData); // Pass updated data to parent component
      }
  
      handleClose(); // Close the modal after saving changes
      toast.success("Information Updated",{position:"top-center"})
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };
  return (
    <Modal className="modal-lg" show={show} onHide={handleClose}>
      <Modal.Header className="title" closeButton>
        <Modal.Title>Edit User Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading...</p>
        ) : (
          userDetails && (
          <>
            <div className="fw-bold fs-5">User Details</div>
            <div className="row mt-5">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="col-6">
                  <label className="label me-5">Username:</label>
                  <br />
                  <label className="label me-5">First Name:</label>
                  <br />
                  <label className="label me-5">Last Name:</label>
                  <br />
                  <label className="label me-5">Email:</label>
                  <br />
                  <label className="label me-5">Mobile No:</label>
                  <br />
                  <label className="label me-5"> New Password:</label>
                  <br />
                </div>
                <div className="col-6">
                  <input
                    className="input mb-2"
                    type="text"
                    id="username"
                    value={userDetails.username || ''}
                    onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                  />
                  <input
                    className="input mb-2"
                    type="text"
                    id="firstName"
                    value={userDetails.firstName || ''}
                    onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                  />
                  <input
                    className="input mb-2"
                    type="text"
                    id="lastName"
                    value={userDetails.lastName || ''}
                    onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                  />
                  <input
                    className="input mb-2"
                    type="text"
                    id="email"
                    value={userDetails.email || ''}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  />
                  <input
                    className="input mb-2"
                    type="number"
                    id="PhoneNumber"
                    value={userDetails.PhoneNumber || ''}
                    onChange={(e) => setUserDetails({ ...userDetails, PhoneNumber: e.target.value })}
                  />
                  <input
                    className="input mb-2"
                    type="password"
                    id="Password"
                    placeholder='Enter a new password'
                    value={userDetails.Password|| ''}
                    onChange={(e) => setNewPassword({ ...userDetails, Password: e.target.value })}
                  />
                  <Button className="savebtn mb-5" onClick={handleSaveChanges}>Save Changes</Button>
                </div>
              </div>
            </div>
          </>
          )
        )}
      </Modal.Body>
    </Modal>
  );
}



export function ThirdModal({show,handleClose,orderDetails}){

  const { orderId, petId, shippingDate } = orderDetails;
  const [quantity,setQuantity]= useState(1)

  const [OrderData,setOrderData] =useState({ orderId,
    petId,
    quantity,
    shippingDate,
  
  })

  useEffect(() => {
    // Update OrderData when orderDetails prop changes
    setOrderData({
      orderId: orderDetails.orderId || '',
      petId: orderDetails.petId?.id || '',
      quantity,
      shippingDate: orderDetails.shippingDate || '',
     
    });
  }, [orderDetails, quantity]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
        ...OrderData,
        [name]: value,
    });
};
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await addOrder(OrderData) ;
    console.log('Response:', response); 
    toast.success("Placed Order Successfully", { position: "top-center" });
    handleClose();
} catch (error) {
    console.error('Error:', error); 
   
}
};


    return(
        <Modal className="modal-lg" show={show} onHide={handleClose}>
        <Modal.Header className="title" closeButton>
        <Modal.Title >Place order for a pet</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <div className="fw-bold fs-5">order summary</div>
                <div className="row mt-5">
                    <div style={{display:"flex",justifyContent:"center"}}>
                    <div className="col-6">
                   
                    <label className="label me-5">Order ID:</label>
    
                    <br></br>
                    <label className="label me-5">Pet ID:</label>
                  
                    <br></br>
                   <label className="label me-5">Quantity:</label>
                   
                   <br></br>
                    <label className="label me-5">shipping Date:</label>
                  
                    <br></br>
            
                   </div> 
                   <div className="col-6">
                   <input className="input  mb-2" type="text" defaultValue={orderId}></input>
                   <input className="input  mb-2"type="text" defaultValue={petId.id}></input>
                   <input className="input mb-2" type="number" value={quantity}
                   onChange={(e) => setQuantity(Number(e.target.value))}
                   step="1"
                   max="5" // Set maximum value
                   min="1"  // Set minimum value
                  
                   ></input>
                   
                   <input className="input mb-2" type="text" value={shippingDate} onChange={handleChange}></input>
 
                   <Button className="savebtn mb-5" onClick={handleSubmit} >Place order</Button>
                    </div> 
                    </div> 
           
     
                </div>
        </Modal.Body>   
        </Modal>
    )
}

export function Logout({ show, handleClose }) {
 
     const {logout}= useAuthContext();
    return (
      <Modal className="modal-lg" show={show} onHide={handleClose}>
        <Modal.Header className="title" closeButton>
          <Modal.Title>Logout User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Are you sure you want to logout?</div>
          <Button className="savebtn mb-5 mt-5 ms-5" onClick={logout}>
            Yes
          </Button>
          <Button className="savebtn mb-5 mt-5 ms-5" onClick={handleClose}>
            No
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
