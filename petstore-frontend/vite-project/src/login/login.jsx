import './login.css';
import image from "./pet.jpg"
import { signInWithEmailAndPassword } from "firebase/auth";
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../component/firebase'
import { toast } from "react-toastify";
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      navigate('/homepage'); 
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className='row'>
        <div className="col 1" style={{width:"500px",height:"510px"}}>
       <div className=' colbox'>
        <div style={{textAlign:"center",width:"300px",fontFamily:"serif"}}>
        
        <h1 style={{fontSize:"50px"}}> Hi there !</h1>
        
        <p style={{fontSize:"10px"}}>
          Welcome to Raaz Pet Store
        </p>
       
       <input style={{borderRadius:"5px",padding:"3px",width:"300px"}}
        className='mb-3'
        type='text'placeholder='username'  
        onChange={(e) => setEmail(e.target.value)} >
        </input><br></br>
        
        <input style={{borderRadius:"5px",padding:"3px",width:"300px"}} 
        type="password" placeholder='password' 
        onChange={(e) => setPassword(e.target.value)}>
        </input>
        <a href="" className='forgotpwd'>Forgot password ?</a><br></br>
        <button className='comnbtn mt-1 ' type='submit'>Log in</button>
        <p className="click mt-3">click here to 
        <Link to ="/register"
        style={{textDecoration:"none",fontWeight:"bold",color: "darkorange"}}> Register New User</Link> </p>
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


        <div style={{display:"flex",justifyContent:"flex-end"}}>
        <button style={{borderRadius:"20px",marginRight:"10px"}}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg></button>
        <button style={{borderRadius:"20px"}}> <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="30"  fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg>
</button>

        </div>
       

    </div>
    
  );
}

export default Login;
