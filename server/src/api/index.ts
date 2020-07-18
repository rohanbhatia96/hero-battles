import axios from "axios";
import { ApiCharacter } from "src/types/apiResponses";

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
