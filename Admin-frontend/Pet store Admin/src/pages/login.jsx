import React from "react";
import image from '../assets/pet.jpg'
import { useState } from "react";
import {Navigate, useNavigate,Link} from 'react-router-dom'
import { toast } from "react-toastify";
import { login } from "../../api.js/petApi";


function Login(props){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); 
  const handleLogin= async (e) => {
    e.preventDefault();
    try {
      const { token, message } = await login(email, password);
      localStorage.setItem("authToken", token); // Save token to localStorage
      console.log("Token saved in localStorage:",token );
      setSuccess(message); // Display success message
      setError(""); // Clear error
      console.log("Calling onLogin function...");
      props.onLogin();
      navigate("/navbar")

      
    } catch (err) {
      setError(err.message); // Display error message
      setSuccess(""); // Clear success message
    }
  };
  

return(
    <div className="login">
    {error && <p style={{ color: "red" }}>{error}</p>}
    {success && <p style={{ color: "green" }}>{success}</p>}
    <form  onSubmit={handleLogin}>
      <div className='row'>
      <div className="col 1" style={{width:"500px",height:"510px"}}>
     <div className=' colbox'>
      <div style={{textAlign:"center",width:"300px",fontFamily:"serif"}}>
      
      <h1 style={{fontSize:"25px",fontWeight:"bold" ,marginTop:"100px",color:"navy"}}> Pet Store Admin Login</h1>
    
     
     <input style={{borderRadius:"5px",padding:"3px",width:"300px",marginTop:"80px"}}
      className='form-control'
      type='text'placeholder='username' value={email} 
      onChange={(e) => setEmail(e.target.value)} >
      </input><br></br>
      
      <input style={{borderRadius:"5px",padding:"3px",width:"300px"}} 
      className='form-control'
      type="password" placeholder='password'  value={password}
      onChange={(e) => setPassword(e.target.value)}>
      </input>
      <div style={{display:"flex",justifyContent:"end"}}><Link to="/forgot" className=' mb-3 forgotpwd'>Forgot password ?</Link><br></br></div>
      <button className='comnbtn form-control' 
      style={{background:"darkblue",color:"white"}} type='submit'>Log in</button>
   
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
export default Login

