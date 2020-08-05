import { ApolloError } from "apollo-server-express";
import { Query, Resolver, Arg } from "type-graphql";
import { SearchCharacter } from "../../entities";
import { getCharactersBySearch } from "../../api";
import { BaseApiCharacter } from "../../types/apiResponses";

@Resolver()
export default class SearchResolver {
  @Query(() => [SearchCharacter])
  async getCharactersFromSearch(
    @Arg("searchTerm") searchTerm: string
  ): Promise<SearchCharacter[]> {
    try {
      let apiSearchResult: Array<BaseApiCharacter> = await getCharactersBySearch(
        searchTerm
      );
      let searchResult: Array<SearchCharacter> = [];
      let temp: SearchCharacter;
      apiSearchResult.forEach((character) => {
        temp = {
          apiId: +character.id,
          name: character.name,
          imageUrl: character.image.url,
          alignment: character.biography.alignment,
          publisher: character.biography.publisher,
          avergaeRating: 60,
        };
        searchResult.push(temp);
      });
      return searchResult;
    } catch (err) {
      throw new ApolloError(err);
    }
  }
}
