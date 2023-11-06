import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from '../components/board/board.component';
import { BoardCellComponent } from '../components/board-cell/board-cell.component';
import { BoardScoreComponent } from '../components/board-score/board-score.component';
import { GameOverDialogComponent } from '../components/game-over-dialog/game-over-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardCellComponent,
    BoardScoreComponent,
    GameOverDialogComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
