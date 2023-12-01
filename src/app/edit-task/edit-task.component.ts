import { Component, Inject } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Card } from '../card';
import { Task } from '../task';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

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
