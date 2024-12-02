import { Server } from "socket.io";
import { chatSocketServer } from "./chatsocket";
import { jobSocketServer } from "./jobSocket";

const onlineUsers = new Map<string, string>(); // Track online users with socketId

export const initializeSocket = (io: Server) => {
  io.engine.on("initial_headers", (headers, req) => {
    console.log("Initial headers:", headers);
  });

  io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    chatSocketServer(io, socket);
    jobSocketServer(io, socket);

    // connection error
    socket.on("connect_error", (err) =>
      console.error("Connection Error:", err)
    );

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
