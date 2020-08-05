import { PowerStats } from "../types/apiResponses";

export const findAverageRating = (powerStats: PowerStats): number => {
  let sum =
    (Number(powerStats.intelligence) | 0) +
    (Number(powerStats.combat) | 0) +
    (Number(powerStats.durability) | 0) +
    (Number(powerStats.speed) | 0) +
    (Number(powerStats.strength) | 0) +
    (Number(powerStats.power) | 0);
  let averageRating = Math.floor(sum / 6);
  return averageRating;
};
