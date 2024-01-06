import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user';

type LoginDto = {
  name: string;
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
  protected httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };

  login(email: string, password: string): Observable<null> {
   
    return this.http.post<null>(`${this.url}/login`, { email, password }, this.httpOptions)
  }
  getUser(): Observable<User | null> {
    return this.http.get<User | null>(`${this.url}/`, this.httpOptions)
      .pipe(
        map((user: User | null) => user ? new User(user.Id, user.name, user.email) : null)
      );
  }

  //  email: z.string().email(),
	// 	name: z.string().min(4).max(31),
	// 	password: z.string().min(6).max(255)
  register(value: any): Observable<void> {
    return this.http.post<void>(`${this.url}/register`, value, this.httpOptions)
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.url}/logout`, {}, this.httpOptions)
  }

}



