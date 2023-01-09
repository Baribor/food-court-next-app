import bcrypt from "bcryptjs";
import crypto from "crypto";

export const generateHash = async (data: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
};

export const generateToken = () => {
  return crypto.randomBytes(16).toString("base64");
};
