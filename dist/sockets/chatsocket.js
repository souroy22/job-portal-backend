"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSocketServer = void 0;
const onlineUsers = new Map(); // Track online users with socketId
const chatSocketServer = (io, socket) => {
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
};
exports.chatSocketServer = chatSocketServer;
//# sourceMappingURL=chatsocket.js.map