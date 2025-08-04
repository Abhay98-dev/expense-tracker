const express = require("express")
const route = express.Router()
const jwt= require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../model/user")
require("dotenv").config()

route.get("/",(req,res)=>{
    res.send("Auth route is working")
})

saltrounds=10

route.post("/register",async(req,res)=>{
    const {username,email,password}=req.body
    if(!username || !email || !password){
        return res.status(400).json({error:"All fileds are required"})
    }
    try{
        const existingUser = await User.findOne({ email})
        if(existingUser){
            return res.status(400).json({error:"User already exists"})
        }
        const hashedPass= await bcrypt.hash(password, saltrounds)
        const newUser =new User({
            email,
            username,
            password: hashedPass
        })
        await newUser.save()
        return res.status(201).json({message:"User registered Successfully"})
    }
    catch(err){
        console.error("Error registering user: ",err)
        return res.status(500).json({error:"Internal server error"})
    }
})

route.post("/login",async(req,res)=>{
    const {email,password}=req.body
    if(!email ||!password){
        return res.status(400).json({error:"All fields are required"})
    }
    try{
        const user = await User.findOne({email})
        if(!user || user.length ===0){
            return res.status(400).json({error:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({error:"Invalid Password"})
        }
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET, {expiresIn: "1h"})
        return res.status(200).json({message:"Login successful", token})
    }
    catch(err){
        console.error("Error logging in user: ",err)
        return res.status(500).json({error:"Internal server error"})
    }
})

module.exports= route