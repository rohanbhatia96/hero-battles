import { ApolloError } from "apollo-server-express";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities";
import { isAuth } from "../../middlewares/isAuth";
import { IContext } from "../../types/IContext";

@Resolver()
export default class GeneralResolver {
  @Query(() => User)
  @UseMiddleware(isAuth)
  async getAllUserDetails(@Ctx() context: IContext): Promise<User> {
    try {
      const user: User | undefined = await User.findOne({
        where: { id: context.userId },
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
