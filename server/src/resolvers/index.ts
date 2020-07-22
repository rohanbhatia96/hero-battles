import RegisterResolver from "./user/registerResolver";
import LoginResolver from "./user/loginResolver";
import TrendingCharactersResolver from "./character/trendingResolver";
import MainCharacterResolver from "./character/generalResolver";

export const resolvers = [
  RegisterResolver,
  TrendingCharactersResolver,
  MainCharacterResolver,
  LoginResolver,
] as const;
