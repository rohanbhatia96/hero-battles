import React from "react";
import { useQuery } from "@apollo/client";
import {
  GET_SINGLE_CHARACTER_FROM_API_ID,
  GET_SINGLE_CHARACTER,
} from "../api/gqlQueries";
import { Query } from "../types/graphql";
import { CharacterProps } from "../types/pages/character";

const CharacterDetails: React.FC<CharacterProps> = ({ id, fetchFrom }) => {
  const { loading, error, data } = useQuery<Query>(
    fetchFrom === "external"
      ? GET_SINGLE_CHARACTER_FROM_API_ID
      : GET_SINGLE_CHARACTER,
    {
      variables: {
        [fetchFrom === "external" ? "apiId" : "id"]: parseFloat(id),
      },
    }
  );
  return (
    <>
      <p>Hello {JSON.stringify(data)}</p>
      <p>Hello {JSON.stringify(error)}</p>
      <p>Hello {JSON.stringify(loading)}</p>
    </>
  );
};

export default CharacterDetails;
