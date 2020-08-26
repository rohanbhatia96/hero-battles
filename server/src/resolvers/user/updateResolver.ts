import { ApolloError } from "apollo-server-express";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User, Character } from "../../entities";
import { isAuth } from "../../middlewares/isAuth";
import { ValidateArgs } from "../../middlewares/ValidateArguments";
import { addCharToUserSchema } from "../../schemas/updateUserSchemas";
import { IContext } from "../../types/IContext";

@Resolver()
export default class UpdateResolver {
  @Query(() => String)
  requiredQuery() {
    return "this is a required query but is never used";
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @ValidateArgs(addCharToUserSchema)
  async addCharacterToUser(
    @Arg("charId") charId: number,
    @Ctx() context: IContext
  ): Promise<Boolean> {
    try {
      const user: User | undefined = await User.findOne({
        where: { id: context.userId },
        relations: ["characters"],
      });
      if (user) {
        const char: Character | undefined = await Character.findOne({
          where: { id: charId },
        });
        if (char) {
          user.characters = [...user.characters, char];
          await user.save();
          return true;
        } else {
          throw "Character Id is invalid";
        }
      } else {
        throw "Unexpected error occured.";
      }
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
