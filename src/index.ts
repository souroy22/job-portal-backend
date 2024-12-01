import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import routers from "./routers";
import { corsOptions } from "./configs/corsConfig";
import connectDB from "./database/dbConfig";
import { PaginationOptions } from "./utils/pagination.util";
import errorHandler from "./middlewares/errorHandler.middleware";
import { initializeSocket } from "./sockets/socket.server";

dotenv.config();

const app = express();
const PORT = process.env.PORT || "8000";

// Extend Express request object for middleware and utilities
declare global {
  namespace Express {
    interface Request {
      user: Record<string, any>;
      token: string | null;
      pagination: PaginationOptions;
    }
  }
}

// Set up middlewares
app.set("port", PORT);
app.use(express.json({ limit: "10kb" }));
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());

connectDB();

// Base route for testing server
app.get("/", (_: Request, res: Response) => {
  return res.status(200).json({ msg: "Successfully running" });
});

// Define application routes
app.use("/api/v1", routers);

// Error handler middleware
app.use(errorHandler);

// Create HTTP server and integrate with Socket.io
const httpServer = http.createServer(app);
initializeSocket(httpServer); // Initialize Socket.io with HTTP server

// Start the server
httpServer.listen(parseInt(PORT, 10), "0.0.0.0", () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
