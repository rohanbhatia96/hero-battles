import React from "react";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import CharacterDetails from "../containers/CharacterDetails";
import { CharacterProps } from "../types/pages/character";

const Character: React.FC = () => {
  const { id, fetchFrom } = useParams<CharacterProps>();
  return (
    <Col className="d-flex flex-column py-5 px-4">
      <CharacterDetails id={id} fetchFrom={fetchFrom} />
    </Col>
  );
};

export default Character;
