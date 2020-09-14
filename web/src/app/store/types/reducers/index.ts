import { combinedReducers } from "../../reducers";

export type RootState = ReturnType<typeof combinedReducers>;
export interface LoginState {
  isLoggedIn: boolean;
  authToken: string | null;
}
export interface ShouldRefetchUserState {
  shouldRefetchUser: boolean;
}
