import { ApolloError } from "apollo-server-express";
import { Query, Resolver, UseMiddleware, Ctx } from "type-graphql";
import { User } from "../../entities";
import { isAuth } from "../../middlewares/isAuth";
import { verifyJwt } from "../../utils/jwtHandler";
import { IContext } from "../../types/IContext";

@Resolver()
export default class GeneralResolver {
  @Query(() => User)
  @UseMiddleware(isAuth)
  async getAllUserDetails(@Ctx() context: IContext): Promise<User> {
    try {
      const token = context.req.headers.authorization;
      if (!token) {
        throw "Invalid authorization token.";
      }
      const jwtPayload = verifyJwt(token);
      const user: User | undefined = await User.findOne({
        where: { id: jwtPayload.id },
      });
      if (user) {
        return user;
      } else {
        throw "Unexpected error occured.";
      }
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
