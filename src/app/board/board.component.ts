import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../card';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewCardComponent } from '../new-card/new-card.component';
import { Board } from '../board';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input()
  board: Board = new Board;

  constructor(public dialog: MatDialog) {}

  addCard() {
    var newCard = new Card('My Card', 0, '#e5e7e9');
    this.board.addCard(newCard);
    console.log('Card added:', newCard);
  }

  openDialog() : void {
    let dialogRef = null;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='405px';
    dialogConfig.height='415px';
    dialogConfig.data= {name: '', priority: '', color: ''};

    dialogRef = this.dialog.open(NewCardComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        var newCard = new Card(result.setName, result.setPriority, result.setColor);
        this.board.addCard(newCard);
      }
    });
  }
}
