import { SET_AUTH_TOKEN, SET_LOGIN_STATE } from "../actions";
import { LoginState } from "../types/reducers";
import { LoginActionTypes } from "../types/actions";

const initialState: LoginState = {
  isLoggedIn: false,
  authToken: null,
};

const loginStateReducer = (
  state = initialState,
  action: LoginActionTypes
): LoginState => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    default:
      return state;
  }
};

export default loginStateReducer;
