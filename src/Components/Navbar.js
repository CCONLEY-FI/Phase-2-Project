// Navbar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const activeStyle = {
    fontWeight: 'bold',
    color: 'blue',
  };
  
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the logout handler passed in via props
    navigate('/login'); // Navigate to the login page
  };

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle}>Home</NavLink>
      {user ? (
        <>
          <NavLink to="/manage-games" activeStyle={activeStyle}>Manage Games</NavLink>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <NavLink to="/login" activeStyle={activeStyle}>Login</NavLink>
      )}
    </nav>
  );
}

export default Navbar;