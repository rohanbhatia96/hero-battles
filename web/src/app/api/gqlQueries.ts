import { gql } from "@apollo/client";

export const GET_TRENDING_CHARACTERS = gql`
  query GTC {
    getTrendingCharacters {
      name
      powerStats {
        power
        speed
        intelligence
      }
      alignment
      isTrending
    }
  }
`;
