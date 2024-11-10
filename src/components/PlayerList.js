import React, { useState, useEffect } from "react";
import { subscribeToEvent } from "../utils/socket";
import { api } from "../utils/api";
import "./PlayerList.css";

function PlayerList() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        subscribeToEvent("updateUsers", (data) => {
            const sortedPlayers = [...data].sort((a, b) => {
                if (a.onlineStatus === b.onlineStatus) return 0;
                return a.onlineStatus ? -1 : 1;
            });
            setPlayers(sortedPlayers);
        });

        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        try {
            const response = await api.get("/users");
            const sortedPlayers = [...response.data].sort((a, b) => {
                if (a.onlineStatus === b.onlineStatus) return 0;
                return a.onlineStatus ? -1 : 1;
            });
            setPlayers(sortedPlayers);
        } catch (err) {
            console.error("Error getting player list", err);
        }
    };

    return (
        <div className="player-list">
            <h3>Players</h3>
            <ul>
                {players.map((player) => (
                    <li key={player._id}>
                        <span className="username">{player.username}</span>
                        <span className="rewards">
                            Rewards: {player.rewards.length}
                        </span>
                        <span
                            className={`status ${
                                player.onlineStatus ? "online" : "offline"
                            }`}
                        >
                            {player.onlineStatus ? "Online" : "Offline"}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlayerList;
