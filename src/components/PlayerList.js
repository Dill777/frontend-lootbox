import React, { useState, useEffect } from "react";
import { subscribeToEvent } from "../utils/socket";
import { api } from "../utils/api";
//import './PlayerList.css';

function PlayerList() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        // subscribe to the updateUsers event
        subscribeToEvent("updateUsers", (data) => {
            //console.log("received updated user-list", data);
            const sortedPlayers = [...data].sort((a, b) => {
                // sort online players first
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
            console.error("Error getting list of players", err);
        }
    };

    return (
        <div className="player-list">
            <h3>PLayers</h3>
            <ul>
                {players.map((player) => (
                    <li key={player._id}>
                        {player.username} - Rewards: {player.rewards.length}{" "}
                        {player.onlineStatus ? "(Online)" : "(Offline)"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlayerList;
