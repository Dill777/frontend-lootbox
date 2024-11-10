import React, { useState, useEffect } from "react";
import "./LootBox.css";

function LootBox({ lootBox, onOpen }) {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        if (!lootBox.isOpened && !isAnimating) {
            setIsAnimating(true);
            onOpen(lootBox._id);
        }
    };

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    return (
        <div
            className={`lootbox ${lootBox.isOpened ? "opened" : ""} ${
                isAnimating ? "animate" : ""
            }`}
            onClick={handleClick}
        >
            {lootBox.isOpened ? (
                <div>
                    <p>Opened</p>
                    <p>by {lootBox.openedBy?.username}</p>
                    {lootBox.prize ? (
                        <p className="prize">Prize: {lootBox.prize.name}</p>
                    ) : (
                        <p>Prize: Loading...</p>
                    )}
                </div>
            ) : (
                <p>LootBox</p>
            )}
        </div>
    );
}

export default LootBox;
