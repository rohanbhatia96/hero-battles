import React from "react";
import LoginForm from "../containers/LoginForm";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Login: React.FC = () => {
  return (
    <Col>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4} className="mt-5">
          <LoginForm />
        </Col>
      </Row>
    </Col>
  );
};

export default Login;
