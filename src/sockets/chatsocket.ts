import { Server, Socket } from "socket.io";

const onlineUsers = new Map<string, string>(); // Track online users with socketId

export const chatSocketServer = (io: Server, socket: Socket) => {
  // Register the user as online
  socket.on("register", (userId: string) => {
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
