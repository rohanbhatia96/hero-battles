import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import RegisterForm from "../containers/RegisterForm";

const Register: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={8} className="mt-5">
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
