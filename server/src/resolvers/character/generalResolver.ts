import { ApolloError } from "apollo-server-express";
import { Query, Resolver, Arg } from "type-graphql";
import { Character } from "../../entities";

@Resolver()
export default class MainResolver {
  @Query(() => [Character])
  async getAllCharacters(): Promise<Character[]> {
    try {
      const chars = await Character.find({
        relations: [
          "powerStats",
          "work",
          "appearance",
          "connections",
          "biography",
        ],
      });
      return chars;
    } catch (err) {
      throw new ApolloError(err);
    }
  }

  @Query(() => Character)
  async getSingleCharacter(@Arg("id") id: number): Promise<Character> {
    try {
      const char = await Character.findOne({
        where: { id },
        relations: [
          "powerStats",
          "work",
          "appearance",
          "connections",
          "biography",
        ],
      });
      if (char) {
        return char;
      } else {
        throw "Character Id Incorrect";
      }
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
