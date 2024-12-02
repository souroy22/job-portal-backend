"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIo = exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
const corsConfig_1 = require("../configs/corsConfig");
let io;
const onlineUsers = new Map(); // Track online users with socketId
const initializeSocket = (httpServer) => {
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: corsConfig_1.whitelist,
        },
    });
    io.engine.on("initial_headers", (headers, req) => {
        console.log("Initial headers:", headers);
    });
    io.on("connection", (socket) => {
        console.log("User connected: ", socket.id);
        // Register the user as online
        socket.on("register", (userId) => {
            onlineUsers.set(userId, socket.id);
        });
        // Handle one-to-one message
        socket.on("send-message", ({ sender, receiver, message }) => {
            const receiverSocketId = onlineUsers.get(receiver);
            // Send message to the receiver if online
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("receive-message", { sender, message });
            }
        });
        socket.on("connect_error", (err) => console.error("Connection Error:", err));
        // Handle disconnection
        socket.on("disconnect", () => {
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
const getIo = () => io;
exports.getIo = getIo;
//# sourceMappingURL=socket.server.js.map