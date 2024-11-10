import React from "react";
//import "./RewardModal.css";

function RewardModal({ reward, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>You received a reward!</h2>
                <p>{reward.name}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default RewardModal;
