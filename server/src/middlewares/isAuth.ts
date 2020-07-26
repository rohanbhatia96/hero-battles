import { MiddlewareFn } from "type-graphql";
import { IContext } from "../types/IContext";
import jwt from "jsonwebtoken";
import { ApolloError } from "apollo-server-express";

export const isAuth: MiddlewareFn<IContext> = ({ context }, next) => {
  const { req } = context;
  try {
    const jwt_token: string | undefined = req.headers.authorization;
    let decoded = null;
    if (jwt_token && process.env.JWT_TOKEN) {
      decoded = jwt.verify(jwt_token, process.env.JWT_TOKEN);
    }
    console.log(decoded);
  } catch (err) {
    throw new ApolloError("Authentication Failed");
  }
  return next();
};
