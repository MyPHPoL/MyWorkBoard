import { Component, inject } from '@angular/core';
import { Board } from '../board';
import { BoardListService } from '../board-list.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css'],
})
export class BoardListComponent {
  boards: Board[] = [];
  boardsService: BoardListService = inject(BoardListService);
  
  constructor(){
    this.boards = this.boardsService.getBoards();
  }
}
