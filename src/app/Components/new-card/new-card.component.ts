import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Card } from '../../card';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css'],
})
export class NewCardComponent {

  constructor(private ref: MatDialogRef<NewCardComponent>, @Inject(MAT_DIALOG_DATA) public data: Card) { }

  closeWindow() {
    this.ref.close();
  }
}
