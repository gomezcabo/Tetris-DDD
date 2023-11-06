import { Coordinate } from "../../models/coordinate";

export function cloneCoordinate(coordinate: Coordinate): Coordinate {
  return { ...coordinate };
}
