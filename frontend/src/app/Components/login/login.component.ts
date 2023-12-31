import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../../Services/user.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggedStatus: boolean = false;
  
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  constructor(
    private userService: UserService,
    private router: Router,
    private _loginService: LoginService
  ) { }

  login() {
    if (!this.loginForm.valid) {
  
      return;
    }
    this.userService.login(this.loginForm.value.email,this.loginForm.value.password).pipe(
      // route to home, if login was successfull
      catchError(this.handleError),
      tap(() => {
        this.router.navigate(['/home']);
        this.loggedIn();
      })
    ).subscribe()
  }

  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else if (error.status === 400) {
      // 400 - "Incorrect username or password"
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        alert("Incorrect username or password");
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  loggedIn() {
    this._loginService.loggedStatus = true;
  }
}
