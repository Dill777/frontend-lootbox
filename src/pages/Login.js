import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

function Login({ setUser }) {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username) {
            setError("Enter your login");
            return;
        }

        try {
            const response = await api.post("/auth/login", { username });
            const user = response.data.user;
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            history.push("/");
        } catch (err) {
            setError("Error logging in");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login to the game</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Enter your login"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Enter</button>
            </form>
        </div>
    );
}

export default Login;
