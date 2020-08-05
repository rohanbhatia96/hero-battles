export type PowerStats = {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
};

export type Biography = {
  name: string;
  "full-name": string;
  "alter-egos": string | string[];
  aliases: string | string[];
  "place-of-birth": string;
  "first-appearance": string;
  publisher: string;
  alignment: string;
};

export type Appearance = {
  gender: string;
  race: string;
  height: string[];
  weight: string[];
  "eye-color": string;
  "hair-color": string;
};

export type Work = {
  occupation: string;
  base: string;
};

export type Connections = {
  "group-affiliation": string;
  relatives: string;
};

export type Image = {
  url: string;
};

export type BaseApiCharacter = {
  id: string;
  name: string;
  powerstats: PowerStats;
  biography: Biography;
  appearance: Appearance;
  work: Work;
  connections: Connections;
  image: Image;
};

export interface ApiCharacter extends BaseApiCharacter {
  response: string;
}

export interface SearchResult {
  response: string;
  "results-for": string;
  results: Array<BaseApiCharacter>;
}
