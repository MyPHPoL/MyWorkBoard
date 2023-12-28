import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';
import { UserService } from '../../Services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() isLogged = new EventEmitter<boolean>();
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  login() {
    if (!this.loginForm.valid) {
  
      return;
    }
    this.userService.login(this.loginForm.value.email,this.loginForm.value.password).pipe(
      // route to home, if login was successfull
      
      tap(() => {
        this.router.navigate(['/home']);
        this.isLogged.emit(true);
      })
    ).subscribe()

  }
}
