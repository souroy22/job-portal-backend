import bcrypt from "bcrypt";

const verifyPassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export default verifyPassword;
