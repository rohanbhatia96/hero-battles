export type ApiPowerStats = {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
};

export type ApiBiography = {
  name: string;
  "full-name": string;
  "alter-egos": string | string[];
  aliases: string | string[];
  "place-of-birth": string;
  "first-appearance": string;
  publisher: string;
  alignment: string;
};

export type ApiAppearance = {
  gender: string;
  race: string;
  height: string[];
  weight: string[];
  "eye-color": string;
  "hair-color": string;
};

export type ApiWork = {
  occupation: string;
  base: string;
};

export type ApiConnections = {
  "group-affiliation": string;
  relatives: string;
};

export type ApiImage = {
  url: string;
};

export type BaseApiCharacter = {
  id: string;
  name: string;
  powerstats: ApiPowerStats;
  biography: ApiBiography;
  appearance: ApiAppearance;
  work: ApiWork;
  connections: ApiConnections;
  image: ApiImage;
};

export interface ApiCharacter extends BaseApiCharacter {
  response: string;
}

export interface SearchResult {
  response: string;
  "results-for": string;
  results: Array<BaseApiCharacter>;
}
