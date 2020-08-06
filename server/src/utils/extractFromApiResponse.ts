import {
  CharacterAppearance,
  CharacterBio,
  CharacterWork,
  PowerStats,
  CharacterConnections,
} from "../entities";
import { ApiCharacter } from "../types/apiResponses";

type returnType = {
  characterStats: PowerStats;
  characterAppearance: CharacterAppearance;
  characterBio: CharacterBio;
  characterWork: CharacterWork;
  characterConnections: CharacterConnections;
};

export const extract = (apiCharacter: ApiCharacter): returnType => {
  let characterStats: PowerStats;
  let characterAppearance: CharacterAppearance;
  let characterBio: CharacterBio;
  let characterWork: CharacterWork;
  let characterConnections: CharacterConnections;
  let temp: any;

  temp = apiCharacter.powerstats;

  characterStats = PowerStats.create({
    intelligence: +temp.intelligence | 0,
    strength: +temp.strength | 0,
    speed: +temp.speed | 0,
    durability: +temp.durability | 0,
    power: +temp.power | 0,
    combat: +temp.combat | 0,
  });

  temp = apiCharacter.appearance;

  characterAppearance = CharacterAppearance.create({
    gender: temp.gender.length > 0 ? temp.gender : "unknown",
    race: temp.race.length > 0 ? temp.race : "unknown",
    height: temp.height[0].length > 0 ? temp.height[0] : "unknown",
    weight: temp.weight[0].length > 0 ? temp.weight[0] : "unknown",
    eyeColor: temp["eye-color"].length > 0 ? temp["eye-color"] : "unknown",
    hairColor: temp["hair-color"].length > 0 ? temp["hair-color"] : "unknown",
  });

  temp = apiCharacter.biography;
  let alterEgosString: string = "";
  let aliasesString: string = "";

  if (Array.isArray(temp["alter-egos"])) {
    alterEgosString = flattenArray(temp["alter-egos"]);
  } else {
    alterEgosString = temp["alter-egos"];
  }

  if (Array.isArray(temp.aliases)) {
    aliasesString = flattenArray(temp.aliases);
  } else {
    aliasesString = temp.aliases;
  }

  characterBio = CharacterBio.create({
    alterEgos: alterEgosString.length > 0 ? alterEgosString : "unknown",
    aliases: aliasesString.length > 0 ? aliasesString : "unknown",
    placeOfBirth:
      temp["place-of-birth"].length > 0 ? temp["place-of-birth"] : "unknown",
    firstAppearance:
      temp["first-appearance"].length > 0
        ? temp["first-appearance"]
        : "unknown",
  });

  temp = apiCharacter.work;

  characterWork = CharacterWork.create({
    occupation: temp.occupation.length > 0 ? temp.occupation : "unknown",
    base: temp.base.length > 0 ? temp.base : "unknown",
  });

  temp = apiCharacter.connections;

  characterConnections = CharacterConnections.create({
    groupAffiliations:
      temp["group-affiliation"].length > 0
        ? temp["group-affiliation"]
        : "unknown",
    relatives: temp.relatives.length > 0 ? temp.relatives : "unknown",
  });

  return {
    characterStats,
    characterAppearance,
    characterBio,
    characterWork,
    characterConnections,
  };
};

const flattenArray = (arr: string[]): string => {
  return arr.join(" ");
};
