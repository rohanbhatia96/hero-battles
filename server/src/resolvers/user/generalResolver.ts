import { ApolloError } from "apollo-server-express";
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
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
        relations: ["characters"],
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

  @Query(() => Boolean)
  @UseMiddleware(isAuth)
  async isCharacterAdded(
    @Ctx() context: IContext,
    @Arg("characterId") characterId: Number
  ): Promise<Boolean> {
    try {
      const user: User | undefined = await User.findOne({
        where: { id: context.userId },
        relations: ["characters"],
      });
      if (user && user.characters) {
        const char = user.characters.filter((c) => c.id === characterId);
        if (char.length === 1) {
          return true;
        } else {
          return false;
        }
      } else {
        throw "Unexpected error occured.";
      }
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
