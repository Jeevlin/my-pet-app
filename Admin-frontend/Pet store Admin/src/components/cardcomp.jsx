
import React, { useEffect } from "react";
import "./cardcomp.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCopy,faCheckCircle,faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";


function Cardcomp({onClick,name,photoURLs,id,onQuickEdit,status}){
   
const [copied,setCopied]= useState()
const [imageUrl, setImageUrl] = useState('');

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
        <span>{id} <FontAwesomeIcon icon={faCopy} 
         onClick={(e)=>{
         e.stopPropagation();
         handleCopy()
         }}
       style={{ cursor: 'pointer', marginLeft: '8px', color: 'gray' }}/>
        </span> {copied}
<br></br>
   
    <button className="orderbtn mb-1" 
        onClick={(e) => {
            e.stopPropagation(); // Prevents triggering onClick for card
            onQuickEdit(); // Call the Quick Edit handler
            }}>
    <FontAwesomeIcon icon={faCheckCircle} />{status}</button><br></br>
    <button className="orderbtn"><FontAwesomeIcon icon={faShoppingCart}  />place order</button>
 </div>
 </div>
);
}
export default Cardcomp;