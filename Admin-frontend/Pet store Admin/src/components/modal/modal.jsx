import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect } from "react";
import { useState } from 'react';
import './modal.css'
import { useNavigate } from 'react-router-dom';
import { addPet } from '../../../api.js/petApi';
import { editPet } from '../../../api.js/petApi';
import { addCategory } from '../../../api.js/petApi';
import { getCategory } from '../../../api.js/petApi';
import { deletePet } from '../../../api.js/petApi';

export function Logout({show,handleClose}){
  const navigate = useNavigate(); 

  const handleLogout = () => {
    
    localStorage.removeItem("authToken");
    navigate("/");
    handleClose();
  };

  return(
    <Modal className="modal-lg" show={show} onHide={handleClose}>
        <Modal.Header className="titles" closeButton>
          <Modal.Title>Logout User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Are you sure you want to logout?</div>
          <Button className="savebutn mb-5 mt-5 ms-5" onClick={handleLogout} >
            Yes
          </Button>
          <Button className="savebutn mb-5 mt-5 ms-5" onClick={handleClose}>
            No
          </Button>
        </Modal.Body>
      </Modal>
  )
}



export function CategoryModal({show,handleClose}){

  const [categoryData,setCategoryData] =useState({category:''})

  const [category ,setCategory] = useState("")

  useEffect(() => {
    if (show,handleClose){
    const getCat = async () => {
        try {
            const data = await getCategory();
            setCategory(data.data);
        } catch (err) {
            console.error("failed to fetch");
        } 
    };
  
    getCat();
  }
  }, [show,handleClose]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
        ...categoryData,
        [name]: value,
    });
};
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await addCategory(categoryData) ;
    console.log('Response:', response); 
    
    handleClose();
} catch (error) {
    console.error('Error:', error); 
   
}
};



    return(
        <>

      <Modal className="modal-lg" 
     
      show={show} onHide={handleClose}>
        <Modal.Header className='titlebar' closeButton>
          <Modal.Title>Add a Pet Category</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <p style={{ fontSize:"18px",
          fontWeight:"620",
          marginTop:"15px",
          marginLeft:"35px"}}>Click to add or modify pet categories</p>
        <div className='outerline'>
          {category.length>0 ?(
           category.map((category,index)=>(
            <button className="buttonPet ms-2" key={index} >{category.category} </button>
           ))
          ):(
            <div> no category available</div>
          )}
        <button className="buttonPet ms-2"type='submit'onClick={handleSubmit}>+Add</button>
        </div>
  <div className='pet'>
  <p >Pet Store Inventory</p> 
  <input className='inputline' style={{width:"20%",height:"25px",marginTop:"5px"}}
          id='category' name='category'
          value={categoryData.category}
          onChange={handleChange}></input>
  </div>
  <div>
            <Button className='savebutton'  style={{marginLeft :"280px",marginBottom:"100px"}} onClick={handleSubmit}>
              Save Changes
            </Button>
            </div>
    
        
          </Modal.Body>
        
      </Modal>
    </>
    )
}


