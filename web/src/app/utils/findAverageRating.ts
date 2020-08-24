import { PowerStats } from "../types/graphql";

export const findAverageRating = (powerStats: PowerStats): number => {
  let sum =
    powerStats.intelligence +
    powerStats.combat +
    powerStats.durability +
    powerStats.speed +
    powerStats.strength +
    powerStats.power;
  let averageRating = Math.floor(sum / 6);
  return averageRating;
};
