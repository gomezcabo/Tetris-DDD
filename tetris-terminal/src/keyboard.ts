import readline from 'readline';

export function configureKeyboard() {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (_, key) => {
    if ((key && key.name == 'q') || (key.name === 'c' && key.ctrl)) process.exit();
  });
}
