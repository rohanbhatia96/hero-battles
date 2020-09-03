import { useQuery } from "@apollo/client";
import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Spinner from "react-bootstrap/esm/Spinner";
import Table from "react-bootstrap/esm/Table";
import { useSelector } from "react-redux";
import { GET_USER_DETAILS } from "../api/gqlQueries";
import { RootState } from "../store/types/reducers";
import { Character, Query } from "../types/graphql";
import { Link } from "react-router-dom";
import { findAverageRating } from "../utils/findAverageRating";

const UserDetails: React.FC = () => {
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
    <Row className="flex-grow-1">
      {loading && (
        <Col className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      )}
      {data && (
        <Col xs={12}>
          <h3>{data.getAllUserDetails.name}'s account details:</h3>
          <Col className="user-details-container">
            <p>Name: {data.getAllUserDetails.name}</p>
            <p>Username: {data.getAllUserDetails.username}</p>
            <p>Email: {data.getAllUserDetails.email}</p>
          </Col>
          <h3>{data.getAllUserDetails.name}'s heroes:</h3>
          <Col md={6}>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Hero</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {data.getAllUserDetails.characters.map(
                    (character: Character) => (
                      <tr key={character.id}>
                        <td>
                          <Link to={`/character/${character.id}`}>
                            {character.name}
                          </Link>
                        </td>
                        <td>{findAverageRating(character.powerStats)}</td>
                      </tr>
                    )
                  )}
                </>
              </tbody>
            </Table>
          </Col>
        </Col>
      )}
      {error && (
        <Col className="d-flex justify-content-center align-items-center">
          <p>{JSON.stringify(error)}</p>
        </Col>
      )}
    </Row>
  );
};

export default UserDetails;
