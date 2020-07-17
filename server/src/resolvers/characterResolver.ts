import { Resolver, Query } from "type-graphql";
import { Character } from "../entities/character";
//import { CharacterAlignment } from "../enums";
import axios from "axios";

@Resolver()
export default class CharacterResolver {
  @Query(() => [Character])
  async getTrendingHeroes() {
    let a: number;
    //let b: number;
    a = Math.floor(Math.random() * 700);
    // b = Math.floor(Math.random() * 700);
    axiosGet(`https://superheroapi.com/api/1613074412200037/${a}`);
    //axiosGet(`https://superheroapi.com/api/1613074412200037/${b}`);
    axiosGet(`https://superheroapi.com/api/1613074412200037/search/bat`);
    let c = Character.create({
      name: "as",
      realName: "asss",
    });
    return [c];
  }
}

const axiosGet = async (url: string) => {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.log("error");
  }
};
