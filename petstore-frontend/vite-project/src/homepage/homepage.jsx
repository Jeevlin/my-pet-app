import Cardcomp from "../component/cardcomp";
import "./homepage.css";
import image from "../login/pet.jpg"
import {FirstModal,SecondModal,Logout} from "../modal/modal";
import React, { useEffect, useState } from "react";
import { auth, db } from "../component/firebase";
import { doc, getDoc ,updateDoc} from "firebase/firestore";
import { getPets } from "../db/db";
import { getCategory } from "../db/db";
import { FindPet } from "../db/db";
import { FindOrder } from "../db/db";
import { toast, ToastContainer } from "react-toastify";


function Homepage(){
  const [showFirstModal, setShowFirstModal] = useState(false); //Modal visiblity
  const [showSecondModal, setShowSecondModal] = useState(false); //Modal visiblity
  const [showLogout, setShowLogout] = useState(false); //Modal visiblity
  
  

  const handleFirstModalClose = () => setShowFirstModal(false);
  const handleFirstModalshow = () => setShowFirstModal(true);

  const handleSecondModalClose = () => setShowSecondModal(false);
  const handleSecondModalshow = () => setShowSecondModal(true);

  const handleLogoutClose = () => setShowLogout(false);
  const handleLogoutshow = () => setShowLogout(true);
 
  const [userdata,setUserdata]= useState(null)//user info
  const [pets, setPets] = useState([]); // Tracks all pets
  const [category,setCategory]=useState('')
  const [selectedCategory, setSelectedCategory] = useState('All'); // Tracks the selected category
  const [filteredPets, setFilteredPets] = useState([]); // Tracks the selected category pets
  const [petID, setPetID] = useState("");
  const[orderID,setOrderID]= useState('')
  const [error, setError] = useState("");
  const[ categoryIndex,setCategoryIndex] =useState(null)

  const [orderDetails, setOrderDetails] = useState({
    userId:"",
    orderId: '',
    petId: '',
    quantity: '',
    shippingDate: '',
    orderStatus: '',
});

  
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserdata(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });//fetches userdata
  };
  useEffect(() => {
    fetchUserData();
  }, []);


// Filter pets whenever the selected category changes
useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPets(pets); // Show all pets
    } else {
      const filtered = pets.filter((pet) => pet.category === selectedCategory);
      setFilteredPets(filtered);
    }
  }, [selectedCategory, pets]);



useEffect(() => {
    const getPet = async () => {
        try {
            const data = await getPets();
            setPets(data.data);
            console.log(data)
        } catch (err) {
            setError("failed to fetch");
        } 
    };

    getPet();
}, []);



useEffect(() => {

    const getCat = async () => {
        try {
            const data = await getCategory();
            setCategory(data.data);
        } catch (err) {
            console.error("failed to fetch");
        } 
    };
  
    getCat();
  
  }, []);



