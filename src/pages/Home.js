import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initiateSocket, disconnectSocket, getSocket } from "../utils/socket";
import LootBoxGrid from "../components/LootBoxGrid";
import PlayerList from "../components/PlayerList";
import "./Home.css";

function Home({ user }) {
    const navigate = useNavigate();
    const [socketInitialized, setSocketInitialized] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        initiateSocket(user._id);
        console.log("Socket initiated in Home");

        const socket = getSocket();

        if (socket && socket.connected) {
            console.log("Socket already connected");
            setSocketInitialized(true);
        } else if (socket) {
            socket.on("connect", () => {
                console.log("Socket connected");
                setSocketInitialized(true);
            });
        }

        return () => {
            disconnectSocket();
        };
    }, [user, navigate]);

    if (!user || !socketInitialized) {
        return null;
    }

    return (
        <div className="home-container">
            {/* <h1>Welcome, {user.username}</h1> */}
            <div className="game-container">
                <LootBoxGrid user={user} />
                <PlayerList />
            </div>
        </div>
    );
}

export default Home;
