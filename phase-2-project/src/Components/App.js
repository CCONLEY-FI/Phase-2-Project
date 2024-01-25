// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import GameList from "./GameList";
import GameManagement from "./GameManagement";
import Login from "./Login";
import '../styles.css';


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [loginError, setLoginError] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<GameList />} />
        <Route path="/manage-games" element={user ? <GameManagement /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} error={loginError} />} />
      </Routes>
    </Router>
  );
}

export default App;