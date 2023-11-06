import { Block } from "../../models/block";
import { BOARD_COLS, BOARD_ROWS, Board, BoardCellValue } from "../../models/board";
import { Coordinate } from "../../models/coordinate";
import { BlockService, CoordinateService, MatrixService } from "../services";

export function cloneBoard(board: Board): Board {
  return {
    ...board,
    currentBlock: BlockService.cloneBlock(board.currentBlock),
    currentBlockPosition: CoordinateService.cloneCoordinate(board.currentBlockPosition),
    cells: MatrixService.cloneMatrix(board.cells),
  };
}

export function getInitialBoard(): Board {
  const newBlock = BlockService.getNewRandomBlock();
  const currentBlockPosition = getBlockInitialPosition(newBlock);

  return {
    status: "playing",
    score: 0,
    cells: MatrixService.getNewMatrix(BOARD_ROWS, BOARD_COLS, null),
    currentBlock: newBlock,
    currentBlockPosition,
  };
}

export function getBlockInitialPosition(block: Block): Coordinate {
  return { row: 0, col: Math.round((BOARD_COLS - block.shape[0].length) / 2) };
}

export function geBoardCoordinates(): Coordinate[] {
  return Array.from({ length: BOARD_ROWS * BOARD_COLS }).map((_, index) => {
    const row = Math.floor(index / BOARD_COLS);
    const col = index % BOARD_COLS;
    return { row, col };
  });
}

export function getCellValue(board: Board, row: number, col: number): BoardCellValue {
  const minRow = board.currentBlockPosition.row;
  const minCol = board.currentBlockPosition.col;
  const maxCol = board.currentBlockPosition.col + board.currentBlock.shape[0].length;
  const maxRow = board.currentBlockPosition.row + board.currentBlock.shape.length;

  const blockOverlapsCell = row >= minRow && row < maxRow && col >= minCol && col < maxCol;
  const cellContainsBlock =
    blockOverlapsCell &&
    board.currentBlock.shape[row - board.currentBlockPosition.row][col - board.currentBlockPosition.col];

  // Block cell
  if (cellContainsBlock) return board.currentBlock.id;

  // Occupied cell
  return board.cells[row][col];
}

export function getCellValues(board: Board): BoardCellValue[] {
  return geBoardCoordinates().map(({ row, col }) => getCellValue(board, row, col));
}

export function hasCollision(board: Board): boolean {
  // Loop over block's shape positions
  for (let row = 0; row < board.currentBlock.shape.length; row++) {
    for (let col = 0; col < board.currentBlock.shape[row].length; col++) {
      if (board.currentBlock.shape[row][col] === 0) continue;

      // Translate from block position to board position
      const translatedCol = col + board.currentBlockPosition.col;
      const translatedRow = row + board.currentBlockPosition.row;

      // out of bounds
      if (translatedCol < 0 || translatedCol >= BOARD_COLS) return true;
      if (translatedRow >= BOARD_ROWS) return true;

      // collision with a consolidated block
      if (board.cells[translatedRow][translatedCol]) return true;
    }
  }
  return false;
}

export function moveCurrentBlockLeft(board: Board): Board {
  const newBoard = cloneBoard(board);
  newBoard.currentBlockPosition.col--;
  return hasCollision(newBoard) ? board : newBoard;
}

export function moveCurrentBlockRight(board: Board): Board {
  const newBoard = cloneBoard(board);
  newBoard.currentBlockPosition.col++;
  return hasCollision(newBoard) ? board : newBoard;
}

export function moveCurrentBlockDown(board: Board, toTheBottom = false): Board {
  const newBoard = cloneBoard(board);

  if (!toTheBottom) {
    newBoard.currentBlockPosition.row++;
    return hasCollision(newBoard) ? lockBlock(board) : newBoard;
  }

  newBoard.currentBlockPosition.row = board.currentBlockPosition.row + 1;
  while (!hasCollision(newBoard)) {
    newBoard.currentBlockPosition.row++;
  }
  newBoard.currentBlockPosition.row--;
  return lockBlock(newBoard);
}

export function rotateCurrentBlock(board: Board): Board {
  const newBoard = cloneBoard(board);
  newBoard.currentBlock = BlockService.rotateBlock(newBoard.currentBlock);
  return hasCollision(newBoard) ? board : newBoard;
}

export const lockBlock = (board: Board): Board => {
  const newBoard = cloneBoard(board);
  newBoard.currentBlock = BlockService.getNewRandomBlock();
  newBoard.currentBlockPosition = getBlockInitialPosition(newBoard.currentBlock);

  // Consolidate new block in its final position making it part of the board cells
  for (let row = 0; row < board.currentBlock.shape.length; row++) {
    for (let col = 0; col < board.currentBlock.shape[0].length; col++) {
      if (board.currentBlock.shape[row][col] === 0) continue;

      const translatedRow = row + board.currentBlockPosition.row;
      const translatedCol = col + board.currentBlockPosition.col;

      newBoard.cells[translatedRow][translatedCol] = board.currentBlock.id;
    }
  }

  const rowsCompleted: number[] = [];

  newBoard.cells.forEach((row, rowIndex) => {
    if (row.every((col) => col !== null)) rowsCompleted.push(rowIndex);
  });

  const emptyRows = Array(rowsCompleted.length).fill(Array(BOARD_COLS).fill(null));
  const boardWithoutCompletedRows = newBoard.cells.filter((_, index) => !rowsCompleted.includes(index));

  newBoard.cells = [...emptyRows, ...boardWithoutCompletedRows];
  newBoard.score += rowsCompleted.length;

  if (hasCollision(newBoard)) {
    newBoard.status = "game-over";
  }

  return newBoard;
};
