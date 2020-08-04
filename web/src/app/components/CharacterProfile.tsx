import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";

interface IProps {
  id: number;
  name: string;
  imageUrl: string;
  averagePower: number;
  alignment: string;
  publisher: string;
}

const CharacterProfile: React.FC<IProps> = ({
  id,
  name,
  imageUrl,
  averagePower,
  alignment,
  publisher,
}) => {
  const history = useHistory();
  return (
    <Row
      className="trending-char-container my-2 py-3 px-1 m-md-3 p-md-3"
      onClick={() => {
        history.push(`/character/${id}`);
      }}
    >
      <Col xs={4} md={3}>
        <Image
          src={imageUrl}
          className="trending-image rounded mx-auto d-block"
        />
      </Col>
      <Col xs={6} md={6}>
        <Row className="trending-char-title">{name}</Row>
        <Row>
          <span
            style={{ backgroundColor: alignment === "good" ? "green" : "red" }}
            className="trending-char-alignment"
          >
            {alignment.toLocaleUpperCase()}
          </span>
        </Row>
        <Row>{publisher}</Row>
      </Col>
      <Col xs={2} md={3}>
        <Row className="trending-char-power">{averagePower}</Row>
      </Col>
    </Row>
  );
};

export default CharacterProfile;
