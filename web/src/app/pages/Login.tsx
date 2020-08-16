import React from "react";
import LoginForm from "../containers/LoginForm";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const Login: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={6} className="mt-5">
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
