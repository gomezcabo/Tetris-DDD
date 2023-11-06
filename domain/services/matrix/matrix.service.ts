import { Matrix } from "../../models/matrix";

export function getNewMatrix<T>(rows: number, cols: number, initialValue: T): Matrix<T> {
  return Array(rows)
    .fill([])
    .map(() => Array(cols).fill(initialValue ?? null));
}

export function cloneMatrix<T>(matrix: Matrix<T>): Matrix<T> {
  return [...matrix.map((row) => [...row])];
}

export function rotateMatrix<T>(matrix: Matrix<T>): Matrix<T> {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]).reverse());
}
