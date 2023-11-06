import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { BOARD_COLS, BOARD_ROWS, Board, BoardCellValue } from 'src/../../domain/models/board';
import { BoardService } from 'src/../../domain/services';

const boardStyles = {
  aspectRatio: `${BOARD_COLS}/${BOARD_ROWS}`,
  gridTemplateRows: `repeat(${BOARD_ROWS}, minmax(0, 1fr))`,
  gridTemplateColumns: `repeat(${BOARD_COLS}, minmax(0, 1fr))`,
};

const getTailwindBackgroundColorFromCellValue = (value: BoardCellValue): string => {
  return {
    I: 'bg-cyan-500',
    J: 'bg-blue-500',
    L: 'bg-orange-500',
    O: 'bg-yellow-400',
    S: 'bg-green-500',
    T: 'bg-violet-500',
    Z: 'bg-red-500',
    default: 'bg-gray-300',
  }[value ?? 'default'];
};

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnChanges {
  @Input() board: Board = BoardService.getInitialBoard();
  public cellColors: string[] = [];
  boardStyles = boardStyles;

  constructor(private detectorRef: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.cellColors = BoardService.getCellValues(this.board).map((value: BoardCellValue) =>
      getTailwindBackgroundColorFromCellValue(value)
    );
    this.detectorRef.detectChanges();
  }
}
