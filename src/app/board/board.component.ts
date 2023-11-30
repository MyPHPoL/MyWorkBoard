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

  // not in use anymore
  addCard() {
    var newCard = new Card(undefined, 'My Card', 0, '#e5e7e9');
    this.board.addCard(newCard);
    console.log('Card added:', newCard);
  }

  // popup modal dialog
  openDialog() : void {
    let dialogRef = null;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='405px';
    dialogConfig.height='415px';
    dialogConfig.data= {name: '', priority: '', color: ''}; // data we want to get from popup

    dialogRef = this.dialog.open(NewCardComponent,dialogConfig); // opens dialog window

    // happens after user clicks 'Add Card'
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        var newCard = new Card(undefined, result.Name, result.Priority, result.Color);
        this.board.addCard(newCard);
      }
    });
  }

  deleteCard(index: number){
    this.board.deleteCard(index);
  }
  
}
