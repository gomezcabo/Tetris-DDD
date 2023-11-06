import { BLOCKS, BOARD_COLS, BOARD_ROWS } from './constants';

export type TBlockId = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export type TBlockCellValue = 0 | 1;
export type TBoardCellValue = TBlockId | null;
export type TCoordinate = { row: number; col: number };

export type TShape<TValue> = Array<Array<TValue>>;

export type TBlock = {
  id: TBlockId;
  shape: TShape<TBlockCellValue>;
};

export type TBoard = {
  status: 'playing' | 'game-over';
  score: number;
  currentBlock: TBlock;
  currentBlockRow: number;
  currentBlockCol: number;
  shape: TShape<TBoardCellValue>;
};

export const getNewBlock = () => {
  const currentBlock = BLOCKS[Math.floor(Math.random() * BLOCKS.length)];
  return {
    currentBlock,
    currentBlockRow: 0,
    currentBlockCol: Math.round((BOARD_COLS - currentBlock.shape[0].length) / 2),
  };
};

export const getInitialBoard = (): TBoard => {
  return {
    status: 'playing',
    score: 0,
    shape: Array(BOARD_ROWS).fill(Array(BOARD_COLS).fill(null)),
    ...getNewBlock(),
  };
};

export const getBoardCoordinates = (): TCoordinate[] => {
  return Array.from({ length: BOARD_ROWS * BOARD_COLS }).map((_, index) => {
    const row = Math.floor(index / BOARD_COLS);
    const col = index % BOARD_COLS;
    return { row, col };
  });
};

export const getCellValue = (board: TBoard, row: number, col: number): TBoardCellValue => {
  const minRow = board.currentBlockRow;
  const minCol = board.currentBlockCol;
  const maxCol = board.currentBlockCol + board.currentBlock.shape[0].length;
  const maxRow = board.currentBlockRow + board.currentBlock.shape.length;

  const blockOverlapsCell = row >= minRow && row < maxRow && col >= minCol && col < maxCol;
  const cellContainsBlock =
    blockOverlapsCell && board.currentBlock.shape[row - board.currentBlockRow][col - board.currentBlockCol];

  // Block cell
  if (cellContainsBlock) return board.currentBlock.id;

  // Occupied cell
  return board.shape[row][col];
};

export const getCellValues = (board: TBoard): TBoardCellValue[] => {
  return getBoardCoordinates().map(({ row, col }) => getCellValue(board, row, col));
};

export const boardHasCollision = (board: TBoard): boolean => {
  // Loop over block positions
  for (let row = 0; row < board.currentBlock.shape.length; row++) {
    for (let col = 0; col < board.currentBlock.shape[row].length; col++) {
      if (board.currentBlock.shape[row][col] === 0) continue;

      // Translate from block position to board position
      const displacedCol = col + board.currentBlockCol;
      const displacedRow = row + board.currentBlockRow;

      if (displacedCol < 0 || displacedCol >= BOARD_COLS) return true;
      if (displacedRow >= BOARD_ROWS) return true;
      if (board.shape[displacedRow][displacedCol]) return true;
    }
  }
  return false;
};

export const moveCurrentBlockLeft = (board: TBoard): TBoard => {
  const newBoard = { ...board, currentBlockCol: board.currentBlockCol - 1 };
  if (boardHasCollision(newBoard)) return board;
  return newBoard;
};

export const moveCurrentBlockRight = (board: TBoard): TBoard => {
  const newBoard = { ...board, currentBlockCol: board.currentBlockCol + 1 };
  if (boardHasCollision(newBoard)) return board;
  return newBoard;
};

export const moveCurrentBlockDown = (board: TBoard, toTheBottom = false): TBoard => {
  if (toTheBottom) {
    let newBoard = { ...board, currentBlockRow: board.currentBlockRow + 1 };
    while (!boardHasCollision(newBoard)) {
      newBoard = { ...newBoard, currentBlockRow: newBoard.currentBlockRow + 1 };
    }
    return consolidateBoard({ ...newBoard, currentBlockRow: newBoard.currentBlockRow - 1 });
  }

  const newBoard = { ...board, currentBlockRow: board.currentBlockRow + 1 };
  if (boardHasCollision(newBoard)) return consolidateBoard(board);
  return newBoard;
};

export const consolidateBoard = (board: TBoard): TBoard => {
  const newBoard = {
    ...board,
    shape: [...board.shape.map((row) => [...row])],
    ...getNewBlock(),
  };

  for (let row = 0; row < board.currentBlock.shape.length; row++) {
    for (let col = 0; col < board.currentBlock.shape[0].length; col++) {
      if (board.currentBlock.shape[row][col] === 0) continue;
      newBoard.shape[row + board.currentBlockRow][col + board.currentBlockCol] = board.currentBlock.id;
    }
  }

  const rowsCompleted: number[] = [];

  for (let row = 0; row < BOARD_ROWS; row++) {
    if (newBoard.shape[row].every((col) => col !== null)) rowsCompleted.push(row);
  }

  const emptyRows = Array(rowsCompleted.length).fill(Array(BOARD_COLS).fill(null));
  const boardWithoutCompletedRows = newBoard.shape.filter((_, index) => !rowsCompleted.includes(index));

  newBoard.shape = [...emptyRows, ...boardWithoutCompletedRows];
  newBoard.score += rowsCompleted.length;

  if (boardHasCollision(newBoard)) {
    newBoard.status = 'game-over';
  }

  return newBoard;
};

export const rotateCurrentBlock = (board: TBoard): TBoard => {
  // Rotate shape
  const newShape: TShape<TBlockCellValue> = board.currentBlock.shape[0].map((_, colIndex) =>
    board.currentBlock.shape.map((row) => row[colIndex]).reverse()
  );
  const newBoard = { ...board, currentBlock: { ...board.currentBlock, shape: newShape } };

  return boardHasCollision(newBoard) ? board : newBoard;
};
