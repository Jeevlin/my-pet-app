import image from '../assets/pet.jpg'
import { useState } from 'react';
import { sendCredentials } from '../../api.js/petApi';
import { useNavigate } from 'react-router-dom';


function Forgot(){

      const [email, setEmail] = useState(""); // State to hold email
      const navigate = useNavigate(); // Initialize useNavigate

      const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            const response = await sendCredentials(email);
            console.log(response); // Check if the API indicates success
            if (response?.message === "Credentials sent to the provided email") { // Assuming your API returns a 'success' field
                  navigate('/message'); // Navigate to the '/message' route
                } else {
                  console.error('Failed to send credentials:', response.message);
                }
        } catch (error) {
          console.error("Error sending credentials:", error);
        }
      };
    return(
        <div className="forgot"> 
        <form onSubmit={handleSubmit}>
        <div className='row'>
        <div className="col 1" style={{width:"500px",height:"510px"}}>
       <div className=' colbox'>
        <div style={{textAlign:"center",width:"300px",fontFamily:"serif"}}>
        
        <h1 style={{fontSize:"25px",fontWeight:"bold" ,marginTop:"100px",color:"navy"}}> Enter Your Email Address</h1>
      
       
       <input style={{borderRadius:"5px",padding:"3px",width:"300px",marginTop:"80px"}}
        className='form-control'
        type='text'placeholder='username'  
        onChange={(e) => setEmail(e.target.value)} >
        </input><br></br>
        
     
        
        <button className='comnbtn form-control' style={{background:"darkblue",color:"white"}} type='submit'>Send Credentials</button>
     
        </div>
        </div>  
        </div>
  
        <div className="col 2">
              <div style={{display:'flex',justifyContent:"center"}}>
                    <img src={image} style={{width:"360px",height:"500px"}} ></img>
              </div>
        </div>
        </div>
        </form>     
         </div>

    );
}
export default Forgot;