import { Component, HostListener, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { BoardService } from 'src/domain/services/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  board = BoardService.getInitialBoard();

  ngOnInit(): void {
    interval(1000).subscribe((tick) => {
      if (this.board.status === 'game-over') return;
      this.board = BoardService.moveCurrentBlockDown(this.board);
    });
  }

  onRestart(): void {
    this.board = BoardService.getInitialBoard();
  }

  @HostListener('document:keydown', ['$event'])
  messageListener({ key }: KeyboardEvent): void {
    if (key === 'ArrowLeft') this.board = BoardService.moveCurrentBlockLeft(this.board);
    else if (key === 'ArrowRight') this.board = BoardService.moveCurrentBlockRight(this.board);
    else if (key === 'ArrowDown') this.board = BoardService.moveCurrentBlockDown(this.board);
    else if (key === 'ArrowUp') this.board = BoardService.rotateCurrentBlock(this.board);
    else if (key === 'Enter') this.board = BoardService.moveCurrentBlockDown(this.board, true);
  }
}
