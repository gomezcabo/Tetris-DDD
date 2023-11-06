import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardScoreComponent } from './board-score.component';

describe('BoardCellComponent', () => {
  let component: BoardScoreComponent;
  let fixture: ComponentFixture<BoardScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardScoreComponent],
    });
    fixture = TestBed.createComponent(BoardScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
