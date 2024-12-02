import { Server } from "socket.io";
import { whitelist } from "../configs/corsConfig";

let io: Server;
const onlineUsers = new Map<string, string>(); // Track online users with socketId

export const initializeSocket = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: whitelist,
    },
  });
  io.engine.on("initial_headers", (headers, req) => {
    console.log("Initial headers:", headers);
  });

  io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

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

    socket.on("connect_error", (err) =>
      console.error("Connection Error:", err)
    );

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

export const getIo = () => io;
