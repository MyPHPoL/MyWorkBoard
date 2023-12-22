import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Board } from '../../board';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.css']
})
export class NewBoardComponent {
  constructor(private ref: MatDialogRef<NewBoardComponent>, @Inject(MAT_DIALOG_DATA) public data: Board) { }

  closeWindow(): void {
    this.ref.close();
  }
}
