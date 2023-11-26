import { Component } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})
export class NewCardComponent {

  constructor(private ref:MatDialogRef<NewCardComponent>, private builder:FormBuilder){}

  closeWindow(){
    this.ref.close();
  }

  myForm = this.builder.group({
    name: this.builder.control('My Card'),
    priority: this.builder.control(0)
  });

  addCard(){
    console.log(this.myForm.value);
  }
}
