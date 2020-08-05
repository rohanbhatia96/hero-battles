import React from "react";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_CHARACTER } from "../api/gqlQueries";
import { Query } from "../types/graphql";

type IProps = {
  characterId: string;
};

const CharacterDetails: React.FC<IProps> = ({ characterId }) => {
  const { loading, error, data } = useQuery<Query>(GET_SINGLE_CHARACTER, {
    variables: { id: parseFloat(characterId) },
  });
  return (
    <>
      <p>Hello {JSON.stringify(data)}</p>
      <p>Hello {JSON.stringify(error)}</p>
      <p>Hello {JSON.stringify(loading)}</p>
    </>
  );
};

export default CharacterDetails;
