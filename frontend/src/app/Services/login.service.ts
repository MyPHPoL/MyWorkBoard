import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public loggedStatus: boolean = false;
  
  getLoginStatus(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      console.log(this.loggedStatus);
      observer.next(this.loggedStatus);
    } );
  }
}
