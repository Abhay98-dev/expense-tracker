const express = require("express");
const router = express.Router();

const Expense = require("../model/Expense");
const Budget = require("../model/budget");

const dummyUserId = "000000000000000000000000";

router.post("/", async (req, res) => {
    const { month, title, amount, category } = req.body;

    if (!month || !title || !amount) {
        return res.status(400).json({ error: "Month, title, and amount are required" });
    }

    try {
        const budget = await Budget.findOne({ user: dummyUserId, month });

        if (!budget) {
            return res.status(404).json({ error: "No budget found for this month" });
        }

        if (budget.remaining < amount) {
            return res.status(400).json({ error: "Insufficient remaining budget" });
        }

        const newExpense = await Expense.create({
            user: dummyUserId,
            month,
            title,
            amount,
            category
        });

        budget.remaining -= amount;
        await budget.save();

        res.status(201).json({ message: "Expense added and budget updated", expense: newExpense, updatedRemaining: budget.remaining });

    } catch (err) {
        console.error("Error saving expense:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/", async (req, res) => {
    const { month } = req.query;
    const dummyUserId = "000000000000000000000000";

    try {
        const filter = { user: dummyUserId };
        if (month) {
            filter.month = month;
        }

        const expenses = await Expense.find(filter).sort({ createdAt: -1 }); // newest first

        res.status(200).json({ count: expenses.length, expenses });
    } catch (err) {
        console.error("Error fetching expenses:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
