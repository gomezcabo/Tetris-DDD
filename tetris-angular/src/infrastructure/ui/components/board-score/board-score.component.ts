import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board-score',
  templateUrl: './board-score.component.html',
})
export class BoardScoreComponent {
  @Input() score = 0;
}
