import { Component, Inject } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Card } from '../card';
import { Task } from '../task';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  
  constructor(private ref:MatDialogRef<EditTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: Task){}

  closeWindow(){
    this.ref.close();
  }

}
