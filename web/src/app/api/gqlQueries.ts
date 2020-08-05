import { gql } from "@apollo/client";

export const GET_TRENDING_CHARACTERS = gql`
  query GTC {
    getTrendingCharacters {
      id
      name
      alignment
      imageUrl
      publisher
      powerStats {
        power
        speed
        intelligence
        combat
        durability
        strength
      }
    }
  }
`;

export const GET_SINGLE_CHARACTER = gql`
  query getSingleCharacter($id: Float!) {
    getSingleCharacter(id: $id) {
      name
      alignment
      powerStats {
        power
        speed
        intelligence
        combat
        durability
        strength
      }
    }
  }
`;

export const GET_SEARCH_RESULT = gql`
  query getCharactersFromSearch($searchTerm: String!) {
    getCharactersFromSearch(searchTerm: $searchTerm) {
      averageRating
      name
      alignment
      apiId
    }
  }
`;
