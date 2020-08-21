import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <Row className="header sticky-top">
      <Col xs={6} md={4} lg={2}>
        <Link to="/">
          <Image src={logo} fluid />
        </Link>
      </Col>
      <Col xs={6} md={8} lg={10} className="d-flex align-items-center px-5">
        <Nav variant="pills" activeKey="1">
          <Nav.Item>
            <Nav.Link eventKey="1">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2">Loooonger NavLink</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="3">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
    </Row>
  );
};

export default Header;
