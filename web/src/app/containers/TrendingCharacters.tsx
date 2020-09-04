import { useQuery } from "@apollo/client";
import React from "react";
import { GET_TRENDING_CHARACTERS } from "../api/gqlQueries";
import { Query, PowerStats } from "../types/graphql";
import CharacterProfile from "../components/CharacterProfile";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/esm/Spinner";

const TrendingCharacters: React.FC<{}> = () => {
  const { loading, error, data } = useQuery<Query>(GET_TRENDING_CHARACTERS);
  const defaultImageUrl =
    "https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg";
  const findAveragePower = (powerStats: PowerStats): number => {
    let sum: number = 0;
    sum =
      powerStats.power +
      powerStats.speed +
      powerStats.strength +
      powerStats.durability +
      powerStats.combat +
      powerStats.intelligence;
    return Math.floor(sum / 6);
  };
  return (
    <Row className="mt-4 flex-grow-1">
      {loading && (
        <Col className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      )}
      {!loading &&
        !error &&
        data &&
        data.getTrendingCharacters.map((character) => (
          <Col xs={12} md={12} lg={6} key={character.name}>
            <CharacterProfile
              id={character.id}
              name={character.name}
              imageUrl={
                character.imageUrl ? character.imageUrl : defaultImageUrl
              }
              averagePower={findAveragePower(character.powerStats)}
              alignment={character.alignment}
              publisher={character.publisher}
            />
          </Col>
        ))}
    </Row>
  );
};

export default TrendingCharacters;
