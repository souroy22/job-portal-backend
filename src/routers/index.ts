import express from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import jobSeekerRouter from "./jobSeeker.route";
import recruiterRouter from "./recruiter.route";
import companyRouter from "./company.router";
import jobRouter from "./job.router";
import applicationRouter from "./application.router";

const routers = express.Router();

routers.use("/auth", authRouter);
routers.use("/user", userRouter);
routers.use("/profile/candidate", jobSeekerRouter);
routers.use("/profile/company", recruiterRouter);
routers.use("/company", companyRouter);
routers.use("/job", jobRouter);
routers.use("/application", applicationRouter);

export default routers;
