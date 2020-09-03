import { ApolloError } from "apollo-server-express";
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities";
import { isAuth } from "../../middlewares/isAuth";
import { IContext } from "../../types/IContext";
import { ValidateArgs } from "../../middlewares/ValidateArguments";
import { isCharacterAddedSchema } from "../../schemas/userSchemas";

@Resolver()
export default class GeneralResolver {
  @Query(() => User)
  @UseMiddleware(isAuth)
  async getAllUserDetails(@Ctx() context: IContext): Promise<User> {
    try {
      const user: User | undefined = await User.findOne({
        where: { id: context.userId },
        join: {
          alias: "user",
          leftJoinAndSelect: {
            characters: "user.characters",
            powerStats: "characters.powerStats",
          },
        },
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
  @ValidateArgs(isCharacterAddedSchema)
  async isCharacterAdded(
    @Ctx() context: IContext,
    @Arg("id", { nullable: true }) id?: number,
    @Arg("apiId", { nullable: true }) apiId?: number
  ): Promise<Boolean> {
    try {
      let finalId: number;
      let finalKey: "id" | "apiId";
      if (id) {
        finalId = id;
        finalKey = "id";
      } else if (apiId) {
        finalId = apiId;
        finalKey = "apiId";
      } else {
        throw "Id not found";
      }
      const user: User | undefined = await User.findOne({
        where: { id: context.userId },
        relations: ["characters"],
      });
      if (user && user.characters) {
        const char = user.characters.filter((c) => c[finalKey] === finalId);
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
