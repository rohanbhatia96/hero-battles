import React from "react";
import { RootState } from "../store/types/reducers";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { Query } from "../types/graphql";
import { GET_USER_DETAILS } from "../api/gqlQueries";

const UserDetails: React.FC = () => {
  const isLoggedIn = useSelector<RootState, boolean>(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  const authToken = useSelector<RootState, string | null>(
    (state: RootState) => state.loginStateReducer.authToken
  );
  const { error, loading, data } = useQuery<Query>(GET_USER_DETAILS, {
    context: {
      headers: {
        Authorization: authToken,
      },
    },
  });
  return (
    <>
      <h3>user details</h3>
      <p>loading: {JSON.stringify(loading)}</p>
      <p>error: {JSON.stringify(error)}</p>
      <p>data: {JSON.stringify(data?.getAllUserDetails)}</p>
    </>
  );
};

export default UserDetails;
