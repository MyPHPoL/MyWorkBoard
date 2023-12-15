import { Component, Inject } from '@angular/core';
import { Task } from '../task';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {

  today: Date = new Date();
  sol: boolean;
  constructor(private ref: MatDialogRef<EditTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: Task) {
    this.sol = data.hasNotDue;
  }

  closeWindow() {
    this.ref.close();
  }

}
