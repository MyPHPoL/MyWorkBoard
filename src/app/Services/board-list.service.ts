import { Injectable } from '@angular/core';
import { Board, IBoard } from '../board';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // only needed when using db.json
import { Observable, of } from 'rxjs'; // only needed when using db.json
import { catchError, map } from 'rxjs/operators'; // only needed when using db.json

@Injectable({
  providedIn: 'root'
})
export class BoardListService {

  protected boardList: Board[] = [];
  private url = 'http://localhost:3000/boards'; // only needed when using db.json
  constructor(private http: HttpClient) { } // only needed when using db.json

  getBoards(): Observable<Board[]> {
    return this.http.get<IBoard[]>(this.url)
      .pipe(
        map((boards: IBoard[]) =>
          boards.map(board =>
            new Board().fromJSON(board))
        ),
        catchError(this.handleError<Board[]>('getBoards', [])));
  }

  getBoard(id: string): Observable<Board> {
    return this.http.get<IBoard>(`${this.url}/${id}`)
      .pipe(
        map((board: IBoard) => new Board().fromJSON(board)),
        catchError(this.handleError<Board>(`getBoard id=${id}`))
      );
  }

  addBoard(board: Board): Observable<Board> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Board>(this.url, board, httpOptions)
      .pipe(
        catchError(this.handleError<Board>('addBoard'))
      );
  }

  editBoard(boardId: string, newName: string): Observable<Board> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.patch<Board>(`${this.url}/${boardId}`, { name: newName }, httpOptions)
      .pipe(
        catchError(this.handleError<Board>('editBoard'))
      );
  }

  deleteBoard(boardId: string): Observable<Board> {
    return this.http.delete<Board>(`${this.url}/${boardId}`)
      .pipe(
        catchError(this.handleError<Board>('deleteBoard'))
      );
  }

  // updates db.json when user drags a card to a different column, or when user adds a new card, or when user deletes a card, etc.
  updateBoard(id: string, updatedBoard: Board): Observable<Board> {
    return this.http.put<IBoard>(`${this.url}/${id}`, updatedBoard)
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
