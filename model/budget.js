const mongoose = require("mongoose");
const BudgetSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, // 👈 this is the link
        ref: "User",                          // 👈 tells Mongoose what it's referencing
        required: true
    },
    month: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    remaining: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Budget = mongoose.model("Budget", BudgetSchema);
module.exports = Budget;
