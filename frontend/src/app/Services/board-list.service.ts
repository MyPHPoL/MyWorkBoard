import { Injectable } from '@angular/core';
import { Board, IBoard } from '../board';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardListService {

  protected boardList: Board[] = [];
  private url = 'http://localhost:3000/boards';
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };
  getBoards(): Observable<Board[]> {
    return this.http.get<IBoard[]>(this.url,{
      withCredentials: true
    })
      .pipe(
        map((boards: IBoard[]) =>
          {
            console.log(boards);
            return boards.map(board =>
            new Board().fromJSON(board))}
        ),
        //catchError(this.handleError<Board[]>('getBoards', []))
        );
  }

  getBoard(id: string): Observable<Board> {
    return this.http.get<IBoard>(`${this.url}/${id}`,this.httpOptions)
      .pipe(
        map((board: IBoard) => {
          console.log(board)
          return new Board().fromJSON(board)
        }),
        catchError(this.handleError<Board>(`getBoard id=${id}`))
      );
  }

  addBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(this.url, board, this.httpOptions)
      .pipe(
        map((board: Board) => {
          console.log('new board')
          console.log(board)
          return new Board(board.Id,board.cards,board.name)
        }),
        catchError(this.handleError<Board>('addBoard'))
      );
  }

  editBoard(boardId: string, newName: string): Observable<Board> {

    return this.http.patch<Board>(`${this.url}/${boardId}`, { name: newName }, this.httpOptions)
      .pipe(
        catchError(this.handleError<Board>('editBoard'))
      );
  }

  deleteBoard(boardId: string): Observable<Board> {
    return this.http.delete<Board>(`${this.url}/${boardId}`,this.httpOptions)
      .pipe(
        catchError(this.handleError<Board>('deleteBoard'))
      );
  }

  // updates db.json when user drags a card to a different column, or when user adds a new card, or when user deletes a card, etc.
  updateBoard(id: string, updatedBoard: Board): Observable<Board> {
    return this.http.put<IBoard>(`${this.url}/${id}`, updatedBoard, this.httpOptions)
      .pipe(
        map((board: IBoard) => new Board().fromJSON(board)),
        catchError(this.handleError<Board>('updateBoard'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed' + error);
      return of(result as T);
    };
  }
}
