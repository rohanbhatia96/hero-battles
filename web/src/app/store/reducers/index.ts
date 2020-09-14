import { combineReducers } from "redux";
import loginStateReducer from "./loginStateReducer";
import shouldRefetchUserReducer from "./shouldRefetchUserReducer";

export const combinedReducers = combineReducers({
  loginStateReducer,
  shouldRefetchUserReducer,
});
