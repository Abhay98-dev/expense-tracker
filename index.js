const express=require("express")
const app=express()
const mongoose=require("mongoose")
require("dotenv").config()

const BudgetRoute = require("./Routes/budget")
const ExpenseRoute= require("./Routes/expense")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

async function connectedDb(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB")
    })
    .catch((err)=>{
        console.error("Error connecting to MongoDB:", err)
    })
}
connectedDb()

app.use("/budget",BudgetRoute)
app.use("/expense",ExpenseRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})