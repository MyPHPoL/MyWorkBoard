import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css'],
})
export class NewCardComponent {

  name!: string;
  priority!: number;
  color!: string;

  constructor(private ref:MatDialogRef<NewCardComponent>, private builder:FormBuilder){}

  addCard(formValues: object){
    console.log(formValues);
    this.closeWindow();
  }

  closeWindow(){
    this.ref.close();
  }
}
