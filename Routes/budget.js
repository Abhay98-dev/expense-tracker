const express=require("express")
const router=express.Router()
const Budget = require("../model/budget")
const verifyToken = require("../middleware/verifyToken")



router.post("/",verifyToken,async(req,res)=>{
    const {user,month, total}= req.body
    if(!user||!month || !total){
        return res.status(400).json({error:"All fields are reqquired"})
    }
    try{
        const existingBudget = await Budget.findOne({user , month})
        if(existingBudget){
            const updatedBudget = await Budget.findByIdAndUpdate(existingBudget._id, {total,month,remaining :total}, {new:true})
            return res.status(200).json({message:"Budget updated successfully", budget: updatedBudget})
        }
        else{
            const newBudget = await Budget.create({
                user,
                month,
                total,
                remaining:total
            })
            return res.status(201).json({message:"Budget created successfully",budget: newBudget})
        }
    }
    catch(err){
        console.error("Error creating or updating budget: ",err)
        return res.status(500).json({error:"Internal server error"})
    }
})

module.exports=router