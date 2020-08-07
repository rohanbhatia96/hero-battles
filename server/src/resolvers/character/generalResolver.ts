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
  async getSingleCharacter(
    @Arg("id", { defaultValue: null }) id: number,
    @Arg("apiId", { defaultValue: null }) apiId: number
  ): Promise<Character> {
    try {
      let finalId: number | null = null;
      let finalKey: string = "";
      if (id) {
        finalId = id;
        finalKey = "id";
      } else if (apiId) {
        finalId = apiId;
        finalKey = "apiId";
      } else {
        throw "No valid Id provided";
      }
      const char = await Character.findOne({
        where: { [finalKey]: finalId },
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
