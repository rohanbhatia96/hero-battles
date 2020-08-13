import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcrypt from "bcrypt";
import { User } from "../../entities";
import { ApolloError } from "apollo-server-express";
import { ValidateArgs } from "../../middlewares/ValidateArguments";
import { registerUserSchema } from "../../schemas/userSchemas";

@Resolver()
export default class RegisterResolver {
  @Query(() => String)
  requiredQuery() {
    return "this is a required query but is never used";
  }

  @Mutation(() => User)
  @ValidateArgs(registerUserSchema)
  async register(
    @Arg("name") name: string,
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    try {
      let encryptedPassword = await bcrypt.hash(password, 10);
      const user: User = await User.create({
        name,
        username,
        email,
        password: encryptedPassword,
      }).save();
      return user;
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
