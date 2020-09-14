import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Advertisement: React.FC<{}> = () => {
  return (
    <Row
      className="mx-3 flex-grow-1"
      style={{
        margin: 0,
        position: "sticky",
        zIndex: 100,
        top: 120,
      }}
    >
      <Col
        xs={12}
        className="advertisement d-flex flex-column justify-content-center"
      >
        <h3>Advertisement</h3>
        <a
          href="https://therohanbhatia.com"
          target="_blank"
          rel="noopener noreferrer"
          className="my-3"
        >
          To advertise here contact Rohan Bhatia
        </a>
      </Col>
    </Row>
  );
};

export default Advertisement;
