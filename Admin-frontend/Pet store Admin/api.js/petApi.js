import axios from 'axios';
const apiUrl = 'https://my-pet-app-ovo1.onrender.com/pet'
const apiUrl1 = 'https://my-pet-app-ovo1.onrender.com/category'
const apiUrl2 ='https://my-pet-app-ovo1.onrender.com/order'
const apiUrl3 ='https://my-pet-app-ovo1.onrender.com/admin'

export const addPet = async(petData)=>{
    try{
        const response = await axios.post(`${apiUrl}/addPet`,petData)
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
        const response = await axios.put(`${apiUrl}/editPet/${petId}`, data);
        
        return response.data; // Return the updated data
    } catch(error){
        console.error("error fetching pets",error.response.data)
        throw error.response.data

    }
    
};

export const deletePet = async(petId)=>{
    try{
        const response = await axios.delete(`${apiUrl}/deletePet/${petId}`)
        return response.data
      }catch(error){
          console.error("error deleting pets",error.response.data)
          throw error.response.data
  
      }

}


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


export const FindOrder = async (orderID) => {


    try {
        const response = await axios.get(`${apiUrl2}/findOrder/${orderID}`);
        return response.data; // Return the updated data
    } catch(error){
        console.error("error fetching pets",error.response.data)
        throw error.response.data

    }
    
};
export const getOrder = async()=>{
    try{
      const response = await axios.get(`${apiUrl2}/getOrder`)
      return response.data
    }catch(error){
        console.error("error fetching order",error.response.data)
        throw error.response.data

    }
}


export const deleteOrder = async(orderID)=>{
    try{
        const response = await apiClient.delete(`${apiUrl2}/deleteOrder/${orderID}`)
        return response.data
      }catch(error){
          console.error("error deleting pets",error.response.data)
          throw error.response.data
  
      }

}


const apiClient = axios.create({
    baseURL: apiUrl3,
    headers: {
      "Content-Type": "application/json",
    },
  });
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken"); // Retrieve the token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
  
export const login = async (email,password)=>{
    
    try{
        const response =await apiClient.post(`/login`,{email,password})
        const { token} = response.data;

        // Save token to localStorage
        localStorage.setItem("authToken", token);
    
        return response.data
    }catch(error){
        console.error("Failed to login:", error.response?.data || error.message);

        // Throw the error to handle it in the calling function
        throw error.response?.data || "Something went wrong";
      
    }

}
export const sendCredentials = async (email) => {
    try {
        const response = await axios.post(`${apiUrl3}/credentials`, { email });
        return response.data; // Check if it includes a success flag
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    };
  
  
