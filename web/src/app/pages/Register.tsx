import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RegisterForm from "../containers/RegisterForm";

const Register: React.FC = () => {
  return (
    <Col>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4} className="mt-5">
          <RegisterForm />
        </Col>
      </Row>
    </Col>
  );
};

export default Register;