export function AddPet({show,handleClose,setFilteredPets}){

  const [petData, setPetData] = useState({
    name: '',
    category: '',
    status: '',
    photoURLS:" ",
    id:" ",
});
  const [message, setMessage] = useState('');
  const[ selectedFile,setSelectedFile]=useState(null)

  const generateAlphanumericPetId = () => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  

  const handleChange = (e) => {
      const { name, value } = e.target;
      setPetData({
          ...petData,
          [name]: value,
      });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected File:", file); // Log selected file
    setSelectedFile(file);
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();
  const id= generateAlphanumericPetId();

  // Prepare form data to send to server
  const formData = new  FormData();
  formData.append('name', petData.name);
  formData.append('category', petData.category);
  formData.append('status', petData.status);
  formData.append('id',id);
  if (selectedFile) {
      formData.append('photoURLs', selectedFile); // Append the single file
      console.log("FormData with File:", Array.from(formData.entries())); // Log all FormData entries
      
  }

  try {
      const response = await addPet(formData); // Ensure addPet accepts FormData
      setFilteredPets(petData)
      console.log('Response:', response); // Log the response
      setMessage(`Pet added successfully! ID: ${response.id}`);
     
      handleClose();
  } catch (error) {
      console.error('Error:', error); // Log any error
      setMessage(`Error: ${error.error || 'Failed to add pet'}`);
  }
};


  return (
    <>
      <Modal
        className="modal-lg"
      
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="titlebar" style={{marginBottom:"35px"}}closeButton>
          <Modal.Title ><h3>Add a New Pet To The Store</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <div  style={{ display: 'flex',marginLeft:"250px", marginBottom: '15px' }}>
                  <label htmlFor="petName" style={{color:'navy', fontSize:"16px" ,fontWeight:"700"}}>Name:</label>
                  <input id="petName" 
                  name="name" 
                  value={petData.name}
                  onChange={handleChange} className='inputline' type="text" />
                </div>
                <div style={{ display: 'flex', marginLeft:"168px",marginBottom: '15px' }}>
                  <label htmlFor="petCategory" style={{ color:'navy',fontSize:"16px" ,fontWeight:"700"}}>Choose Category:</label>
                  <input id="petCategory" 
                  name='category' 
                  value={petData.category}
                  onChange={handleChange} className='inputline' type="text" />
                </div>
                <div style={{ display: 'flex',marginLeft:"217px", marginBottom: '15px' }}>
                  <label htmlFor="photoUrl" style={{color:'navy', fontSize:"16px" ,fontWeight:"700"}}>Photo URL:</label>
                  <input type='file' id="photoURLs"  name="photoURLs" 
             
                  className='inputline' onChange={handleFileChange}/>
                  
                </div>
             

                <div  style={{ display: 'flex',marginLeft:"250px", marginBottom: '15px' }}>
                  <label htmlFor="status"style={{ color:'navy',fontSize:"16px" ,fontWeight:"700"}}>Status:</label>
                  <input id="status" name='status'  value={petData.status}
                        onChange={handleChange} className='inputline' type="text" />
                </div>
              </div>
            </div>
       
         
          <div>
            <Button className='savebutton' type='submit' style={{marginLeft :"345px"}} onClick={handleClose}>
              Add Pet
            </Button>
            </div>
            </form>
            {message && <p>{message}</p>}
            <div >
               <Button className='savebutton'style={{ marginLeft:"550px" }}>Delete</Button>
               </div>
           
          
        </Modal.Body>
      </Modal>
    </>
  );
}

export function EditPet({ show, handleClose ,pet}) {
 const [data,setData]= useState({
  id:'',
  name:'',
  category:'',
  photoURLS:'',
  status:'',
 });
 

 useEffect(()=>{
  if (pet && show){
    setData({
      id: pet.id || '',
      name:pet.name||'',
      category:pet.category||'',
      photoURLS:pet.photoURLS||'',
      status:pet.status||'',
    })
  }
 },[pet,show])

 const handleDelete = async () => {
  if (!data.id) {
    console.error("No pet ID to delete");
   
    return;
  }

  try {
    const result = await deletePet(data.id); // Pass the pet ID to deletePet
    console.log("Pet deleted successfully:", result);
    handleClose(); // Close the modal after deletion
  } catch (error) {
    console.error("Failed to delete pet:", error);
    
  }
};
  // Handle input changes and update formData state
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log("Input change:", id, value);
    
    setData((prevData) => ({
      ...prevData,
      [id]: value, // Dynamically update the property based on input's id
    }));
    
  };
 
  const handleSave = async (e) => {
    e.preventDefault();
   
      if (pet && pet.id) {
        try{
        const updatedPet = await editPet(pet.id, data);
        console.log('Updated pet data:', updatedPet);
        // Do something with the updated data, like updating the frontend display or showing a success message
      handleClose()
      
    } catch (error) {
      console.error('Error updating pet:', error);
      // Handle the error (e.g., show an error message)
    }
  }
  };

  return (
    <>
      <Modal
        className="modal-lg"
      
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="titlebar" style={{marginBottom:"35px"}}closeButton>
          <Modal.Title ><h2>Edit Pet Information</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSave}>
            <div className="row">
              <div className="col">
                <div  style={{ display: 'flex',marginLeft:"250px", marginBottom: '15px' }}>
                  <label htmlFor="name" style={{color:'navy', fontSize:"16px" ,fontWeight:"700"}}>Name:</label>
                  <input id="name"  
                  value={data.name} onChange={handleInputChange} 
                  className='inputline' type="text" />
                </div>

                <div style={{ display: 'flex', marginLeft:"168px",marginBottom: '15px' }}>
                  <label htmlFor="category" style={{ color:'navy',fontSize:"16px" ,fontWeight:"700"}}>Choose Category:</label>
                  <input id="category" 
                  value={data.category} onChange={handleInputChange} 
                  className='inputline' type="text" />
                </div>

                <div style={{ display: 'flex',marginLeft:"217px", marginBottom: '15px' }}>
                  <label htmlFor="photoURLs" style={{color:'navy', fontSize:"16px" ,fontWeight:"700"}}>Photo URL:</label>
                  <input id="photoURLs"
                  value={data.photoURLS} onChange={handleInputChange} 
                  className='inputline' type="file" /> 
                </div>
               

                <div  style={{ display: 'flex',marginLeft:"250px", marginBottom: '15px' }}>
                  <label htmlFor="status"style={{ color:'navy',fontSize:"16px" ,fontWeight:"700"}}>Status:</label>
                  <input id="status" 
                  value={data.status}  onChange={handleInputChange}
                  className='inputline' type="text" />
                </div>
              </div>
            </div>
          
          <div>
            <Button className='savebutton'  type="submit" style={{marginLeft :"345px"}}>
              Save Changes
            </Button>
            </div>
            

            <div >
               <Button className='savebutton'style={{ marginLeft:"550px" }}onClick={handleDelete}>Delete Pet</Button>
               </div>
                </form>
           
          
        </Modal.Body>
      </Modal>
    </>
  );
}


