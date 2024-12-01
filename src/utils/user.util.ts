import User from "../models/User.model";

const getUserData = async (email: string) => {
  const isExist = await User.findOne({ email });
  return isExist ?? null;
};

export default getUserData;
