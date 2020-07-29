import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TRENDING_CHARACTERS } from "../api/gqlQueries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_TRENDING_CHARACTERS);
  return (
    <>
      <p>Loading: {JSON.stringify(loading)}</p>
      <p>Error: {JSON.stringify(error)}</p>
      <p>Data: {JSON.stringify(data)}</p>
    </>
  );
};

export default Home;
