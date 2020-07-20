import RegisterResolver from "./user/registerResolver";
import TrendingCharactersResolver from "./character/trendingResolver";
import MainCharacterResolver from "./character/mainResolver";

export const resolvers = [
  RegisterResolver,
  TrendingCharactersResolver,
  MainCharacterResolver,
] as const;
