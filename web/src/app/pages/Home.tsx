import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import Searchbar from "../containers/Searchbar";
import TrendingCharacters from "../containers/TrendingCharacters";

const Home: React.FC<{}> = () => {
  const history = useHistory();
  return (
    <>
      <Row className="hero-container align-items-center">
        <Col xs={12} className="d-flex justify-content-center">
          <Button
            size="lg"
            onClick={() => {
              history.push("/battle");
            }}
          >
            Battle It Out
          </Button>
        </Col>
      </Row>
      <Row className="mt-5 mx-3">
        <Col xs={12} md={8}>
          <Searchbar />
          <TrendingCharacters />
        </Col>
        <Col xs={12} md={4}>
          Advertisement
        </Col>
      </Row>
    </>
  );
};

export default Home;
