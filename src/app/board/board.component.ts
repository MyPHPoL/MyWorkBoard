import { Component, OnInit } from '@angular/core';
import { Card, CardComponent } from '../card/card.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewCardComponent } from '../new-card/new-card.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  cards: Card[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  addCard() {
    var newCard = new Card('moja karta', 0, 'yellow');
    this.cards.push(newCard);
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='50%';
    dialogConfig.height='350px';

    this.dialog.open(NewCardComponent, dialogConfig)
  }
}
