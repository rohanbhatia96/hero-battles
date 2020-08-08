import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TrendingCharacters from "../containers/TrendingCharacters";
import Searchbar from "../containers/Searchbar";
import { Link } from "react-router-dom";

const Home: React.FC<{}> = () => {
  return (
    <Container fluid>
      <Row className="hero-container">
        <Col xs={12}>
          <Link to={"/login"}>Login</Link>
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
    </Container>
  );
};

export default Home;
