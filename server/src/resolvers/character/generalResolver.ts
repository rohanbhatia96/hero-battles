import { ApolloError } from "apollo-server-express";
import { Query, Resolver } from "type-graphql";
import { Character } from "../../entities";

@Resolver()
export default class MainResolver {
  @Query(() => [Character])
  async getAllCharacters(): Promise<Character[]> {
    try {
      const chars = await Character.find({
        relations: ["powerStats"],
      });
      return chars;
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
