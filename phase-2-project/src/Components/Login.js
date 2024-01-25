import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

function Login({ onLogin, error }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:3001/users");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const users = await response.json();
            const user = users.find(
                (u) => u.username === username && u.password === password
            );
            if (user) {
                onLogin({ id: user.id, username: user.username });
                navigate("/");
            } else {
                throw new Error("Invalid credentials.");
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            setIsLoading(false);
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const r = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json ",
                },
                body: JSON.stringify({
                    username: newUsername,
                    password: newPassword,
                }),
            });
            if (!r.ok) {
                throw new Error(`HTTP error! status: ${r.status}`);
            }
            const user = await r.json();
            alert(`User ${user.username} registered successfully!`);
            setNewUsername("");
            setNewPassword("");
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                    required
                />
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    required
                />
                <button type='submit' disabled={isLoading}>
                    {isLoading ? "Loading..." : "Login"}
                </button>
                {error && <p>{error}</p>}
            </form>

            <form onSubmit={handleRegister}>
                <input
                    type='text'
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder='New Username'
                    required
                />
                <input
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder='New Password'
                    required
                />
                <button type='submit'>Register</button>
            </form>
        </>
    );
}

export default Login;
