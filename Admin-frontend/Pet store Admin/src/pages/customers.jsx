import React from "react";
import './customers.css'
import { useState,useEffect } from "react";
import { db } from "../components/firebase";
import { collection, query,where,onSnapshot, getDocs, orderBy,doc,updateDoc } from "firebase/firestore";

function Customers(){
  const [users, setUsers] = useState([]); // Stores the list of users
  const [currentIndex, setCurrentIndex] = useState(0); // Index of the currently displayed user

 

  // Real-time listener for user updates
  useEffect(() => {
    const usersRef = collection(db, "Users");
    const userQuery = query(usersRef, where("approved", "==", false));

    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      const updatedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(updatedUsers);

      // Adjust the current index if necessary
      setCurrentIndex((prevIndex) =>
        updatedUsers.length > 0 ? Math.min(prevIndex, updatedUsers.length - 1) : 0
      );
    });

    return () => unsubscribe();
  }, []);

  
  // Approve the current user
  const handleApprove = async () => {
    try {
      const currentUser = users[currentIndex];
      if (!currentUser) return;

      const userRef = doc(db, "Users", currentUser.id);
      await updateDoc(userRef, { approved: true });

      
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  //move to  next user 
  const handleNext=()=>{
    setCurrentIndex((prevIndex)=>{
      const nextIndex= prevIndex+1;
      return nextIndex>=users.length? 0:nextIndex;
    })
 
  }

  // Display message if no users are left
  if (users.length === 0) {
    return <h1>No new users to display.</h1>;
  }

  // Current user details
  const currentUser = users[currentIndex];

    return(
        <div className="customers" style={{color:" rgb(22, 12, 112)"}}>
            <div className="title">
            <h3>Register New Customers</h3>
            </div>
            <div className="line" >
                <div className="number" > 
                  <div style={{marginTop:"12px",
                    fontWeight:"bold",
                    fontSize:"20px"}}>{currentIndex+1}</div></div>
                <div className="row" style={{marginRight:"200px"}}>
                    <div className="col-1"style={{marginRight:"300px"}}>
                            <ul className="list"> 
                            <ul className='mb-4'>  Username:</ul>
                            <ul className='mb-4'> FirstName:</ul>
                            <ul className='mb-4'> LastName:</ul>
                            <ul className='mb-4'> Email:</ul>
                            <ul className='mb-4'> mobile no:</ul>
                            <ul className='mb-4'>  Password:</ul>
                        </ul></div>
                        <div className="col-1"style={{marginRight:"200px"}}>
               <input className="input mb-3" type="text"value={currentUser.username}></input>
               <input className="input mb-3" type="text" value={currentUser.firstName}></input>
               <input className="input mb-3" type="text" value={currentUser.lastName}></input>
               <input className="input mb-3" type="text" value={currentUser.email}></input>
               <input className="input mb-3" type="text" value={currentUser.PhoneNumber}></input>
               <input className="input mb-2" type="text" value={currentUser.password}></input>
                        </div>
               
            
                </div>
              
                <button className=" outline" style={{backgroundColor:"white",height:"50px",color:"darkblue",fontWeight:"600"}}onClick={handleNext} >Add Another User
                </button>
                <button className="button" onClick={handleApprove}>Create Users</button>

            </div>
        </div>


    );
}

export default Customers