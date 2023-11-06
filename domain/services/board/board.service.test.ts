import { describe, expect, test } from "vitest";
import { BOARD_COLS, BOARD_ROWS, Board } from "../../models/board";
import { Block } from "../../models/block";
import {
  hasCollision,
  cloneBoard,
  lockBlock,
  getBlockInitialPosition,
  getBoardCoordinates,
  getCellValue,
  getCellValues,
  getInitialBoard,
  moveCurrentBlockDown,
  moveCurrentBlockLeft,
  moveCurrentBlockRight,
  rotateCurrentBlock,
} from "./board.service";

describe("Board Service", () => {
  test("clone a board", () => {
    const newBoard = getInitialBoard();
    const clonedBoard = cloneBoard(newBoard);
    expect(clonedBoard).toEqual(newBoard);
  });

  test("get initial board", () => {
    const newBoard = getInitialBoard();
    expect(newBoard.status).toEqual("playing");
    expect(newBoard.score).toEqual(0);
    expect(newBoard.currentBlock).toBeTruthy();
    expect(newBoard.currentBlockPosition).toBeTruthy();
    expect(newBoard.cells).toHaveLength(BOARD_ROWS);
    expect(newBoard.cells[0]).toHaveLength(BOARD_COLS);
  });

  test("get block initial position", () => {
    const block: Block = {
      id: "L",
      shape: [
        [1, 0],
        [1, 0],
        [1, 1],
      ],
    };
    const initialPosition = getBlockInitialPosition(block);
    expect(initialPosition.row).toEqual(0);
    expect(initialPosition.col).toEqual(4);
  });

  test("get board coordinates", () => {
    const coordinates = getBoardCoordinates();
    expect(coordinates).toHaveLength(BOARD_ROWS * BOARD_COLS);
    expect(coordinates[0].row).toEqual(0);
    expect(coordinates[0].col).toEqual(0);
    expect(coordinates[coordinates.length - 1].row).toEqual(BOARD_ROWS - 1);
    expect(coordinates[coordinates.length - 1].col).toEqual(BOARD_COLS - 1);
  });

  test("get cell value", () => {
    const board: Board = {
      status: "playing",
      score: 0,
      currentBlock: {
        id: "J",
        shape: [
          [0, 1],
          [0, 1],
          [1, 1],
        ],
      },
      currentBlockPosition: {
        row: 0,
        col: 1,
      },
      cells: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    expect(getCellValue(board, 0, 0)).toBeNull();
    expect(getCellValue(board, 0, 1)).toBeNull();
    expect(getCellValue(board, 0, 2)).toEqual("J");
    expect(getCellValue(board, 1, 0)).toBeNull();
    expect(getCellValue(board, 1, 1)).toBeNull();
    expect(getCellValue(board, 1, 2)).toEqual("J");
    expect(getCellValue(board, 2, 0)).toBeNull();
    expect(getCellValue(board, 2, 1)).toEqual("J");
    expect(getCellValue(board, 2, 2)).toEqual("J");
  });

  test("get cell values", () => {
    const board = getInitialBoard();
    const cellValues = getCellValues(board);
    // TODO: improve this test
    expect(cellValues[BOARD_COLS * 5]).toEqual(null);
  });

  test("board has collision", () => {
    const board = getInitialBoard();
    board.currentBlock.id = "O";
    board.currentBlock.shape = [
      [1, 1],
      [1, 1],
    ];
    board.currentBlockPosition.row = 0;
    board.currentBlockPosition.col = 0;
    expect(hasCollision(board)).toBe(false);
    board.cells[0][0] = "I";
    expect(hasCollision(board)).toBe(true);

    board.cells[0][0] = null;
    board.currentBlockPosition.col = BOARD_COLS + 1;
    expect(hasCollision(board)).toBe(true);

    board.currentBlockPosition.col = 0;
    board.currentBlockPosition.row = BOARD_ROWS + 1;
    expect(hasCollision(board)).toBe(true);
  });

  test("move current block left", () => {
    const board = getInitialBoard();
    let newBoard = moveCurrentBlockLeft(board);
    expect(newBoard.currentBlockPosition.col).toEqual(board.currentBlockPosition.col - 1);

    board.currentBlockPosition.col = 0;
    newBoard = moveCurrentBlockLeft(board);
    expect(newBoard.currentBlockPosition.col).toEqual(0);
  });

  test("move current block right", () => {
    const board = getInitialBoard();
    let newBoard = moveCurrentBlockRight(board);
    expect(newBoard.currentBlockPosition.col).toEqual(board.currentBlockPosition.col + 1);

    board.currentBlock.id = "O";
    board.currentBlock.shape = [
      [1, 1],
      [1, 1],
    ];
    board.currentBlockPosition.col = BOARD_COLS - 2;
    newBoard = moveCurrentBlockRight(board);
    expect(newBoard.currentBlockPosition.col).toEqual(board.currentBlockPosition.col);
  });

  test("move current block down", () => {
    const board = getInitialBoard();
    let newBoard = moveCurrentBlockDown(board);
    expect(newBoard.currentBlockPosition.row).toEqual(board.currentBlockPosition.row + 1);

    board.currentBlock.id = "T";
    board.currentBlock.shape = [
      [0, 1, 0],
      [1, 1, 1],
    ];
    board.currentBlockPosition.row = BOARD_ROWS - 2;
    newBoard = moveCurrentBlockDown(board);
    expect(newBoard.currentBlockPosition.row).toEqual(0);
  });

  test("move current block all way down", () => {
    const board = getInitialBoard();
    board.currentBlock.id = "I";
    board.currentBlock.shape = [[1, 1, 1, 1]];
    board.currentBlockPosition.col = 0;
    const newBoard = moveCurrentBlockDown(board, true);
    expect(newBoard.cells[BOARD_ROWS - 1][0]).toEqual("I");
    expect(newBoard.cells[BOARD_ROWS - 1][1]).toEqual("I");
    expect(newBoard.cells[BOARD_ROWS - 1][2]).toEqual("I");
    expect(newBoard.cells[BOARD_ROWS - 1][3]).toEqual("I");
    expect(newBoard.cells[BOARD_ROWS - 1][4]).toEqual(null);
  });

  test("rotate block", () => {
    const board = getInitialBoard();
    board.currentBlock.id = "L";
    board.currentBlock.shape = [
      [0, 0, 1],
      [1, 1, 1],
    ];

    const newBoard = rotateCurrentBlock(board);
    expect(newBoard.currentBlock.shape).toEqual([
      [1, 0],
      [1, 0],
      [1, 1],
    ]);
  });

  test("rotate block with collision", () => {
    const board = getInitialBoard();
    board.currentBlock.id = "I";
    board.currentBlock.shape = [[1], [1], [1], [1]];
    board.currentBlockPosition.col = BOARD_COLS - 1;

    const newBoard = rotateCurrentBlock(board);
    expect(newBoard.currentBlock.shape).toEqual(board.currentBlock.shape);
  });

  test("clear row", () => {
    const board = getInitialBoard();
    board.cells[0] = board.cells[0].map(() => "I");
    const newBoard = lockBlock(board);
    expect(newBoard.cells[0].every((row) => row == null)).toBeTruthy();
  });

  test("game over", () => {
    const board = getInitialBoard();
    board.cells[0] = board.cells[0].map(() => "I");
    board.cells[0][0] = null;
    board.cells[1] = board.cells[1].map(() => "I");
    board.cells[1][0] = null;
    const newBoard = lockBlock(board);
    console.log(board);
    expect(newBoard.status).toEqual("game-over");
  });
});
