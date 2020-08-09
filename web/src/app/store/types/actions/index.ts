import { SET_LOGIN_STATE, SET_AUTH_TOKEN } from "../../actions";

interface UpdateLoginState {
  type: typeof SET_LOGIN_STATE;
  payload: boolean;
}

interface UpdateAuthToken {
  type: typeof SET_AUTH_TOKEN;
  payload: string;
}

export type LoginActionTypes = UpdateLoginState | UpdateAuthToken;
