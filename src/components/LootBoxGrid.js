import React, { useState, useEffect } from "react";
import { subscribeToEvent, emitEvent } from "../utils/socket";
import { api } from "../utils/api";
import LootBox from "./LootBox";
import RewardModal from "./RewardModal";
//import "./LootBoxGrid.css";

function LootBoxGrid({ user }) {
    const [lootBoxes, setLootBoxes] = useState([]);
    const [reward, setReward] = useState(null);
    const [error, setError] = useState("");
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        console.log("LootBoxGrid mounted");
        fetchLootBoxes();

        subscribeToEvent("updateLootBoxes", (data) => {
            console.log("Updated loot boxes received:", data);
            setLootBoxes(data);
        });

        subscribeToEvent("rewardReceived", (data) => {
            console.log("Received reward:", data);
            setReward(data);
        });

        subscribeToEvent("error", (data) => {
            console.log("Error:", data);
            setError(data.message);
            setTimeout(() => setError(""), 3000);
        });

        subscribeToEvent("timer", (data) => {
            console.log("Remaining time:", data);
            setTimeLeft(data);
        });
    }, []);

    const fetchLootBoxes = async () => {
        try {
            const response = await api.get("/lootboxes");
            setLootBoxes(response.data);
        } catch (err) {
            console.error("Error when receiving loot boxes", err);
        }
    };

    const handleOpen = (lootBoxId) => {
        emitEvent("openLootBox", { lootBoxId, userId: user._id });
    };

    return (
        <div className="lootbox-grid-container">
            {error && <p className="error">{error}</p>}
            {timeLeft !== null && <p>Before lootbox update: {timeLeft} sec</p>}
            <div className="lootbox-grid">
                {lootBoxes.map((lootBox) => (
                    <LootBox
                        key={lootBox._id}
                        lootBox={lootBox}
                        onOpen={handleOpen}
                    />
                ))}
            </div>
            {reward && (
                <RewardModal reward={reward} onClose={() => setReward(null)} />
            )}
        </div>
    );
}

export default LootBoxGrid;
