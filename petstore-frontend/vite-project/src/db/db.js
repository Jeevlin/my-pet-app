import axios from 'axios';
import firebase from '../component/firebase'; 
import { auth } from '../component/firebase';
import { getAuth } from 'firebase/auth';
const api= 'https://my-pet-app-ovo1.onrender.com'
const apiUrl = 'https://my-pet-app-ovo1.onrender.com/pet'
const apiUrl1 = 'https://my-pet-app-ovo1.onrender.com/category'
const apiUrl2 ='https://my-pet-app-ovo1.onrender.com/order'

export const addPet = async(petData)=>{
    try{
        const response = await axios.post(`${apiUrl}/addPet`,petData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Setting the correct content type for file uploads
            },
        })
        return response.data
       
    }catch(error){
        console.error("error adding pet",error.response.data)
        throw error.response.data

    }
}

export const getPets = async()=>{
    try{
      const response = await axios.get(`${apiUrl}/getPets`)
      return response.data
    }catch(error){
        console.error("error fetching pets",error.response.data)
        throw error.response.data

    }
}
export const editPet = async (petId, data) => {
    if (!petId) {
        console.error('Pet ID is missing.');
        return; // Exit if petId is not available
    }

    try {
        const response = await axios.put(`${api}/pet/editPet/${petId}`, data);
        
        return response.data; // Return the updated data
    } catch(error){
        console.error("error fetching pets",error.response.data)
        throw error.response.data

    }
    
};
export const FindPet = async (petId) => {


    try {
        const response = await axios.get(`${api}/pet/findPet/${petId}`);
        
        return response.data; // Return the updated data
    } catch(error){
        console.error("error fetching pets",error.response.data)
        throw error.response.data

    }
    
};



export const addCategory= async (categoryData)=>{
    console.log(categoryData)
    try{
        const response =await axios.post(`${apiUrl1}/addCategory`,categoryData)
        return response.data
    }catch(error){
        console.error("error adding category",error.response.data)
        throw error.response.data
    }

}

export const getCategory = async()=>{
    try{
      const response = await axios.get(`${apiUrl1}/getCategory`)
      return response.data
    }catch(error){
        console.error("error fetching category",error.response.data)
        throw error.response.data

    }
}


export const addOrder= async (OrderData)=>{
    console.log(OrderData)
    const user = auth.currentUser;
    console.log(user)
    if (user) {
        const idToken = await user.getIdToken();  // Get Firebase ID Token
        console.log("ID Token: ", idToken);

    try{
        const response =await axios.post(`${apiUrl2}/addOrder`,OrderData,{
            headers: {
                Authorization: `Bearer ${idToken}`  // Send token in the Authorization header
            }
        })
        return response.data
    }catch(error){
        console.error("error adding order",error.data)
        throw error.data
    }
   } else {
        console.error("User is not authenticated");
    }

}

export const FindOrder = async (orderID) => {


    try {
        const auth = getAuth(); // Get Firebase auth instance
    const user = auth.currentUser; // Get the current user
    if (!user) throw new Error("User not logged in");

    const token = await user.getIdToken(); // Get Firebase ID token
        const response = await axios.get(`${apiUrl2}/findOrder/${orderID}`,{
            headers: {
              Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            },
          });
        
        return response.data; // Return the updated data
    } catch(error){
        console.error("Error fetching order:", error.response ? error.response.data : error.message);

        // Return null or an appropriate error message if something goes wrong
        return null;
    }
    
};

export const deleteOrder = async(orderId)=>{
    try{
        const response = await axios.delete(`${apiUrl2}/deleteOrder/${orderId}`)
        return response.data
      }catch(error){
          console.error("error deleting order",error.response.data)
          throw error.response.data
      }

}




  
  
  
  
  
