import { useQuery } from "@apollo/client";
import React from "react";
import { GET_TRENDING_CHARACTERS } from "../api/gqlQueries";
import { Query } from "../types/graphql";
import CharacterProfile from "../components/CharacterProfile";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const TrendingCharacters: React.FC<{}> = () => {
  const { loading, error, data } = useQuery<Query>(GET_TRENDING_CHARACTERS);
  const defaultImageUrl =
    "https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg";
  return (
    <Row className="mt-n4">
      {!loading &&
        !error &&
        data &&
        data.getTrendingCharacters.map((character) => (
          <Col xs={12} md={6} key={character.name}>
            <CharacterProfile
              name={character.name}
              imageUrl={
                character.imageUrl ? character.imageUrl : defaultImageUrl
              }
              averagePower={80}
              alignment={character.alignment}
            />
          </Col>
        ))}
    </Row>
  );
};

export default TrendingCharacters;
