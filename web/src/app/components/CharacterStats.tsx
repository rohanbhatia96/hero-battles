import React from "react";
import { PowerStats } from "../types/graphql";
import { findAverageRating } from "../utils/findAverageRating";
import Table from "react-bootstrap/Table";

interface PowerProps {
  powerStats: PowerStats;
}

const CharacterStats: React.FC<PowerProps> = ({ powerStats }) => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Skill</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Power</td>
          <td>{powerStats.power}</td>
        </tr>
        <tr>
          <td>Speed</td>
          <td>{powerStats.speed}</td>
        </tr>
        <tr>
          <td>Strength</td>
          <td>{powerStats.strength}</td>
        </tr>
        <tr>
          <td>Intelligence</td>
          <td>{powerStats.intelligence}</td>
        </tr>
        <tr>
          <td>Combat</td>
          <td>{powerStats.combat}</td>
        </tr>
        <tr>
          <td>Durability</td>
          <td>{powerStats.durability}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CharacterStats;
