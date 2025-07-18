const express= require("express")
const router =express.Router()

const Expense = require("../model/Expense")

router.post("/",async(req,res)=>{
    res.send("Expense route is working")
})

module.exports= router