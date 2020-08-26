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
      id
      name
      realName
      imageUrl
      alignment
      publisher
      isTrending
      powerStats {
        power
        speed
        intelligence
        combat
        durability
        strength
      }
      appearance {
        gender
        race
        height
        weight
        eyeColor
        hairColor
      }
      work {
        occupation
        base
      }
      connections {
        groupAffiliations
        relatives
      }
      biography {
        alterEgos
        aliases
        placeOfBirth
        firstAppearance
      }
    }
  }
`;

export const GET_SINGLE_CHARACTER_FROM_API_ID = gql`
  query getSingleCharacterFromApiId($apiId: Float!) {
    getSingleCharacter(apiId: $apiId) {
      id
      name
      realName
      imageUrl
      alignment
      publisher
      isTrending
      powerStats {
        power
        speed
        intelligence
        combat
        durability
        strength
      }
      appearance {
        gender
        race
        height
        weight
        eyeColor
        hairColor
      }
      work {
        occupation
        base
      }
      connections {
        groupAffiliations
        relatives
      }
      biography {
        alterEgos
        aliases
        placeOfBirth
        firstAppearance
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

export const REGISTER_USER = gql`
  mutation register(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      authToken
      username
    }
  }
`;

export const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(password: $password, email: $email) {
      authToken
      username
    }
  }
`;

export const ADD_CHAR_TO_USER = gql`
  mutation addCharToUser($charId: Float!) {
    addCharacterToUser(charId: $charId)
  }
`;

export const GET_USER_DETAILS = gql`
  query getAllUserDetails {
    getAllUserDetails {
      name
      username
      email
      characters {
        name
        imageUrl
      }
    }
  }
`;
