import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        user ? <Navigate to="/" /> : <Login setUser={setUser} />
                    }
                />
                <Route
                    path="/"
                    element={
                        user ? <Home user={user} /> : <Navigate to="/login" />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
