import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { Card } from '../card';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewCardComponent } from '../new-card/new-card.component';
import { Board } from '../board';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardListService } from '../board-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent {
  @Output() newItemEvent = new EventEmitter<number>();
  route: ActivatedRoute = inject(ActivatedRoute);
  boardListService = inject(BoardListService);
  board!: Board;
  boardID = 'none';

  constructor(public dialog: MatDialog) {
    this.boardID = this.route.snapshot.params['board.Id'];

    /* THIS \/\/ could be used with working HTTP requests, but since we don't have a working backend this won't be utilized at the moment
    this.boardListService.getBoard(this.boardID).subscribe(board => this.board = board);
    it needs to be pointed that this function works, but since we don't have POST nor PATCH boards won't update
    (which is crucial for the presentation) */

    this.board = this.boardListService.getBoard(this.boardID);
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

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
    dialogConfig.data= {name: '', priority: undefined, color: ''}; // data we give to the dialog window

    dialogRef = this.dialog.open(NewCardComponent,dialogConfig); // opens dialog window

    // happens after user clicks 'Accept'
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result.name, result.priority, result.color);
        var newCard = new Card(undefined, result.name, result.priority, result.color);
        this.board.addCard(newCard);
      }
    });
  }

  deleteCard(index: number){
    this.board.deleteCard(index);
  }

  jsontest(){
    console.log(JSON.stringify(this.board));
  }
  
}
