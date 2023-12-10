import { Injectable } from '@angular/core';
import { Board } from './board';
import { Card } from './card';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class BoardListService {

  protected boardList: Board[] = [new Board(undefined, [new Card(undefined, 'Card1', 3, 'white', [new Task(undefined, 'Task1', undefined, undefined, undefined, 'Task1desc', 3, false), new Task(undefined, 'Task2', undefined, undefined, undefined, 'Task2desc', 3, false)]), new Card(undefined, 'Card2', 5, 'yellow', [])]), new Board(undefined, [new Card(undefined, 'Card1', 3, 'white', [new Task(undefined, 'Task1', undefined, undefined, undefined, 'Task1desc', 3, false), new Task(undefined, 'Task2', undefined, undefined, undefined, 'Task2desc', 3, false)]), new Card(undefined, 'Card3', 5, 'yellow', [])])];;
  
  constructor() {}

  getBoards() : Board[] {
    return this.boardList;
  }

  getBoard(id: string): Board {
    const board = this.boardList.find(t => t.Id === id);
    if (!board) {
      throw new Error(`Board with id ${id} not found`);
    }
  
    return board;
   }

  addBoard(board: Board){
    this.boardList.push(board)
  }
}
