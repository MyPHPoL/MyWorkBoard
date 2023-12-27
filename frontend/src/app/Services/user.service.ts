import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user';

type LoginDto = {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})

export class UserService {


  protected user: User | null = null;
  private url = 'http://localhost:3000/user';
  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    };
    return this.http.post<null>(`${this.url}/login`, { email, password }, httpOptions)
  }
  getUser(): Observable<User | null> {
    return this.http.get<User | null>(`${this.url}`)
      .pipe(
        map((user: User | null) => user ? new User(user.Id, user.name, user.email) : null)
      );
  }
  
}



