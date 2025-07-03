import './register.css'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { auth, db } from '../component/firebase';
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify"




function Register() {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [fname, setFname] = useState(" ");
  const [lname, setLname] = useState(" ");
  const[ username,setUsername]=useState(" ")
  const[ number, setNumber]= useState(" ")

  
const handleRegister = async (e) => {
  e.preventDefault();
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
   
    if (user) {
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        username:username,
        PhoneNumber:number,
        approved: false,
        createdAt: new Date().toISOString() ,// Current timestamp
        password:password
      });
    }
    
    console.log("User Registered Successfully!!");
    toast.success("User Registered Successfully!!", {
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
   
    <div className="register">
        <h1 className='mb-5' style={{font:"-moz-initial",fontWeight:"800",textAlign:"center"}}>Register New User</h1>
         <form onSubmit= {handleRegister}>
        <div className="container" style ={{display:"flex", flexDirection:"row",paddingTop:"30px",paddingLeft:"180px"}}>
          
            <div className="col-6" >
                <div>
                  
                  <input
                   type="text"
                   placeholder="First Name"
                   style={{borderRadius:"5px",padding:"3px" ,width:"300px "}}
                   className='mt-3 form-control'
                   onChange={(e) => setFname(e.target.value)} required>
                    
                    </input><br></br>
                  <input type="text"
                  placeholder="User Name"
                  style={{borderRadius:"5px",padding:"3px" ,width:"300px "}}
                  className='mt-3 form-control ' 
                  onChange={(e) => setUsername(e.target.value)}required></input><br></br>
                  <input type="number"
                  placeholder="Phone Number"
                  style={{borderRadius:"5px",padding:"3px" ,width:"300px "}}
                  className='mt-3 form-control'
                   onChange={(e) => setNumber(e.target.value)} required>
                   </input>
                  
                </div>
              </div>
            
              <div className="col-6">
                 <div>
               
                  <input type="text"
                  placeholder="Last Name"
                  style={{borderRadius:"5px",padding:"3px" ,width:"300px "}}
                  className='mt-3 form-control'
                   onChange={(e) => setLname(e.target.value)}required >
                    </input><br></br>
                  <input type="text"
                  placeholder="Email Address"
                  style={{borderRadius:"5px",padding:"3px" ,width:"300px "}}
                   className='mt-3 form-control' onChange={(e) => setEmail(e.target.value)}required >
                    </input><br></br>
                  <input type="password"
                  placeholder="Password"
                  style={{borderRadius:"5px",padding:"3px" ,width:"300px "}}
                  className='mt-3 form-control' 
                  onChange={(e) => setPassword(e.target.value)}required>
              
                  </input>
                  
                </div>
              </div> 
        </div>
      <div className='mt-5' style={{ display:'flex',justifyContent:"center",}}>
     
        <button type='submit'
        style={{fontWeight:"600",backgroundColor :"darkorange",width:"400px",height:"35px",borderRadius:"10px",color:"black"}} >
        Create User</button>
     
      </div>
      </form>
        

      
    </div>
  );
}

export default Register;