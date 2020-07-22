import { ApolloError } from "apollo-server-express";
import { ApiCharacter } from "../../types/apiResponses";
import { Mutation, Query, Resolver } from "type-graphql";
import { getCharacterByID } from "../../api";
import { Character, PowerStats } from "../../entities";

@Resolver()
export default class TrendingResolver {
  @Query(() => [Character])
  async getTrendingCharacters(): Promise<Character[]> {
    try {
      const trendingCharacters = await Character.find({
        where: { isTrending: true },
        relations: ["powerStats"],
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
      let avgSingleStats = 0;
      let ps: PowerStats;
      let c: Character;
      while (idCount < 15) {
        randomNum = Math.floor(Math.random() * 700);
        if (!randomIds.includes(randomNum)) {
          singleResponse = await getCharacterByID(randomNum);
          avgSingleStats =
            (Number(singleResponse.powerstats.intelligence) +
              Number(singleResponse.powerstats.combat) +
              Number(singleResponse.powerstats.durability) +
              Number(singleResponse.powerstats.speed) +
              Number(singleResponse.powerstats.strength) +
              Number(singleResponse.powerstats.power)) /
            6;
          if (avgSingleStats > 55) {
            randomIds.push(randomNum);
            idCount++;
            ps = PowerStats.create({
              intelligence: +singleResponse.powerstats.intelligence | 0,
              strength: +singleResponse.powerstats.strength | 0,
              speed: +singleResponse.powerstats.speed | 0,
              durability: +singleResponse.powerstats.durability | 0,
              power: +singleResponse.powerstats.power | 0,
              combat: +singleResponse.powerstats.combat | 0,
            });
            c = await Character.create({
              apiID: +singleResponse.id,
              name: singleResponse.name,
              realName: singleResponse.biography["full-name"],
              imageUrl: singleResponse.image.url,
              alignment: singleResponse.biography.alignment,
              publisher: singleResponse.biography.publisher,
              isTrending: true,
              powerStats: ps,
            }).save();
            trendingCharacters.push(c);
          }
        }
      }
      return trendingCharacters;
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
