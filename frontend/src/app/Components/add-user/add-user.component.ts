import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  constructor(private ref: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA) public data: User) { }

  closeWindow(): void {
    this.ref.close();
  }
}
