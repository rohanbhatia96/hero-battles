import React from "react";
import Col from "react-bootstrap/Col";
import UserDetails from "../containers/UserDetails";

const Account: React.FC = () => {
  return (
    <Col className="py-5 px-4">
      <UserDetails />
    </Col>
  );
};

export default Account;
