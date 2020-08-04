import { useQuery } from "@apollo/client";
import React from "react";
import { GET_TRENDING_CHARACTERS } from "../api/gqlQueries";
import { Query, PowerStats } from "../types/graphql";
import CharacterProfile from "../components/CharacterProfile";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    <Row className="mt-n4">
      {!loading &&
        !error &&
        data &&
        data.getTrendingCharacters.map((character) => (
          <Col xs={12} md={6} key={character.name}>
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
