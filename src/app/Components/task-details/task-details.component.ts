import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {

  colorDone: string = 'green';
  colorDue: string = 'red';

  constructor(private ref:MatDialogRef<TaskDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: Task){}


}
