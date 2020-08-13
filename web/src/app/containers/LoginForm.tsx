import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/types/reducers";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  const dispatch = useDispatch();
  return (
    <>
      <p>Login Page</p>
      {isLoggedIn && <p>isLoggedIn: {isLoggedIn.toString()}</p>}
      <button
        onClick={() => {
          dispatch({ type: "SET_LOGIN_STATE", payload: true });
        }}
      >
        Test
      </button>
      <Link to="/register">Go To Register</Link>
    </>
  );
};

export default LoginForm;
