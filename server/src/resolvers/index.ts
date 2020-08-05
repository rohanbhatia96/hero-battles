import RegisterResolver from "./user/registerResolver";
import LoginResolver from "./user/loginResolver";
import TrendingCharactersResolver from "./character/trendingResolver";
import GeneralCharacterResolver from "./character/generalResolver";
import SearchResolver from "./character/searchResolver";
import GeneralUserResolver from "./user/generalResolver";

export const resolvers = [
  RegisterResolver,
  TrendingCharactersResolver,
  GeneralCharacterResolver,
  LoginResolver,
  GeneralUserResolver,
  SearchResolver,
] as const;
