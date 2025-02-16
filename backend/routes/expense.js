// routes/expense.js
const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/add', auth, async (req, res) => {
    console.log("Received request body:", req.body);
    console.log("Authenticated user:", req.user);

    const { title, amount, category } = req.body;

    // Ensure all fields are provided
    if (!title || !amount || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newExpense = new Expense({ userId: req.user.userId, title, amount, category });
        await newExpense.save();
        res.json(newExpense);
    } catch (error) {
        console.error("Error saving expense:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.get('/', auth, async (req, res) => {
    const expenses = await Expense.find({ userId: req.user.userId });
    res.json(expenses);
});

module.exports = router;