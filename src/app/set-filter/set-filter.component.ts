import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Card } from '../card';

@Component({
  selector: 'app-set-filter',
  templateUrl: './set-filter.component.html',
  styleUrls: ['./set-filter.component.css']
})
export class SetFilterComponent {
  constructor(private ref: MatDialogRef<SetFilterComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeWindow() {
    this.ref.close();
  }
}