const handleFindPet = async () => {
    try {
     
        const data = await FindPet(petID); // Call the API with the entered pet ID
        console.log(data)
        if (data) {
            setFilteredPets([data]); // Display only the found pet
            setError(""); // Clear any previous errors
            setPetID("")
        } else {
            setFilteredPets([]); // Clear the display if no pet is found
            setError("No pet found with the given ID");
        }
    } catch (error) {
        console.error("Failed to find pet", error);
        setError("An error occurred while fetching the pet");
    }
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
       handleFirstModalshow()// Open modal
        setError(""); // Clear any previous error messages
        setOrderID("")
      } else {
        setOrderDetails(null); // Clear previous data
        setError("No order found with the given Order ID.");
        toast.error("Order Not Found", { position: "top-center" }); 
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError("An error occurred while fetching order details.");
      toast.error("Error fetching order details.", { position: "top-center" });
    }
  };



    return(
        <div className="homepage">
           
                
            
            <div className="header">
                <h1 className="dashboard">Raaz Pet Store</h1>
                <button className="logout"  onClick={()=> handleLogoutshow()}>Log out</button>
                <Logout show={showLogout} handleClose={handleLogoutClose} />
              
            </div> 
            <div className="main">
                <div className="container " >
                    <div className="outline mt-5 mb-5"style={{height:"400px",width:"100%"}} >
                        <div style={{display:"flex",justifyContent:"space-between"}} >
                        <h5 style={{color:"rgb(7, 21, 61)",fontWeight:"600"}}>User Information</h5>
                        <button className="editbtn" onClick={()=> handleSecondModalshow()}>Edit info</button>
                        <SecondModal show={showSecondModal} handleClose={handleSecondModalClose}setUserdata={setUserdata} />
                 
                        </div>
                    <div className="row"> 
                        <div className="col-2">
                             <img  className="imghome" src={image} ></img>
                        </div> 
                        {userdata ?(

                        
                        <div  className="col-10">
                            
                        <ul className="list"> 
                            <ul className='mb-4'>👤  Username:{userdata.username}</ul>
                            <ul className='mb-4'>🪪  Name:{userdata.firstName}</ul>
                            <ul className='mb-4'>✉️  Email:{userdata.email}</ul>
                            <ul className='mb-4'>☎️  mobile no:{userdata.PhoneNumber}</ul>
                            <ul className='mb-4'>🔒  Password:{userdata.Password}</ul>
                        </ul>
                        </div>
                        ):(
                            <p>loading..</p>   
                        )}                        
                    
                    </div>
                     
                    </div>
                </div>
                
                <div className="container">
                    <div className="outline mt-5" style={{backgroundColor:"rgb(7, 21, 61)"}} > 
                       
                        <h3 style={{color:"white"}}>Find Your Pet Order Status</h3>
                            <div className="header">
                            <input style={{width:"450px", height:"40px", borderRadius:"8px"}} type="text" 
                             placeholder="Enter your order id"
                             value={orderID}
                             onChange={(e) => setOrderID(e.target.value)}></input>
                            <button className="findbtn" onClick= {handleFindOrder}>Find status</button>
                            <FirstModal show={showFirstModal} handleClose={handleFirstModalClose} orderDetails={orderDetails}/>
      
                            
                        </div>
                    </div>
                </div>
                <div className="container"> 
                <div className="container" style={{display:"grid"}}>
                    <div className="row"> 
                    <h1 className="col-9 mt-5 ms-4" style={{display:"grid",justifyContent:"center",fontSize:"40px",fontWeight:"700"}}>Pets in store</h1>
                    <select className="col-1 mt-5 ms-5" style={{display:"grid",justifyContent:"end",width:"200px",height:"40px",borderRadius:"70px"}}>
                        <option>Available</option>
                        </select></div>
                   
                </div>
                    <div className="outline mt-5"  >
                   
                        <button className="filterbtn ms-2" style={{
                backgroundColor: categoryIndex === null ? "navy" : "white",
                color: categoryIndex === null ? "white" : "navy",
            }} onClick={() => 
            {setSelectedCategory('All') , setCategoryIndex(null);}}>All</button>
                
              {category.length>0? (category.map((category,index)=>(
                    
                    <button className="filterbtn ms-2" key={index}
                    style={{
                        backgroundColor: categoryIndex === index ? "navy" : "white",
                        color: categoryIndex === index ? "white" : "navy",
                    }}
                    onClick={() => {setSelectedCategory(category.category),setCategoryIndex(index)}}>{category.category}</button>

                ))
            ):(
                <div></div>
            )}
                        
                            <div className="inline mt-5" >
                                <div className="row" >
                                
                                {filteredPets.length > 0 ? (
                filteredPets.map((pet,index) => (
                    <div className="col-4" style={{ marginBottom: "25px", marginTop: "25px" }} key={index}>
                        <Cardcomp

                            name={pet.name}
                            id={pet.id}
                            photoURLs={pet.photoURLs ? pet.photoURLs : 'https://via.placeholder.com/250'}
                        
                        />
                    </div>
                ))
            ) : (
                <div>No pets available for this category</div>
            )}
            </div>
                    </div>
                </div>
                </div>

            
                
        
                <div className="container"> 
                    <div className="outline mt-5" style={{backgroundColor:"rgb(7, 21, 61)"}} > 
                        <div className="orderstatus" >
                        <h3 style={{color:"white"}}>Enter Pet ID</h3>
                            <div className="header">
                                <input style={{width:"450px", height:"40px", borderRadius:"8px"}} 
                                type="text" placeholder="Enter Pet id to search"
                                value={petID}
                                onChange={(e) => setPetID(e.target.value)}></input>
                                <button className="findbtn"onClick={handleFindPet}>Find Pet</button>
                              
                            </div>
                            
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    
                        </div>
                    </div>
                </div>
            </div>
    </div>

    )
}

export default Homepage;