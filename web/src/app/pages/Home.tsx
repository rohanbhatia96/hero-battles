import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TRENDING_CHARACTERS } from "../api/gqlQueries";
import { Query } from "../../types/graphql";

const Home = () => {
  const { loading, error, data } = useQuery<Query>(GET_TRENDING_CHARACTERS);
  return (
    <>
      <p>Loading: {JSON.stringify(loading)}</p>
      <p>Error: {JSON.stringify(error)}</p>
      <p>Data: {JSON.stringify(data?.getTrendingCharacters)}</p>
    </>
  );
};

export default Home;
