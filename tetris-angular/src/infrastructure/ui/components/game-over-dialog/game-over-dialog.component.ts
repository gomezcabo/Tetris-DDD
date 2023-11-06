import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-over-dialog',
  templateUrl: './game-over-dialog.component.html',
})
export class GameOverDialogComponent {
  @Input('score') score = 0;
  @Output() onRestart = new EventEmitter();
}
