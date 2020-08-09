import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/types/reducers";

const Register: React.FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  return (
    <>
      <p>Register Page</p>
      {isLoggedIn && <p>isLoggedIn: {isLoggedIn.toString()}</p>}
    </>
  );
};

export default Register;
