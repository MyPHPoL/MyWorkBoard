import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit{

  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  currStyle: string = 'blue';

  constructor(private renderer: Renderer2, private elRef: ElementRef){
    this.renderer.addClass(document.body, 'blue');
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
