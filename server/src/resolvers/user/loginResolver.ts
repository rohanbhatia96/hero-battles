import bcrypt from "bcrypt";
import { Arg, Query, Resolver } from "type-graphql";
import { User } from "../../entities";
import { ApolloError } from "apollo-server-express";

@Resolver()
export default class LoginResolver {
  @Query(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    try {
      const user: User | undefined = await User.findOne({
        where: { email },
      });
      if (user) {
        let isPasswordCorrect: Boolean = await bcrypt.compare(
          password,
          user.password
        );
        if (isPasswordCorrect) {
          return user;
        } else {
          throw "Password Incorrect";
        }
      }
      throw "User not found";
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
