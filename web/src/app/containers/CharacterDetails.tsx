import React from "react";
import { useQuery } from "@apollo/client";
import {
  GET_SINGLE_CHARACTER_FROM_API_ID,
  GET_SINGLE_CHARACTER,
  IS_CHARACTER_ADDED,
  IS_CHARACTER_ADDED_FROM_API_ID,
} from "../api/gqlQueries";
import { Query } from "../types/graphql";
import { CharacterProps } from "../types/pages/character";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import { findAverageRating } from "../utils/findAverageRating";
import CharacterStats from "../components/CharacterStats";
import AddCharacterButton from "./AddCharacterButton";
import { useSelector } from "react-redux";
import { RootState } from "../store/types/reducers";

const CharacterDetails: React.FC<CharacterProps> = ({ id, fetchFrom }) => {
  const defaultImageUrl =
    "https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg";
  const isLoggedIn = useSelector<RootState, boolean>(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  const authToken = useSelector<RootState, string | null>(
    (state: RootState) => state.loginStateReducer.authToken
  );
  const { data: data1, refetch } = useQuery<Query>(
    fetchFrom === "external"
      ? IS_CHARACTER_ADDED_FROM_API_ID
      : IS_CHARACTER_ADDED,
    {
      variables: { id: parseFloat(id) },
      skip: !isLoggedIn,
      context: {
        headers: {
          Authorization: authToken,
        },
      },
    }
  );
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
    <Row className="flex-grow-1">
      {loading && (
        <Col className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      )}
      {data && (
        <>
          <Col xs={12} md={4} lg={3}>
            <Row
              style={{
                position: "sticky",
                top: 120,
                zIndex: 100,
              }}
            >
              <Col>
                <Image
                  src={data.getSingleCharacter.imageUrl || defaultImageUrl}
                  fluid
                />
                <AddCharacterButton
                  className="mt-3 d-none d-md-block"
                  characterName={data.getSingleCharacter.name}
                  characterId={data.getSingleCharacter.id}
                  disabled={data1 ? data1.isCharacterAdded : false}
                  refetch={refetch}
                />
              </Col>
            </Row>
          </Col>
          <Col
            xs={12}
            className="d-block d-md-none"
            style={{
              margin: 0,
              position: "sticky",
              zIndex: 100,
              top: 100,
              padding: 20,
              backgroundColor: "white",
            }}
          >
            <AddCharacterButton
              characterName={data.getSingleCharacter.name}
              characterId={data.getSingleCharacter.id}
              disabled={data1 ? data1.isCharacterAdded : false}
              refetch={refetch}
            />
          </Col>
          <Col xs={12} md={4} lg={5}>
            <Row className="sticky-top py-3" style={{ top: 125, zIndex: 90 }}>
              <Col xs={12}>
                <p>
                  <span className="hero-name">
                    {data.getSingleCharacter.name}{" "}
                  </span>
                  <span className="hero-rating">
                    {findAverageRating(data.getSingleCharacter.powerStats)}
                  </span>
                </p>
              </Col>
              <Col xs={12} className="my-3">
                <CharacterStats
                  powerStats={data.getSingleCharacter.powerStats}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <h3>Basic Info</h3>
            <p>Real Name: {data.getSingleCharacter.realName}</p>
            <p>Alignment: {data.getSingleCharacter.alignment}</p>
            <p>Publisher: {data.getSingleCharacter.publisher}</p>
            <h3>Appearance</h3>
            <p>Height: {data.getSingleCharacter.appearance.height}</p>
            <p>Weight: {data.getSingleCharacter.appearance.weight}</p>
            <p>Gender: {data.getSingleCharacter.appearance.gender}</p>
            <p>Race: {data.getSingleCharacter.appearance.race}</p>
            <p>Eye Color: {data.getSingleCharacter.appearance.eyeColor}</p>
            <p>Hair Color: {data.getSingleCharacter.appearance.hairColor}</p>
            <h3>Work</h3>
            <p>Occupation: {data.getSingleCharacter.work.occupation}</p>
            <p>Base: {data.getSingleCharacter.work.base}</p>
            <h3>Connections</h3>
            <p>
              Group Affiliations:{" "}
              {data.getSingleCharacter.connections.groupAffiliations}
            </p>
            <p>Relatives: {data.getSingleCharacter.connections.relatives}</p>
            <h3>Biography</h3>
            <p>Alter Egos: {data.getSingleCharacter.biography.alterEgos}</p>
            <p>Aliases: {data.getSingleCharacter.biography.aliases}</p>
            <p>
              Place of Birth: {data.getSingleCharacter.biography.placeOfBirth}
            </p>
            <p>
              First Appearance:{" "}
              {data.getSingleCharacter.biography.firstAppearance}
            </p>
            <p>{JSON.stringify(data1)}</p>
          </Col>
        </>
      )}
      {error && (
        <Col>
          <p>Error {JSON.stringify(error)}</p>
        </Col>
      )}
    </Row>
  );
};

export default CharacterDetails;
