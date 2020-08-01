import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

type IProps = {
  name: string;
  imageUrl: string;
  averagePower: number;
  alignment: string;
};

const CharacterProfile: React.FC<IProps> = ({
  name,
  imageUrl,
  averagePower,
  alignment,
}) => {
  return (
    <Row className="trending-char-container my-2 py-3 px-1 m-md-3 p-md-3">
      <Col xs={5} md={3}>
        <Image
          src={imageUrl}
          className="trending-image rounded mx-auto d-block"
        />
      </Col>
      <Col xs={7} md={9}>
        <Row>
          <h5>{name}</h5>
        </Row>
        <Row>{alignment}</Row>
        <Row>{averagePower}</Row>
      </Col>
    </Row>
  );
};

export default CharacterProfile;
