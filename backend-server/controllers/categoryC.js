const CategorySchema =require('../models/categoryModel')

const addCategory= async (req,res)=>{
    try{
       const newCategory = new CategorySchema(req.body)
       const categoryData = await newCategory.save()
       res.status(200).json({
        success:true,
        message:categoryData
    });
    }catch(error){
        res.status(500).json({ error: error.message });

    }
}

const getCategory= async(req,res)=>{
    try{
        const categories = await CategorySchema.find()
        const category = categories.map(category=>{
            return category

        })
        res.status(200).json({
            success:true,
            data:category
        })
        
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    

    }
}
module.exports={addCategory,getCategory}