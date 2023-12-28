import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors } from "@angular/forms";
@Component({
  selector: 'app-register-validator',
  templateUrl: './register-validator.component.html',
  styleUrls: ['./register-validator.component.css']
})
export class RegisterValidatorComponent {
  static passwordsMatching(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;
    if ((password === repeatPassword) && (password !== null && repeatPassword !== null)) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }

  static passwordRequirements(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;

    if (password.length < 6 || password.length > 255) {
      return { invalidPassword: true };
    } else {
      return null;
    }
  }

  static nameRequirements(control: AbstractControl): ValidationErrors | null {
    const name = control.get('name')?.value;

    if (name.length < 4 || name.length > 31) {
      return { invalidName: true };
    } else {
      return null;
    }
  }
}
