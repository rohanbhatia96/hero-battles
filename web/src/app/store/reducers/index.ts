import { combineReducers } from "redux";
import loginStateReducer from "./loginStateReducer";

export const combinedReducers = combineReducers({
  loginStateReducer,
});
