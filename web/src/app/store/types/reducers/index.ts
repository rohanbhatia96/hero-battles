import { combinedReducers } from "../../reducers";

export type RootState = ReturnType<typeof combinedReducers>;
export interface LoginState {
  isLoggedIn: boolean | null;
  authToken: string | null;
}
