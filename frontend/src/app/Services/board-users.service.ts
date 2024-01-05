import { Injectable } from '@angular/core';
import { Board, IBoard } from '../board';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../user';
type AddRequest = {
  userEmail: string;
  boardId: string;
}
type RemoveRequest = {
userEmail: string;
}
@Injectable({
  providedIn: 'root'
})

export class BoardUsersService {
  private url = 'http://localhost:3000/board';
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };


  getUsers(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users?id=${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<User[]>('getUsers'))
      );
  }

  addUser(email: string, Id: string): Observable<AddRequest> {
    const addRequest: AddRequest = {
      userEmail: email,
      boardId: Id
    }
    return this.http.post<AddRequest>(`${this.url}/add`, addRequest , this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('addUser'))
      );
  }

  removeUser(email: string, boardId:string): Observable<void> {
    const removeRequest = {
    userEmail: email,
    }
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: removeRequest,
      withCredentials: true
    };
    return this.http.delete<void>(`${this.url}/remove?id=${boardId}`, options);
  }

  leaveBoard(boardId: string): Observable<Board> {
    return this.http.delete<Board>(`${this.url}/leave?id=${boardId}`,this.httpOptions)
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
