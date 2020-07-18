import { CharacterAlignment } from '../enums'

export type PowerStats = {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number
}

export type Biography = {
    name: string;
    fullName: string;
    alterEgos: string | string[];
    aliases: string | string[];
    birthPlace: string;
    firstAppearance: string;
    publisher: string;
    alignment: CharacterAlignment
}

export type Appearance = {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    eyeColor: string;
    hairColor: string
}

export type Work = {
    occupation: string;
    base: string;
}

export type Connections = {
    groupAffiliation: string;
    relatives: string;
}

export type Image = {
    url: string;
}