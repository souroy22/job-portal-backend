import express from "express";
import authRouter from "./auth.router";

const routers = express.Router();

routers.use("/auth", authRouter);

export default routers;
