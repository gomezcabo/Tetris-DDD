import { describe, expect, test } from "vitest";
import { cloneMatrix, getNewMatrix } from "./matrix.service";

describe("Matrix Service", () => {
  test("get new matrix", () => {
    const newMatrix = getNewMatrix(2, 3, "irrelevant");
    expect(newMatrix).toHaveLength(2);
  });

  test("clone matrix", () => {
    const matrix = getNewMatrix(2, 3, Math.random());
    const newMatrix = cloneMatrix(matrix);
    expect(newMatrix).toEqual(matrix);
  });
});