export function QuickEdit({show,handleClose,pet}){
 const [quick,setQuick] =useState({
  id:'',
  name: '',
  status:''
 })

 useEffect(()=>{
  if (pet && show){
    setQuick({
      id: pet.id || '',
      name:pet.name||'',
      status:pet.status||'',
    })

  }
 },[pet,show])

const handleInputChange = (e) => {
  const { id, value } = e.target;
  console.log("Input change:", id, value);
  
  setQuick((prevData) => ({
    ...prevData,
    [id]: value, // Dynamically update the property based on input's id
  }));
  
};

const handleSave = async (e) => {
  e.preventDefault();
 
    if (pet && pet.id) {
      try{
      const updatedPet = await editPet(pet.id, quick);
      console.log('Updated pet data:', updatedPet);
      // Do something with the updated data, like updating the frontend display or showing a success message
    handleClose()
    
  } catch (error) {
    console.error('Error updating pet:', error);
    // Handle the error (e.g., show an error message)
  }
}
};


  return(
      <>

    <Modal className="modal-lg" 
      
    show={show} onHide={handleClose}>
      <Modal.Header className='titlebar' closeButton>
        <Modal.Title>Quick Update Pet Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{fontSize:"20px",fontWeight:"600",color:"rgb(1, 1, 56)"}}> Quick Update Pet Info</p>
     
        
        <form onSubmit={handleSave} style={{marginBottom:"20px"}}>
            <div className="row">
              <div className="col ">
                <div  style={{ display: 'flex',marginLeft:"170px", marginBottom: '15px',marginTop:"80px" }}>
                  <label htmlFor="name" style={{color:'rgb(1, 1, 56)', fontSize:"16px" ,fontWeight:"700"}}>Name:</label>
                  <input id="name" onChange={handleInputChange} value= {quick.name}
                  className='inputline' type="text" />
                </div>
                <div style={{ display: 'flex', marginLeft:"168px",marginBottom: '15px' }}>
                  <label htmlFor="status" style={{ color:'rgb(1, 1, 56)',fontSize:"16px" ,fontWeight:"700"}}>Status:</label>
                  <input id="status"  onChange={handleInputChange} value= {quick.status}
                  className='inputline' type="text" />
                </div>
              
               
              </div>
            </div>
          </form>

          <div>
            <Button className='savebutton' style={{marginLeft:"270px",marginBottom:"100px"}} type ='submit' onClick={handleSave}>
              Save Changes
            </Button>
            </div>
</Modal.Body>    
    </Modal>
  </>
  )
}
