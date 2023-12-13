import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { BoardListService } from '../board-list.service';
import { Board } from '../board';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit{
  boards: Board[] = [];
  boardsService: BoardListService = inject(BoardListService);
  test: any; 

  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  currStyle: string = 'blue';

  constructor(private renderer: Renderer2, private elRef: ElementRef){
    this.renderer.addClass(document.body, 'blue');
    this.boards = this.boardsService.getBoards();

    /* THIS \/\/ could be used with working HTTP requests, but since we don't have a working backend this won't be utilized at the moment
    this.boardsService.getBoards().subscribe(boards => this.boards = boards);
    it needs to be pointed that this function works, but since we don't have POST nor PATCH boards won't update
    (which is crucial for the presentation) */
    
    this.test =  this.boardsService.getBoards();
  }

  ngOnInit(): void {}

  SideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  ChangeTheme(opt: string){

    this.renderer.removeClass(document.body, this.currStyle);
    this.currStyle = opt;
    this.renderer.addClass(document.body, this.currStyle);
  }
}
