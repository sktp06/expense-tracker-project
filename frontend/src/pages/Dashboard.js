import { useEffect, useState } from 'react';
import AddExpense from '../components/AddExpense';  // Import the AddExpense component

const Dashboard = ({ token }) => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        if (token) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/expense`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => setExpenses(data));
        }
    }, [token]);

    return (
        <div>
            <h1>Expense List</h1>
            <AddExpense token={localStorage.getItem('token')} setExpenses={setExpenses} />
            <div>
                {expenses.map((expense) => (
                    <div key={expense._id}>
                        <p>
                            {expense.title}: ${expense.amount}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
