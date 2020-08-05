import axios from "axios";
import {
  ApiCharacter,
  SearchResult,
  BaseApiCharacter,
} from "../types/apiResponses";

const accessToken = process.env.SUPERHERO_API_TOKEN;
const baseUrl = `https://superheroapi.com/api/${accessToken}`;

export const getCharacterByID = async (id: number): Promise<ApiCharacter> => {
  try {
    const response = await axios.get<ApiCharacter>(`${baseUrl}/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw "Can't connect to Superhero API";
  }
};

export const getCharactersBySearch = async (
  searchTerm: string
): Promise<BaseApiCharacter[]> => {
  try {
    const response = await axios.get<SearchResult>(
      `${baseUrl}/search/${searchTerm}`
    );
    if (response.data.response === "success") {
      return response.data.results;
    } else {
      throw "Can't find superhero with this name :(";
    }
  } catch (err) {
    throw err;
  }
};
