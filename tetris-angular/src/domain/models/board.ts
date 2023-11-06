import { Block, BlockId } from "./block";
import { Coordinate } from "./coordinate";
import { Matrix } from "./matrix";

export const BOARD_ROWS = 20;
export const BOARD_COLS = 10;

export type BoardCellValue = BlockId | null;

export type Board = {
  status: "playing" | "game-over";
  score: number;
  currentBlock: Block;
  currentBlockPosition: Coordinate;
  cells: Matrix<BoardCellValue>;
};
