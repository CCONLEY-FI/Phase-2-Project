// Navbar.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles.css";

function Navbar({ user, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); // Call the logout handler passed in via props
        navigate("/login"); // Navigate to the login page
    };

    return (
        <nav>
            <NavLink to='/' className='nav-link'>
                Home
            </NavLink>
            {user ? (
                <>
                    <NavLink to='/manage-games' className='nav-link'>
                        Manage Games
                    </NavLink>
                    <span>Welcome, {user.username}!</span>
                    <button onClick={handleLogout} className='button'>
                        Logout
                    </button>
                </>
            ) : (
                <NavLink to='/login' className='nav-link'>
                    Login
                </NavLink>
            )}
        </nav>
    );
}

export default Navbar;
