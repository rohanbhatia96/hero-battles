import RegisterResolver from "./registerResolver";
import CharacterResolver from './characterResolver';

export const resolvers = [RegisterResolver, CharacterResolver] as const;
