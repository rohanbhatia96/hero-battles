import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Query } from "../types/graphql";
import { GET_SEARCH_RESULT } from "../api/gqlQueries";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const Searchbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<String>("");
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const { data, error, loading } = useQuery<Query>(GET_SEARCH_RESULT, {
    variables: { searchTerm },
  });
  const handleChange = (event: any) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  return (
    <Row>
      <Col xs={12}>
        <Row>
          <Col xs={12} className="remove-padding">
            <Form>
              <Form.Control
                type="input"
                onChange={handleChange}
                placeholder="Search Heroes"
                onFocus={() => {
                  setShowSearchResults(true);
                }}
                onBlur={() => {
                  setShowSearchResults(false);
                }}
              />
            </Form>
          </Col>
        </Row>
        <Row
          className="search-results"
          style={{ visibility: showSearchResults ? "visible" : "hidden" }}
        >
          <Col xs={12}>
            {loading && <p>Loading...</p>}
            {!loading && error && <p>{error.message}</p>}
            {!loading &&
              data &&
              data.getCharactersFromSearch.slice(0, 6).map((character) => (
                <div
                  key={character.apiId}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Link to={`/character/${character.apiId}/external`}>
                    {character.name} {character.averageRating}
                  </Link>
                </div>
              ))}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Searchbar;
