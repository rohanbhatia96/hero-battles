import { ApolloError } from "apollo-server-express";
import { ApiCharacter } from "src/types/apiResponses";
import { Query, Resolver } from "type-graphql";
import { getCharacterByID } from "../api/";
import { Character } from "../entities";

@Resolver()
export default class CharacterResolver {
  @Query(() => [Character])
  async getTrendingHeroes(): Promise<Character[]> {
    let trendingHeroes: Character[] = [];
    let a, i: number;
    let characterRequests: Promise<ApiCharacter>[] = [];
    for (i = 0; i < 15; i++) {
      a = Math.floor(Math.random() * 700);
      characterRequests.push(getCharacterByID(a));
    }
    try {
      let response: ApiCharacter[] = await Promise.all(characterRequests);
      let c: Character;
      for (i = 0; i < response.length; i++) {
        c = Character.create({
          apiID: response[i].id,
          name: response[i].name,
          realName: response[i].biography["full-name"],
          imageUrl: response[i].image.url,
          alignment: response[i].biography.alignment,
          publisher: response[i].biography.publisher,
        });
        trendingHeroes.push(c);
      }
      return trendingHeroes;
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
