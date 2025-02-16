import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#333', color: 'white' }}>
            <div>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
                    Home
                </Link>
                {token && (
                    <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
                        Dashboard
                    </Link>
                )}
            </div>

            <div>
                {!token ? (
                    <>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
                            Login
                        </Link>
                        <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                            Register
                        </Link>
                    </>
                ) : (
                    <button onClick={handleLogout} style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none' }}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar
