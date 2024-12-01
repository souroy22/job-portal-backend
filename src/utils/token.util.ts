import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export type USER_TYPE = {
  email: string;
  id: Types.ObjectId;
};

const genarateToken = async (user: USER_TYPE) => {
  const token = await jwt.sign({ user }, process.env.SECRET_KEY || "", {
    expiresIn: "7d",
  });
  return token;
};

export default genarateToken;
