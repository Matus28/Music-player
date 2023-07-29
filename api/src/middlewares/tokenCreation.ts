import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

type Payload = {
  userId: number;
  username: string;
  email: string;
};

export const createToken = (
  id: number,
  username: string,
  email: string
): string => {
  const payload: Payload = {
    userId: id,
    username: username,
    email: email,
  };
  return jwt.sign(payload, process.env.SECRET as string, { expiresIn: "3d" });
};
