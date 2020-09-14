import {
  SET_LOGIN_STATE,
  SET_AUTH_TOKEN,
  SET_REFETCH_USER,
} from "../../actions";

interface UpdateLoginState {
  type: typeof SET_LOGIN_STATE;
  payload: boolean;
}

interface UpdateAuthToken {
  type: typeof SET_AUTH_TOKEN;
  payload: string;
}

interface UpdateShouldRefetchUser {
  type: typeof SET_REFETCH_USER;
  payload: boolean;
}

export type LoginActionTypes = UpdateLoginState | UpdateAuthToken;
export type ShouldRefetchUserActionType = UpdateShouldRefetchUser;
