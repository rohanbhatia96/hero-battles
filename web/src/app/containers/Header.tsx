import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import logo from "../images/logo.png";
import { Link, useLocation } from "react-router-dom";
import mainMenu from "../data/mainMenu.json";
import { useSelector } from "react-redux";
import { RootState } from "../store/types/reducers";
import Modal from "react-bootstrap/esm/Modal";

const Header: React.FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const NavLinks: React.FC = () => {
    const cDisplay = isLoggedIn ? "loggedIn" : "loggedOut";
    return (
      <>
        {mainMenu
          .filter(
            (link) => link.display === "public" || link.display === cDisplay
          )
          .map((link) => (
            <Nav.Item
              key={link.id}
              onClick={() => {
                setShowMobileMenu(false);
              }}
            >
              <Nav.Link eventKey={link.route} as="li">
                <Link to={link.route} className="nav-link">
                  {link.name}
                </Link>
              </Nav.Link>
            </Nav.Item>
          ))}
      </>
    );
  };

  return (
    <Col>
      <Row className="header align-items-center">
        <Col xs={6} md={4} lg={2}>
          <Link to="/">
            <Image src={logo} fluid />
          </Link>
        </Col>
        <Col xs={6} md={8} lg={10} className="d-none d-md-flex px-5">
          <Nav variant="pills" activeKey={location.pathname}>
            <NavLinks />
          </Nav>
        </Col>
        <Col xs={6} md={8} lg={10} className="d-md-none px-5 text-right">
          <span
            className="mobile-menu-text"
            onClick={() => {
              setShowMobileMenu(true);
            }}
          >
            Menu
          </span>
        </Col>
      </Row>
      <Modal
        show={showMobileMenu}
        onHide={() => {
          setShowMobileMenu(false);
        }}
        dialogClassName="mobile-menu-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Nav
            variant="pills"
            activeKey={location.pathname}
            className="flex-column"
          >
            <NavLinks />
          </Nav>
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default Header;
