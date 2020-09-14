import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Spinner from "react-bootstrap/esm/Spinner";
import Table from "react-bootstrap/esm/Table";
import { useSelector, useDispatch } from "react-redux";
import { GET_USER_DETAILS } from "../api/gqlQueries";
import { RootState } from "../store/types/reducers";
import { Character, Query } from "../types/graphql";
import { Link } from "react-router-dom";
import { findAverageRating } from "../utils/findAverageRating";
import Button from "react-bootstrap/esm/Button";

const UserDetails: React.FC = () => {
  const authToken = useSelector<RootState, string | null>(
    (state: RootState) => state.loginStateReducer.authToken
  );
  const shouldRefetchUser = useSelector<RootState, boolean>(
    (state: RootState) => state.shouldRefetchUserReducer.shouldRefetchUser
  );
  const { error, loading, data, refetch } = useQuery<Query>(GET_USER_DETAILS, {
    context: {
      headers: {
        Authorization: authToken,
      },
    },
  });
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: "SET_AUTH_TOKEN", payload: "" });
    dispatch({ type: "SET_LOGIN_STATE", payload: false });
  };
  useEffect(() => {
    if (shouldRefetchUser && !loading) {
      refetch();
      dispatch({ type: "SET_REFETCH_USER", payload: false });
    }
  }, []);
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
          <Col xs={12} className="py-5">
            <Button size="lg" onClick={logout}>
              Logout
            </Button>
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
