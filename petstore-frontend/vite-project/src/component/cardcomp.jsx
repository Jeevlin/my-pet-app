
import React, { useEffect } from "react";
import "./cardcomp.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCopy,faCheckCircle,faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { ThirdModal } from "../modal/modal";



function Cardcomp({onClick,name,photoURLs,id}){
   
const [copied,setCopied]= useState()
const [showThirdModal, setShowThirdModal] = useState(false);
const [imageUrl, setImageUrl] = useState('');
const [orderDetails, setOrderDetails] = useState({
  orderId: '',
  petId: '',
  quantity: '',
  shippingDate: ''
});
const generateAlphanumericId = () => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}; 




const handlePlaceOrder = () => {
  
const orderId = generateAlphanumericId();// Generate unique order ID
console.log(orderId); 
const petId = {id};
const quantity ={Number}; 
const shippingDate = new Date().toLocaleDateString(); 

  // Update order details
  setOrderDetails({
    orderId,
    petId,
    quantity,
    shippingDate
  });
  setShowThirdModal(true);

}
const handleThirdModalClose = () => setShowThirdModal(false);




useEffect(() => {
  if (photoURLs && photoURLs.data) {
    // Assuming photoURLs.data is an ArrayBuffer or Uint8Array
    const base64String = btoa(
      new Uint8Array(photoURLs.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    setImageUrl(`data:image/png;base64,${base64String}`);
  }
}, [photoURLs]);


const handleCopy =()=>{
   navigator.clipboard.writeText(id);
   setCopied(true)
   setTimeout(() => setCopied(false), 10000);
}



return(
   
<div className="cardcomp" onClick={onClick}>
          <div className="flexdiv" >
     {imageUrl ?( <img  className="catimage" src={imageUrl}alt={name} ></img>):(<p>no image available</p>)}
         </div>
     <div style={{textAlign:"center"}}>
        <h3>{name}</h3>    
        <span>{id} 
        <FontAwesomeIcon icon={faCopy}  style={{ cursor: 'pointer', marginLeft: '8px', color: 'gray' }}
        onClick={(e)=>{
        e.stopPropagation();
        handleCopy()
        }}/>
        </span> {copied}
<br></br>
   
    <button className="orderbtn mb-1"><FontAwesomeIcon icon={faCheckCircle}  />Available</button><br></br>
    <button className="orderbtn" onClick={()=>handlePlaceOrder()}><FontAwesomeIcon icon={faShoppingCart}  />place order</button>
    <ThirdModal show={showThirdModal} handleClose={handleThirdModalClose} orderDetails={orderDetails}/>
 </div>
 </div>
);
}
export default Cardcomp;