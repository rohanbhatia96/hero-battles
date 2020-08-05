import React from "react";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import CharacterDetails from "../containers/CharacterDetails";

const Character: React.FC = () => {
  const { id } = useParams();
  return (
    <Row>
      <Col>
        <CharacterDetails characterId={id} />
      </Col>
    </Row>
  );
};

export default Character;
