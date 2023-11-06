import { TBoard } from './domain/board';
import { BOARD_COLS, BOARD_ROWS } from './domain/constants';
import { repeat } from './utils';

export function drawGameOver(board: TBoard) {
  // const emptyRowsBefore = Math.floor((BOARD_ROWS - 4) / 3);
  // const emptyRowsBetween = Math.floor((BOARD_ROWS - 4) / 3);
  // const emptyRowsAfter = BOARD_ROWS - 4 - emptyRowsBefore - emptyRowsBetween;

  // // SCORE
  // console.log(` SCORE: ${board.score}`);

  // // Top border
  // console.log(`┌${repeat('--', BOARD_COLS)}┐`);

  // // Space
  // for (let i = 0; i < emptyRowsBefore; i++) console.log(`|${repeat('  ', BOARD_COLS)}|`);

  // // "G A M E" word
  // let spacesBefore = Math.floor((BOARD_COLS * 2 - 7) / 2);
  // let spacesAfter = 2 * BOARD_COLS - 7 - spacesBefore;
  // console.log(`|${repeat(' ', spacesBefore)}G A M E${repeat(' ', spacesAfter)}|`);

  // // "O V E R" word
  // spacesBefore = Math.floor((BOARD_COLS * 2 - 7) / 2) + 1;
  // spacesAfter = 2 * BOARD_COLS - 7 - spacesBefore;
  // console.log(`|${repeat(' ', spacesBefore)}O V E R${repeat(' ', spacesAfter)}|`);

  // // Space
  // for (let i = 0; i < emptyRowsBetween; i++) console.log(`|${repeat('  ', BOARD_COLS)}|`);

  // // "Hit <Enter>" text
  // spacesBefore = Math.floor((BOARD_COLS * 2 - 11) / 2) + 1;
  // spacesAfter = 2 * BOARD_COLS - 11 - spacesBefore;
  // console.log(`|${repeat(' ', spacesBefore)}Hit <Enter>${repeat(' ', spacesAfter)}|`);

  // // "to try again!" text
  // spacesBefore = Math.floor((BOARD_COLS * 2 - 13) / 2) + 1;
  // spacesAfter = 2 * BOARD_COLS - 13 - spacesBefore;
  // console.log(`|${repeat(' ', spacesBefore)}to try again!${repeat(' ', spacesAfter)}|`);

  // // Space
  // for (let i = 0; i < emptyRowsAfter; i++) console.log(`|${repeat('  ', BOARD_COLS)}|`);

  // // Bottom border
  // console.log(`└${repeat('--', BOARD_COLS)}┘`);

  console.log('         _____                         ____');
  console.log('        / ____|                       / __ \\');
  console.log('       | |  __  __ _ _ __ ___   ___  | |  | |_   _____ _ __');
  console.log("       | | |_ |/ _` | '_ ` _ \\ / _ \\ | |  | \\ \\ / / _ \\ '__|");
  console.log('       | |__| | (_| | | | | | |  __/ | |__| |\\ V /  __/ |');
  console.log('        \\_____|\\__,_|_| |_| |_|\\___|  \\____/  \\_/ \\___|_|');

  console.log('\n\n');
  console.log('                             ▄██▄');
  console.log('                             ▀███');
  console.log('               ▄▄▄▄▄            █');
  console.log('              ▀▄    ▀▄          █');
  console.log('          ▄▀▀▀▄ █▄▄▄▄█▄▄ ▄▀▀▀▄  █');
  console.log('         █  ▄  █        █   ▄ █ █');
  console.log('         ▀▄   ▄▀        ▀▄   ▄▀ █');
  console.log('          █▀▀▀            ▀▀▀ █ █       Domain Driven Develop all the things!!!!');
  console.log('▄▀▄▄▀▄    █  ▄█▀█▀█▀█▀█▀█▄    █ █');
  console.log('█▒▒▒▒█    █  █████████████▄   █ █                 THANKS FOR WATCHING');
  console.log('█▒▒▒▒█    █    ██████████████ █ █');
  console.log('█▒▒▒▒█   ██   ██████████████  █ █');
  console.log('▀████▀  ██▀█  █████████████▀  █▄█            ¿¿¿   Q U E S T I O N S   ???');
  console.log('  ██   ██  ▀█  █▄█▄█▄█▄█▄█▀  ▄█▀');
  console.log('  ██  ██    ▀█             ▄▀▓█');
  console.log('  ██ ██      ▀█▀▄▄▄▄▄▄▄▄▄▀▀▓▓▓█');
  console.log('  ████        █▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█');
  console.log('  ██         ▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█');
  console.log('  ██        ▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█');
  console.log('  ██       ▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▌');
  console.log('  ██      ▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▌');
  console.log('  ██     ▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▌');
  console.log('  ██     ▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▌\n\n');
}
