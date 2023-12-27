import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { User } from '../../user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    name: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required])
  },
    // add custom Validators to the form, to make sure that password and passwordConfirm are equal
   // { validators: CustomValidators.passwordsMatching }
  )

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  register() {
    if (!this.registerForm.valid) {
      return;
    }
    this.userService.register(this.registerForm.value).pipe(
      // If registration was successfull, then navigate to login route
      tap(() => this.router.navigate(['../home']))
    ).subscribe();
  }

}
