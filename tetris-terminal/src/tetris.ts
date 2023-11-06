import { BOARD_COLS, BOARD_ROWS } from './domain/constants';
import { drawGameOver } from './game-over';
import { repeat } from './utils';
import {
  TBoard,
  getCellValue,
  getInitialBoard,
  moveCurrentBlockDown,
  moveCurrentBlockLeft,
  moveCurrentBlockRight,
  rotateCurrentBlock,
} from './domain/board';
import { configureKeyboard } from './keyboard';

configureKeyboard();

function drawBoard(board: TBoard) {
  console.clear();

  if (board.status === 'game-over') return drawGameOver(board);

  console.log(` SCORE: ${board.score}`);
  console.log(`┌${repeat('--', BOARD_COLS)}┐`);

  for (let row = 0; row < BOARD_ROWS; row++) {
    let rowString = '';
    for (let col = 0; col < BOARD_COLS; col++) {
      rowString += getCellValue(board, row, col) ? '██' : '  ';
    }
    console.log('|' + rowString + '|');
  }
  console.log(`└${repeat('--', BOARD_COLS)}┘`);
}

let board = getInitialBoard();
drawBoard(board);

setInterval(() => (board = moveCurrentBlockDown(board)), 1000);
setInterval(() => drawBoard(board), 40);

process.stdin.on('keypress', (_, key) => {
  if (key) {
    if (key.name == 'left') board = moveCurrentBlockLeft(board);
    if (key.name == 'right') board = moveCurrentBlockRight(board);
    if (key.name == 'down') board = moveCurrentBlockDown(board);
    if (key.name == 'up') board = rotateCurrentBlock(board);
    if (key.name == 'return') {
      if (board.status === 'playing') board = moveCurrentBlockDown(board, true);
      else board = getInitialBoard();
    }
    drawBoard(board);
  }
});
