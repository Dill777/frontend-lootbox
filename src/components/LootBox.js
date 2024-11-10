import React from "react";
// import "./LootBox.css";

function LootBox({ lootBox, onOpen }) {
    const handleClick = () => {
        if (!lootBox.isOpened) {
            onOpen(lootBox._id);
        }
    };

    return (
        <div
            className={`lootbox ${lootBox.isOpened ? "opened" : ""}`}
            onClick={handleClick}
        >
            {lootBox.isOpened ? (
                <div>
                    <p>Opened</p>
                    <p>by {lootBox.openedBy?.username}</p>
                    {lootBox.prize ? (
                        <p>Prize: {lootBox.prize.name}</p>
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
