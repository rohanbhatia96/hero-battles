import { MiddlewareFn } from "type-graphql";
import { IContext } from "../types/IContext";
import { ApolloError } from "apollo-server-express";
import { verifyJwt } from "../utils/jwtHandler";
import { User } from "../entities";

export const isAuth: MiddlewareFn<IContext> = async ({ context }, next) => {
  const { req } = context;
  try {
    const token: string | undefined = req.headers.authorization;
    if (!token) {
      throw "Invalid authorization header. Please provide valid autorization token";
    }
    const jwtPayload = verifyJwt(token);
    const user: User | undefined = await User.findOne({
      where: { id: jwtPayload.id },
    });
    if (!user) {
      throw "Authorization token expired. Please login again";
    }
    return next();
  } catch (err) {
    throw new ApolloError(err);
  }
};
