import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BoardListService } from '../../Services/board-list.service';
import { Board } from '../../board';
import { NewBoardComponent } from '../new-board/new-board.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { LoginService } from 'src/app/Services/login.service';
import { BoardUsersService } from 'src/app/Services/board-users.service';
import { User } from 'src/app/user';
import { AddUserComponent } from '../add-user/add-user.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class HeaderComponent implements OnInit {
  boards: Board[] = [];
  tmp: Board[] = [];
  userService: UserService = inject(UserService);
  boardsService: BoardListService = inject(BoardListService);
  boardUsersService: BoardUsersService = inject(BoardUsersService);
  @Output() newItemEvent = new EventEmitter<number>();
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  inBoardStatus: boolean = false;
  currStyle: string = 'blue';
  boardID:string = ''; //used in order to redirect if currently open board is deleted
  users: User[] = [];


  constructor(private renderer: Renderer2, private elRef: ElementRef, public dialog: MatDialog, private router: Router, public _loginService: LoginService) {
    this.renderer.addClass(document.body, 'blue');
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd && val.url == "/home"){
        this.refreshBoards();
      }
      if(val instanceof NavigationEnd && val.url.slice(0,7) == "/board/"){
        this.inBoardStatus = true;
        this.getUsers();
      }
      if(val instanceof NavigationEnd && val.url == "/home" && this.inBoardStatus == true){
        this.inBoardStatus = false;
      }
      
    });
    try{
      this.boardsService.getBoards().subscribe(boards => this.tmp = boards);
    }catch{
    }
    
    
  }

  ngOnInit(): void {
    this.boardID = this.router.url.slice(7);
    this.userService.getUser().pipe(
      // route to home, if login was successfull
      catchError(this.handleError),
      tap(() => {
        this._loginService.loggedStatus = true;
        this.router.navigate(['/home']);
      })
    ).subscribe()
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
            this.boardsService.editBoard(id, result.name).pipe(
              catchError(this.handleError)).subscribe(ret => this.boards[this.boards.findIndex(b => b.Id == id)].name = result.name);
          }
        });
      });
    } else if (opt === 'addBoard') {
      dialogRef = this.dialog.open(NewBoardComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          var newBoard: Board = new Board(undefined, undefined, result.name,);
          this.boardsService.addBoard(newBoard).subscribe(ret => this.boards.push(newBoard));
        }
      });
    } else if (opt === 'addUser') {
      dialogRef = this.dialog.open(AddUserComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.boardUsersService.addUser(result.email, this.router.url.slice(7)).subscribe(ret => this.getUsers());
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
  deleteBoard(value: string) {
    if (confirm("Are you sure you want to delete this board?")) {
      this.boardsService.deleteBoard(value).pipe(
        catchError(this.handleError)).subscribe(ret => this.boards.splice(this.boards.findIndex(b => b.Id == value), 1));
    }
  }

  ChangeTheme(opt: string): void {
    this.renderer.removeClass(document.body, this.currStyle);
    this.currStyle = opt;
    this.renderer.addClass(document.body, this.currStyle);
  }

  temporary_login_fix():void{
    if(this._loginService.loggedStatus == false && (this.tmp.length >0)){
      this.boards = this.tmp;
      this._loginService.loggedStatus = true;
  }
  }
  logout():void{
    this.userService.logout().subscribe(ret => {
      this._loginService.loggedStatus = false;
      this.router.navigate(['/home']);
    });
  }

  getUsers():void{
    this.boardUsersService.getUsers(this.router.url.slice(7)).subscribe(ret => {
      this.users = ret;
    });
  }
  removeUser(email:string):void{
    this.boardUsersService.removeUser(email,this.router.url.slice(7))
      .pipe(catchError(this.handleError))
    .subscribe(ret => {
      this.getUsers();
    })
  }

  leaveBoard(boardId: string):void{
    if (confirm("Are You sure You want to leave the board?")) {
      this.boardUsersService.leaveBoard(boardId).pipe(
        catchError(this.handleError)).subscribe(ret => this.boards.splice(this.boards.findIndex(b => b.Id == boardId), 1));
    }

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
    } else if (error.status === 403 || error.status === 404) {
      // 403 - "access denied"
        alert("Can't perform action.");
    } else if (error.status === 200) {
      // 200 - "OK"
      alert("Action performed.");
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

 
}
