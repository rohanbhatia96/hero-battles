export type PowerStats = {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
};

export type Biography = {
  name: string;
  'full-name': string;
  'alter-egos': string | string[];
  aliases: string | string[];
  'place-of-birth': string;
  'first-appearance': string;
  publisher: string;
  alignment: string;
};

export type Appearance = {
  gender: string;
  race: string;
  height: string[];
  weight: string[];
  'eye-color': string;
  'hair-color': string;
};

export type Work = {
  occupation: string;
  base: string;
};

export type Connections = {
  'group-affiliation': string;
  relatives: string;
};

export type Image = {
  url: string;
};

export interface ApiCharacter {
  response: string;
  id: number;
  name: string;
  powerstats: PowerStats;
  biography: Biography;
  appearance: Appearance;
  work: Work;
  connections: Connections;
  image: Image;
}
