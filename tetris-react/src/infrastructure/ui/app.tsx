import * as React from "react";
import { Board } from "../../domain/models/board";
import { BoardService } from "../../domain/services/services";
import { TetrisBoard } from "./board";
import { GameOverDialog } from "./game-over-dialog";

export function App() {
  const [board, setBoard] = React.useState<Board>(BoardService.getInitialBoard());

  // Move down the current block
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (board.status === "game-over") return;
      setBoard((board) => BoardService.moveCurrentBlockDown(board));
    }, 1000);
    return () => clearTimeout(timer);
  }, [board.status]);

  // Keyboard event listener
  React.useEffect(() => {
    const keydownListener = ({ key }: KeyboardEvent) => {
      if (board.status === "game-over") return;

      if (key === "ArrowLeft") setBoard((board) => BoardService.moveCurrentBlockLeft(board));
      else if (key === "ArrowRight") setBoard((board) => BoardService.moveCurrentBlockRight(board));
      else if (key === "ArrowDown") setBoard((board) => BoardService.moveCurrentBlockDown(board));
      else if (key === "ArrowUp") setBoard((board) => BoardService.rotateCurrentBlock(board));
      else if (key === "Enter") setBoard((board) => BoardService.moveCurrentBlockDown(board, true));
    };

    document.addEventListener("keydown", keydownListener);
    return () => document.removeEventListener("keydown", keydownListener);
  }, [board.status]);

  return (
    <div className="p-6 md:p-10 bg-blue-300 h-screen relative">
      <TetrisBoard board={board} />
      {board.status === "game-over" && (
        <GameOverDialog score={board.score} onRestart={() => setBoard(BoardService.getInitialBoard())} />
      )}
    </div>
  );
}
