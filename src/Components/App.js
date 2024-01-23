// App.js
import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    useNavigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import GameList from "./GameList";
import GameDetails from "./GameDetails";
import GameManagement from "./GameManagement";
import Login from "./Login";
import "../App.css";

function App() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            setLoginError(null); // Reset the login error state before a new login attempt
            const response = await fetch("http://localhost:3001/users");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const users = await response.json();
            const user = users.find(
                (u) => u.username === username && u.password === password
            );
            if (user) {
                setUser({ id: user.id, username: user.username });
                localStorage.setItem(
                    "user",
                    JSON.stringify({ id: user.id, username: user.username })
                );
                navigate("/"); // Navigate to the home page on successful login
            } else {
                throw new Error("Invalid credentials.");
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            setLoginError(error.message); // Display an error to the user
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        // This effect runs only once when the App component mounts
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    return (
        <Router>
            <Navbar user={user} onLogout={logout} />
            <Routes>
                <Route path='/' element={<GameList />} />
                <Route path='/game/:id' element={<GameDetails />} />
                <Route
                    path='/manage-games'
                    element={
                        user ? (
                            <GameManagement />
                        ) : (
                            <Navigate replace to='/login' />
                        )
                    }
                />
                <Route
                    path='/login'
                    element={<Login onLogin={login} error={loginError} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
