import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Battle: React.FC = () => {
  return (
    <Col className="d-flex flex-column py-5 px-4">
      <Row className="flex-grow-1">
        <Col className="d-flex justify-content-center align-items-center">
          <h2>Battle It Out Coming Soon!</h2>
        </Col>
      </Row>
    </Col>
  );
};

export default Battle;
