import React from "react";
import { useQuery } from "@apollo/client";
import {
  GET_SINGLE_CHARACTER_FROM_API_ID,
  GET_SINGLE_CHARACTER,
} from "../api/gqlQueries";
import { Query } from "../types/graphql";
import { CharacterProps } from "../types/pages/character";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

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
    <Row className="flex-grow-1">
      {loading && (
        <Col className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      )}
      {data && (
        <Col>
          <p>data {JSON.stringify(data)}</p>
        </Col>
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
