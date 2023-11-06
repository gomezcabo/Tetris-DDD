import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board-cell',
  templateUrl: './board-cell.component.html',
})
export class BoardCellComponent {
  @Input('color') color: string = 'blue';
}
