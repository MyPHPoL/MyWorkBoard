import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BoardListService } from '../../Services/board-list.service';
import { Board } from '../../board';
import { NewBoardComponent } from '../new-board/new-board.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { LoginService } from 'src/app/Services/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class HeaderComponent implements OnInit {
  boards: Board[] = [];
  userService: UserService = inject(UserService);
  boardsService: BoardListService = inject(BoardListService);
  @Output() newItemEvent = new EventEmitter<number>();
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  currStyle: string = 'blue';
  boardID:string = ''; //used in order to redirect if currently open board is deleted

  constructor(private renderer: Renderer2, private elRef: ElementRef, public dialog: MatDialog, private router: Router, public _loginService: LoginService) {
    this.renderer.addClass(document.body, 'blue');
    console.log("header constructor");

    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd && val.url == "/home"){
        this.refreshBoards();
      }
    });
  }

  ngOnInit(): void {
    this.boardID = this.router.url.slice(7);
   }

  refreshBoards(): void {
    this._loginService.getLoginStatus().subscribe((status: boolean) => {
      if(status == true){
        this.boardsService.getBoards().subscribe(boards => this.boards = boards);
    }else if(status == false){this.boards = []} //do nothing
    });
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

  deleteHandler(value: string): void{
    if (this.router.url.slice(7) == value ) {
      this.deleteBoard(value);
      this.router.navigate(['/home']);
    }else{
      this.deleteBoard(value);
    }

  }
  deleteBoard(value: string): void {
    if (confirm("Are you sure you want to delete this board?")) {
      this.boardsService.deleteBoard(value).subscribe(ret => this.boards.splice(this.boards.findIndex(b => b.Id == value), 1));
    }
  }

  ChangeTheme(opt: string): void {
    this.renderer.removeClass(document.body, this.currStyle);
    this.currStyle = opt;
    this.renderer.addClass(document.body, this.currStyle);
  }
  //not in use  
  login(email:string, password:string):void{
    
    this.userService.login(email, password).subscribe(ret => {
      console.log("logged in");
      this.router.navigate(['/home']);
    });
  }

  test():void{
    console.log(this._loginService.loggedStatus);
  }
  logout():void{
    this.userService.logout().subscribe(ret => {
      console.log("logged out");
      this._loginService.loggedStatus = false;
      this.router.navigate(['/home']);
    });
  }
}
