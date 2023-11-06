import { BOARD_COLS, BOARD_ROWS, Board, BoardCellValue } from "../../../../domain/models/board";
import { BoardService } from "../../../../domain/services/services";
import { BoardScore } from "./board-score";

function mapCellValueToTailwindBackgroundColor(value: BoardCellValue): string {
  return {
    I: "bg-cyan-500",
    J: "bg-blue-500",
    L: "bg-orange-500",
    O: "bg-yellow-400",
    S: "bg-green-500",
    T: "bg-violet-500",
    Z: "bg-red-500",
    default: "bg-gray-300",
  }[value ?? "default"];
}

const boardStyles = {
  aspectRatio: `${BOARD_COLS}/${BOARD_ROWS}`,
  gridTemplateRows: `repeat(${BOARD_ROWS}, minmax(0, 1fr))`,
  gridTemplateColumns: `repeat(${BOARD_COLS}, minmax(0, 1fr))`,
};

function BoardCell({ value }: { value: BoardCellValue }) {
  return <div className={`rounded-sm text-xs ${mapCellValueToTailwindBackgroundColor(value)}`}></div>;
}

export function TetrisBoard({ board }: { board: Board }) {
  const cellValues = BoardService.getCellValues(board);

  return (
    <div className="h-full flex">
      <div className="shadow-xl w-auto h-full mx-auto rounded-lg bg-white relative">
        <div className="h-full grid grid-rows-20 grid-cols-10 gap-px p-2" style={boardStyles}>
          {cellValues.map((value, index) => (
            <BoardCell value={value} key={index} />
          ))}
          <BoardScore score={board.score} />
        </div>
      </div>
    </div>
  );
}
