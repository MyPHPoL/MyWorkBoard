import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { Card } from '../../card';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewCardComponent } from '../new-card/new-card.component';
import { Board } from '../../board';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardListService } from '../../Services/board-list.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent {
  @Output() newItemEvent = new EventEmitter<number>();
  route: ActivatedRoute = inject(ActivatedRoute);
  boardListService = inject(BoardListService);
  board: Board = new Board();
  boardID: string = 'none';

  constructor(public dialog: MatDialog, private router: Router) {
    this.boardID = this.route.snapshot.params['board.Id'];
    this.boardListService.getBoard(this.boardID).subscribe(board =>{ 
    if(board==undefined){
        this.router.navigate(['/home']);
        throw new Error("Board not found")
    }else{
      this.board = board
      }
    });
  }

  drop(event: CdkDragDrop<Card[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.updateBoard();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.updateBoard();
    }
  }

  // popup modal dialog
  openDialog(): void {
    let dialogRef = null;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '405px';
    dialogConfig.height = '415px';
    dialogConfig.data = { name: '', priority: undefined, color: '' }; // data we give to the dialog window

    dialogRef = this.dialog.open(NewCardComponent, dialogConfig); // opens dialog window

    // happens after user clicks 'Accept'
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result.name, result.priority, result.color);
        var newCard: Card = new Card(undefined, result.name, result.priority, result.color);
        this.board.addCard(newCard);
        this.boardListService.updateBoard(this.boardID, this.board).subscribe();
      }
    });
  }

  deleteCard(index: number): void {
    this.board.deleteCard(index);
  }

  jsontest(): void {
    console.log(JSON.stringify(this.board));
  }

  updateBoard(): void {
    this.boardListService.updateBoard(this.boardID, this.board).subscribe();
  }
}
