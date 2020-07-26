import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/JwtPayload";

export const generateJwt = (payload: JwtPayload) => {
  try {
    if (process.env.JWT_TOKEN) {
      const token = jwt.sign(payload, process.env.JWT_TOKEN);
      return token;
    } else {
      throw "Login Failed. Please Try Again";
    }
  } catch (err) {
    throw err;
  }
};

export const verifyJwt = (token: string): JwtPayload => {
  if (!process.env.JWT_TOKEN) {
    throw "A server error occured. Please try again later.";
  }
  try {
    const data = jwt.verify(token, process.env.JWT_TOKEN) as JwtPayload;
    return data;
  } catch (err) {
    throw err;
  }
};
