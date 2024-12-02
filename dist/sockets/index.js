"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = void 0;
const chatsocket_1 = require("./chatsocket");
const jobSocket_1 = require("./jobSocket");
const onlineUsers = new Map(); // Track online users with socketId
const initializeSocket = (io) => {
    io.engine.on("initial_headers", (headers, req) => {
        console.log("Initial headers:", headers);
    });
    io.on("connection", (socket) => {
        console.log("User connected: ", socket.id);
        (0, chatsocket_1.chatSocketServer)(io, socket);
        (0, jobSocket_1.jobSocketServer)(io, socket);
        // connection error
        socket.on("connect_error", (err) => console.error("Connection Error:", err));
        // Handle disconnection
        socket.on("disconnected", () => {
            onlineUsers.forEach((value, key) => {
                if (value === socket.id) {
                    onlineUsers.delete(key);
                }
            });
            console.log("User disconnected: ", socket.id);
        });
    });
};
exports.initializeSocket = initializeSocket;
//# sourceMappingURL=index.js.map