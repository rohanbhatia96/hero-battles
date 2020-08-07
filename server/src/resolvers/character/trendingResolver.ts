import { ApolloError } from "apollo-server-express";
import { ApiCharacter } from "../../types/apiResponses";
import { Mutation, Query, Resolver } from "type-graphql";
import { getCharacterByID } from "../../api";
import { Character } from "../../entities";
import { findAverageRating } from "../../utils/findAverageRating";
import { extract } from "../../utils/extractFromApiResponse";

@Resolver()
export default class TrendingResolver {
  @Query(() => [Character])
  async getTrendingCharacters(): Promise<Character[]> {
    try {
      const trendingCharacters = await Character.find({
        where: { isTrending: true },
        relations: [
          "powerStats",
          "work",
          "appearance",
          "connections",
          "biography",
        ],
      });
      return trendingCharacters;
    } catch (err) {
      throw new ApolloError(err);
    }
  }

  @Mutation(() => [Character])
  async updateTrendingCharacters(): Promise<Character[]> {
    try {
      await Character.delete({
        isTrending: true,
      });
      let randomIds: number[] = [];
      let idCount: number = 0;
      let randomNum: number;
      let trendingCharacters: Character[] = [];
      let singleResponse: ApiCharacter;
      let averageRating = 0;
      let c: Character;
      while (idCount < 14) {
        randomNum = Math.floor(Math.random() * 700);
        if (!randomIds.includes(randomNum)) {
          singleResponse = await getCharacterByID(randomNum);
          averageRating = findAverageRating(singleResponse.powerstats);
          if (averageRating > 75) {
            let {
              characterStats,
              characterAppearance,
              characterBio,
              characterWork,
              characterConnections,
            } = extract(singleResponse);
            c = await Character.create({
              apiID: +singleResponse.id,
              name: singleResponse.name,
              realName: singleResponse.biography["full-name"],
              imageUrl: singleResponse.image.url,
              alignment: singleResponse.biography.alignment,
              publisher: singleResponse.biography.publisher,
              isTrending: true,
              powerStats: characterStats,
              appearance: characterAppearance,
              work: characterWork,
              biography: characterBio,
              connections: characterConnections,
            }).save();
            idCount++;
            trendingCharacters.push(c);
          }
          randomIds.push(randomNum);
        }
      }
      return trendingCharacters;
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
