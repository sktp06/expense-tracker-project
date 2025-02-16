import { useState } from 'react';

const AddExpense = ({ token, setExpenses }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const handleAddExpense = async (e) => {
        e.preventDefault();

        if (!token) {
            console.error("No token found, user might be logged out.");
            return;
        }

        const expenseData = {
            title,
            amount: parseFloat(amount), // Convert amount to a number
            category,
        };

        try {
            console.log("Sending request with token:", token); // Debugging

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/expense/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Ensure token is included
                },
                body: JSON.stringify(expenseData),
            });

            const data = await response.json();
            console.log("Response from server:", data); // Debugging

            if (response.ok) {
                setExpenses(prev => [...prev, data]);
                setTitle('');
                setAmount('');
                setCategory('');
            } else {
                console.error("Error adding expense:", data.message || data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div>
            <h2>Add Expense</h2>
            <form onSubmit={handleAddExpense}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpense;
