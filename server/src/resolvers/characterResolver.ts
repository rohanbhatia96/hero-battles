import { Resolver, Query } from "type-graphql";
import { Character } from "../entities/character";
//import { CharacterAlignment } from "../enums";
import {getCharacterByID} from '../api/';

@Resolver()
export default class CharacterResolver {
  @Query(() => [Character])
  async getTrendingHeroes() {
    let a: number;
    a = Math.floor(Math.random() * 700);
    let response = await getCharacterByID(a);
    console.log(response);
    let c = Character.create({
      name: "as",
      realName: "asss",
    });
    return [c];
  }
}