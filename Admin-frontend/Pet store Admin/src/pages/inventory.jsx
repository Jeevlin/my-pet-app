import React, { useState,useEffect } from "react";
import "./inventory.css";
import Cardcomp from "../components/cardcomp";


import { deletePet, getPets } from "../../api.js/petApi";
import { CategoryModal, EditPet ,QuickEdit,AddPet } from "../components/modal/modal";
import { getCategory } from "../../api.js/petApi";

function Inventory() {
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showAddPet , setShowAddPet]= useState(false)
    const [showEditPet, setShowEditPet]=useState(false)
    const [showQuickEdit,setShowQuickPet]=useState(false)
    const [ SelectedPet,setSelectedPet]=useState(null)
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [category,setCategory]=useState('')
    const [selectedCategory, setSelectedCategory] = useState('All'); // Tracks the selected category
    const [filteredPets, setFilteredPets] = useState([]);
    const[ categoryIndex,setCategoryIndex] =useState(null)
   

// Filter pets whenever the selected category changes
useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPets(pets);
    } else {
      const filtered = pets.filter((pet) => pet.category === selectedCategory);
      setFilteredPets(filtered);
  
    }
  }, [selectedCategory, pets]);


    useEffect(() => {
        const interval = setTimeout(async () => {
        
            try {
                const data = await getPets();
                setPets(data.data);
            } catch (err) {
                setError("failed to fetch");
            } finally {
                setLoading(false);
            }
        },1000)
        return () => clearInterval(interval); // Clean up
        
    }, [pets]);
    
      
        

    useEffect(() => {

        const getCat = async () => {
            try {
                const data = await getCategory();
                setCategory(data.data);
                
            } catch (err) {
                console.error("failed to fetch");
            }  finally {
                setLoading(false);
            }
        };
      
        getCat();
      
      },[]);


  
    const handleQuickClick=(pet)=>{
        setSelectedPet(pet);
        setShowQuickPet(true);  
    }
    const handleCardClick=(pet)=> {
        console.log('Card clicked:', pet);
        setSelectedPet(pet);
        setShowEditPet(true)
    }
    

    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
 
    
    return (
        <div className="inventory">
            <div className="heading">
                <h3 className="col-1"  style={{ marginTop:"50px", 
                                                fontWeight: "bold", 
                                                width: "400px", 
                                                marginLeft: '-68px' }}>Pet Store Inventory</h3>
                <select className="col-1" style={{ marginTop:"50px"}}>
                    <option onClick={() => setSelectedCategory('All')}>All</option>
                   {category.length>0?( category.map((category,index)=>(
                    <option key={index} onClick={() => setSelectedCategory(category.category)}>{category.category}</option>
                   ))
                ):(
                    <div></div>
                )}
                </select>
            </div>
           

            <div className="outborder mt-5">
            <button className="buttons"
             style={{backgroundColor: categoryIndex === null ? "navy" : "white",
                     color: categoryIndex === null ? "white" : "navy"}}
            onClick={() => { setSelectedCategory('All');
                             setCategoryIndex(null);}}>All</button>
                
            {category.length>0? (category.map((category,index)=>(
                <button className="buttons ms-2" 
                key={index} style={{backgroundColor: categoryIndex === index ? "navy" : "white",
                                    color: categoryIndex === index ? "white" : "navy"}}
                        onClick={() => {setSelectedCategory(category.category) , setCategoryIndex(index)}}>{category.category}</button>
                ))
            ):(
                <div></div>
            )}
                
                <button className="buttons ms-2" onClick={()=>{setShowCategoryModal(true)}}>+ Add</button>
                <CategoryModal show={showCategoryModal} handleClose={()=>{setShowCategoryModal(false)}} />

                <div className="inline mt-5">
                    <div className="row">

                    {filteredPets.length > 0 ? (
                filteredPets.map((pet,index) => (
                    <div className="col-4" style={{ marginBottom: "25px", marginTop: "25px" }} key={index}>
                        <Cardcomp 
                            onClick={() => handleCardClick(pet)}
                            name={pet.name}
                            id={pet. id}
                            status={pet.status}
                            photoURLs={pet.photoURLs ? pet.photoURLs : 'https://via.placeholder.com/250'}
                            onQuickEdit={() => handleQuickClick(pet)}
                        />
                    </div>
                ))
            ) : (
                <div>No pets available for this category</div>
            )}
                    </div>
                </div>

                <button className="button" style={{ marginLeft: '800px',
                                                     marginTop: "100px" }}
                                            onClick={()=>{setShowAddPet(true)}}>+ Add New Pet</button>
                 <AddPet show={showAddPet} handleClose={()=>{setShowAddPet(false)}} setFilteredPets={setFilteredPets}/>
                 {SelectedPet &&(
                    <EditPet show={showEditPet} handleClose={()=>{setShowEditPet(false)}} pet={SelectedPet} /> 
                 )}
                 {SelectedPet &&(
                    <QuickEdit show={showQuickEdit} handleClose={()=>{setShowQuickPet(false)}} pet={SelectedPet} /> 
                 )}
                
            </div>
        </div>
    );
}

export default Inventory;
