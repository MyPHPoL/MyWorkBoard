import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation, inject, Input } from '@angular/core';
import { BoardListService } from '../../Services/board-list.service';
import { Board } from '../../board';
import { NewBoardComponent } from '../new-board/new-board.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  boards: Board[] = [];
  boardsService: BoardListService = inject(BoardListService);
  @Output() newItemEvent = new EventEmitter<number>();
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  currStyle: string = 'blue';
  boardID:string = ''; //used in order to redirect if currently open board is deleted

  constructor(private renderer: Renderer2, private elRef: ElementRef, public dialog: MatDialog, private router: Router) {
    this.renderer.addClass(document.body, 'blue');
    this.boardsService.getBoards().subscribe(boards => this.boards = boards);
  }

  ngOnInit(): void {
    this.boardID = this.router.url.slice(7);
   }

  SideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  // popup modal dialog
  openDialog(opt: string, id: string): void {
    let dialogRef = null;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '260px';
    dialogConfig.height = '260px';
    dialogConfig.data = { name: '' }; // data we give to the dialog window


    if (opt === 'editBoard') // edit board
    {
      let eBoard: Board = {} as Board;
      this.boardsService.getBoard(id).subscribe(board => {
        eBoard = board;

        dialogConfig.data = { name: eBoard.name };

        dialogRef = this.dialog.open(NewBoardComponent, dialogConfig); // opens dialog window

        // happens after user clicks 'Accept'
        dialogRef.afterClosed().subscribe(result => {
          if (result !== undefined) {
            console.log(result.name);
            this.boardsService.editBoard(id, result.name).subscribe(ret => this.boards[this.boards.findIndex(b => b.Id == id)].name = result.name);
          }
        });
      });
    } else if (opt === 'addBoard') {
      dialogRef = this.dialog.open(NewBoardComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          console.log(result.name,);
          var newBoard: Board = new Board(undefined, undefined, result.name,);
          this.boardsService.addBoard(newBoard).subscribe(ret => this.boards.push(newBoard));
        }
      });
    }
  }

  test(value: string): boolean{
    if (this.router.url.slice(7) == value ) {
      this.deleteBoard(value);
      return true;
    }else{
      this.deleteBoard(value);
    return false;
    }

  }
  deleteBoard(value: string): void {
    if (confirm("Are you sure you want to delete this board?")) {
      this.boardsService.deleteBoard(value).subscribe(ret => this.boards.splice(this.boards.findIndex(b => b.Id == value), 1));
    }
    console.log(this.boardID);
      console.log(value);
  }

  ChangeTheme(opt: string): void {
    this.renderer.removeClass(document.body, this.currStyle);
    this.currStyle = opt;
    this.renderer.addClass(document.body, this.currStyle);
    console.log(this.boardID)
    console.log(this.router.url.slice(7));
  }
}
