const mongoose = require('mongoose');
const ExpenseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, // 👈 this is the link
        ref: "User",                          // 👈 tells Mongoose what it's referencing
        required: true
    },
    month:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: "general"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Expense = mongoose.model("Expense", ExpenseSchema);
module.exports = Expense;