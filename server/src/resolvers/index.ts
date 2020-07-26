import RegisterResolver from "./user/registerResolver";
import LoginResolver from "./user/loginResolver";
import TrendingCharactersResolver from "./character/trendingResolver";
import GeneralCharacterResolver from "./character/generalResolver";
import GeneralUserResolver from "./user/generalResolver";

export const resolvers = [
  RegisterResolver,
  TrendingCharactersResolver,
  GeneralCharacterResolver,
  LoginResolver,
  GeneralUserResolver,
] as const;
