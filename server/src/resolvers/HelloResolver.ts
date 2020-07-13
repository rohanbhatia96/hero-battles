import { Resolver, Query, Mutation, Arg } from "type-graphql";
import {User} from '../entities/User';

@Resolver()
export class HelloResolver {
  @Query(()=>String)
  async hello() {
    return "hello world";
  }

  @Mutation(() => User)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    }).save();
    return user;
  }
}
