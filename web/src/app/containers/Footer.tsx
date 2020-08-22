import React from "react";
import Col from "react-bootstrap/Col";
const Footer: React.FC = () => {
  return (
    <Col className="footer d-flex justify-content-center">
      <p>
        Developed With ❤️ By{" "}
        <a
          href="https://therohanbhatia.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rohan Bhatia
        </a>
      </p>
    </Col>
  );
};

export default Footer;
