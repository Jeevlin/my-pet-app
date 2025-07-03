
const PetSchema =require ('../models/petModel')


const addPet = async (req, res) => {
    console.log('Request body:', req.body);  
    try {
        const newPet = new PetSchema(req.body);
        // Attach the image buffer to photoURLs array
    if (req.file) {
        newPet.photoURLs = req.file.buffer;
      }
       

        const petData= await newPet.save();
       
        await petData.save()
        res.status(200).json({
            success:true,
            message:petData
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const addPetCategory = async (req, res) => {
    
    try {
        const newPetCategory = new PetSchema(req.body.category);
        await newPetCategory.save();
        res.json(newPetCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const editPet = async (req, res) => {
    try {
        const { name, category, status } = req.body;
        const petId = req.params.id; 
        const editedPet = await PetSchema.findOneAndUpdate(
            { id: petId },
            { name, category, status },
            { new: true }
        );

        if (!editedPet) {
            console.log("Pet not found for ID:", petId);
            return res.status(404).json({
                success: false,
                message: "Pet not found"
            });
        }

        console.log("Pet successfully updated:", editedPet);
        res.status(200).json({
            success: true,
            data: editedPet
        });
    } catch (err) {
        console.error("Error during pet update:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


const quickEditPet= async (req,res)=>{
    try{
        const {name,status} =req.body
        const petId = req.params.id; 
        const editedPet = await PetSchema.findOneAndUpdate ({id:petId},{name:name,status:status},{new:true})
        if (!editedPet){
           return res.status(404).json({
            success:false,
            message:"pet not found"
           })
        }
        res.status(200).json({
            success:true,
            data:editedPet
        })

    }catch (err){
        res.status(500).json({
            success:false,
            message:err.message
        })

    }
}

const getPets = async (req,res)=>{
try{
    const Pets = await PetSchema.find();
    const petsWithBase64 = Pets.map(pet => {
        if (pet.photoURLs && pet.photoURLs.data) {
          const base64Image = pet.photoURLs.data.toString('base64'); // Convert buffer to base64
          pet.photoURLs = `data:${pet.photoURLs.contentType};base64,${base64Image}`; // Prepend with content type
        }
        return pet;
      });
    res.status(200).json({
        success:true,
        data:petsWithBase64
    })
}catch(error){
    res.status(500).json({
        success:false,
        message:err.message
    })

}
}

const findPet = async (req, res) => {
    try {
        const {petId}= req.params
      const pet = await PetSchema.findOne({id:petId});
      if (!pet) {
        return res.status(404).send('Pet not found');
      }
      res.json(pet);
    } catch (error) {
      res.status(500).send('Error finding pet');
    }
  }

const deletePet = async(req,res)=>{
    try{
        const id = req.params.id

        const deletedPet = await PetSchema.findOneAndDelete({id : id})

        res.status(200).json({
            success : true,
            data : deletedPet
        }) 


    }catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })

    }
}


module.exports={addPet,addPetCategory,editPet,quickEditPet,getPets,deletePet,findPet}