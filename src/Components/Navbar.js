import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const activeStyle = {
    fontWeight: 'bold',
    color: 'blue',
  };

  return (
    <nav>
      <NavLink to="/" style={({ isActive }) => isActive ? activeStyle : undefined}>
        Home
      </NavLink>
      <NavLink to="/manage-games" style={({ isActive }) => isActive ? activeStyle : undefined}>
        Manage Games
      </NavLink>
      {/* Add more navigational links as necessary */}
    </nav>
  );
}

export default Navbar;