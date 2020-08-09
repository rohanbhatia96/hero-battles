import { SET_AUTH_TOKEN, SET_LOGIN_STATE } from "../actions";
import { LoginState } from "../types/reducers";
import { LoginActionTypes } from "../types/actions";

const initialState: LoginState = {
  isLoggedIn: null,
  authToken: null,
};

const loginStateReducer = (
  state = initialState,
  action: LoginActionTypes
): LoginState => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      state = {
        ...state,
        isLoggedIn: action.payload,
      };
      break;
    case SET_AUTH_TOKEN:
      state = {
        ...state,
        authToken: action.payload,
      };
      break;
  }
  return state;
};

export default loginStateReducer;
