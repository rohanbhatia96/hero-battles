import { gql } from "@apollo/client";

export const GET_TRENDING_CHARACTERS = gql`
  query GTC {
    getTrendingCharacters {
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
