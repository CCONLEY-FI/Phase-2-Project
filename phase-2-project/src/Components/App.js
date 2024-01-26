// App.js
import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import GameList from "./GameList";
import GameManagement from "./GameManagement";
import Login from "./Login";
import "../styles.css";

function App() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [loginError, setLoginError] = useState(null);

    const handleLogin = (user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const handleLogout = () => {
        setUser(null); // Clear logged in user
        localStorage.removeItem("user"); // Remove user from local storage
    };

    return (
        <Router>
            <Navbar user={user} onLogout={handleLogout} />{" "}
            {/* Pass the user and onLogout props to the Navbar component */}
            <Routes>
                <Route path='/' element={<GameList />} />{" "}
                {/* dont need to pass props to the GameList component */}
                <Route
                    path='/manage-games'
                    element={
                        user ? <GameManagement /> : <Navigate to='/login' />
                    }
                />
                <Route
                    path='/login'
                    element={
                        user ? (
                            <Navigate to='/' />
                        ) : (
                            <Login onLogin={handleLogin} error={loginError} />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
