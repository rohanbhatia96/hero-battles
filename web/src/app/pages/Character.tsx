import React from "react";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import CharacterDetails from "../containers/CharacterDetails";
import { CharacterProps } from "../types/pages/character";

const Character: React.FC = () => {
  const { id, fetchFrom } = useParams<CharacterProps>();
  return (
    <Row>
      <Col>
        <CharacterDetails id={id} fetchFrom={fetchFrom}/>
      </Col>
    </Row>
  );
};

export default Character;
