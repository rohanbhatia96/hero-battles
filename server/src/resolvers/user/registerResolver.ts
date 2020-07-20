import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../../entities";

@Resolver()
export default class RegisterResolver {
  @Query(() => String)
  requiredQuery() {
    return "this is required but is never used";
  }

  @Mutation(() => User)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const user: User = await User.create({
      firstName,
      lastName,
      email,
      password,
    }).save();
    return user;
  }
}
