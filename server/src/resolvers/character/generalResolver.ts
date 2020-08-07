import { ApolloError } from "apollo-server-express";
import { Query, Resolver, Arg } from "type-graphql";
import { Character } from "../../entities";
import { ValidateArgs } from "../../middlewares/ValidateArguments";
import { getSingleCharacterSchema } from "../../schemas/characterSchemas";
import { ApiCharacter } from "../../types/apiResponses";
import { getCharacterByID } from "../../api";
import { extract } from "../../utils/extractFromApiResponse";

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
  @ValidateArgs(getSingleCharacterSchema)
  async getSingleCharacter(
    @Arg("id", { nullable: true }) id?: number,
    @Arg("apiId", { nullable: true }) apiId?: number
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
      } else if (apiId) {
        let apiResponse: ApiCharacter = await getCharacterByID(apiId);
        let {
          characterStats,
          characterAppearance,
          characterBio,
          characterWork,
          characterConnections,
        } = extract(apiResponse);
        let c: Character = await Character.create({
          apiId: +apiResponse.id,
          name: apiResponse.name,
          realName: apiResponse.biography["full-name"],
          imageUrl: apiResponse.image.url,
          alignment: apiResponse.biography.alignment,
          publisher: apiResponse.biography.publisher,
          isTrending: false,
          powerStats: characterStats,
          appearance: characterAppearance,
          work: characterWork,
          biography: characterBio,
          connections: characterConnections,
        }).save();
        return c;
      } else {
        throw "Character Id Incorrect";
      }
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
