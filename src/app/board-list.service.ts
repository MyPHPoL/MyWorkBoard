import { Injectable } from '@angular/core';
import { Board, IBoard } from './board';

@Injectable({
  providedIn: 'root'
})
export class BoardListService {

  protected boardData: IBoard[] = [
    {
      "id": "8001fe3b-8ad2-e459-ba1c-cd43e12cbe43",
      "cards": [
        {
          "id": "505001fe-14b2-5543-ef26-2a81c94bffbb",
          "name": "Board Card 1",
          "taskList": [
            {
              "id": "7b55389a-3544-ee53-af7b-807ecf6ac653",
              "content": "Task1",
              "creationDate": "2023-12-10T14:24:38.907Z",
              "hasNotDue": true,
              "dueDate": "2023-12-10T14:24:38.907Z",
              "desc": "Task1desc",
              "priority": 3,
              "isDone": false
            },
            {
              "id": "d36e2138-fb35-7885-2664-ff254e5c0e9b",
              "content": "Task2",
              "creationDate": "2023-12-10T14:24:38.907Z",
              "hasNotDue": true,
              "dueDate": "2023-12-10T14:24:38.907Z",
              "desc": "Task2desc",
              "priority": 3,
              "isDone": false
            }
          ],
          "priority": 3,
          "color": "#e5e7e9"
        },
        {
          "id": "72656ea9-3bfd-be63-8577-8be54ba2c52b",
          "name": "Board Card 2",
          "taskList": [],
          "priority": 5,
          "color": "#fcf3cf"
        }
      ]
    },
    {
      "id": "c55facc2-b7fd-a3ae-c1cb-b707a913da85",
      "cards": [
        {
          "id": "8b290004-a550-466b-05aa-e33cb21197c5",
          "name": "Other Board Card 1",
          "taskList": [
            {
              "id": "803f3ed5-ef41-384c-3588-1a5a90114532",
              "content": "Task1",
              "creationDate": "2023-12-10T14:24:38.907Z",
              "hasNotDue": true,
              "dueDate": "2023-12-10T14:24:38.907Z",
              "desc": "Task1desc",
              "priority": 3,
              "isDone": false
            },
            {
              "id": "821ce5da-67e0-8725-c759-c6389aa1305e",
              "content": "Task2",
              "creationDate": "2023-12-10T14:24:38.907Z",
              "hasNotDue": true,
              "dueDate": "2023-12-10T14:24:38.907Z",
              "desc": "Task2desc",
              "priority": 3,
              "isDone": false
            }
          ],
          "priority": 3,
          "color": "#c0392b"
        },
        {
          "id": "8fa15957-9100-39b5-86f8-4f8b9176218d",
          "name": "Other Board Card 2",
          "taskList": [],
          "priority": 5,
          "color": "#85c1e9"
        }
      ]
    }
  ]

  // iterate through each Board object in json boardData and generate new instance of Board
  protected boardList: Board[] = this.boardData.map((boardData) => new Board().fromJSON(boardData));

  constructor() { }

  getBoards(): Board[] {
    return this.boardList;
  }

  getBoard(id: string): Board {
    const board = this.boardList.find(t => t.Id === id);
    if (!board) {
      throw new Error(`Board with id ${id} not found`);
    }

    return board;
  }

  addBoard(board: Board) {
    this.boardList.push(board)
  }

  /*
  getBoards(): Observable<Board[]> {
    return this.http.get<IBoard[]>(this.url) 
      .pipe(
          map((boards: IBoard[])=> 
              boards.map(board=> 
                  new Board().fromJSON(board))
      ),  
      catchError(this.handleError<Board[]>('getBoards', [])) );    
  }

  getBoard(id: string): Observable<Board> {
    return this.http.get<IBoard>(`${this.url}/${id}`)
      .pipe(
        map((board: IBoard) => new Board().fromJSON(board)),
        catchError(this.handleError<Board>(`getBoard id=${id}`))
      );
  }

  addBoard(board: Board) {
    this.boardList.push(board)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed' + error);
      return of(result as T);
    };
  }
  */
}
