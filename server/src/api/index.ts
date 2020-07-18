import axios from "axios";
import { PowerStats, Biography, Appearance, Work, Connections, Image } from "src/types/apiResponses";

const accessToken = process.env.SUPERHERO_API_TOKEN;
const baseUrl = `https://superheroapi.com/api/${accessToken}`;

type User = {
response: string,
id: number,
name: string,
powerstats: PowerStats;
biography: Biography;
appearance: Appearance;
work: Work;
connections: Connections;
image: Image
}

export const getCharacterByID = async (id: number): Promise<User | null> => {
    try {
        const response = await axios.get<User>(`${baseUrl}/${id}`);
        return response.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};