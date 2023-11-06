import { describe, expect, test } from "vitest";
import { Coordinate } from "../../models/coordinate";
import { cloneCoordinate } from "./coordinate.service";

describe("Coordinate Service", () => {
  test("clone coordinate", () => {
    const coordinate: Coordinate = { row: 1, col: 7 };
    const newCoordinate = cloneCoordinate(coordinate);
    expect(newCoordinate).toEqual(coordinate);
  });
});
