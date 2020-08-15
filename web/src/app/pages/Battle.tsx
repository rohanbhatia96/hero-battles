import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { RootState } from "../store/types/reducers";
import { useHistory } from "react-router-dom";

const Battle: React.FC = () => {
  const history = useHistory();
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [isLoggedIn, history]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Battle It Out Coming Soon!</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Battle;
