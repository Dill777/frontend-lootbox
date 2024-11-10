import io from "socket.io-client";

let socket;

export const initiateSocket = (userId) => {
    if (!socket) {
        socket = io(process.env.REACT_APP_SOCKET_SERVER_URL);
        console.log("Connecting socket...");

        socket.on("connect", () => {
            console.log("Connected to socket server:", socket.id);
            socket.emit("join", userId);
        });

        socket.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
        });
    }
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    console.log("Disconnecting socket...");
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const subscribeToEvent = (eventName, callback) => {
    if (!socket) {
        console.error(
            "Socket not initialized when subscribing to event:",
            eventName
        );
        return;
    }
    console.log(`Subscribing to event: ${eventName}`);
    socket.on(eventName, callback);
};

export const emitEvent = (eventName, data) => {
    if (!socket) {
        console.error("Socket not initialized when emitting event:", eventName);
        return;
    }
    socket.emit(eventName, data);
};
