import { Request, Response } from "express";
import genarateToken from "../utils/token.util";
import getUserData from "../utils/user.util";
import User, { IUser } from "../models/User.model";
import verifyPassword from "../utils/verifyPassword.util";

type USER_RESPONSE = {
  id: string;
  name: string;
  email: string;
  finishedProfile: boolean;
  role: "job_seeker" | "recruiter";
};

const authController = {
  signup: async (req: Request, res: Response) => {
    try {
      const { name, email, password, role = null } = req.body;

      if (!(name && email && password)) {
        return res.status(400).json({ error: "Please fill all the details" });
      }
      const isExist = await getUserData(email);
      if (isExist !== null) {
        return res
          .status(400)
          .json({ error: "This mail id is already exist." });
      }
      const newUser = new User({ name, email, password, role });
      await newUser.save();
      const user: USER_RESPONSE = {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        finishedProfile: newUser.finishedProfile,
        id: newUser.id,
      };
      const token = await genarateToken({
        email: newUser.email,
        id: newUser.id,
      });
      return res.status(200).json({
        user,
        token,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: error.message });
      }
    }
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ error: "Please fill all the details" });
    }
    const isExist = await getUserData(email);
    if (isExist === null) {
      return res.status(400).json({ error: "This mailid doen't exists" });
    }
    const isVerified = await verifyPassword(password, isExist.password);
    if (!isVerified) {
      return res
        .status(401)
        .json({ error: "EmailId or password doesn't match" });
    }
    const user: USER_RESPONSE = {
      name: isExist.name,
      email: isExist.email,
      role: isExist.role,
      finishedProfile: isExist.finishedProfile,
      id: isExist.id,
    };
    const token = await genarateToken({ email: isExist.email, id: isExist.id });
    return res.status(200).json({
      user,
      token,
    });
  },
};

export default authController;
