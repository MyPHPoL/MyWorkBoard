import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  constructor(){}

  ngOnInit(): void {
    
}

SideNavToggle() {
  this.menuStatus = !this.menuStatus;
  this.sideNavToggled.emit(this.menuStatus);
}

}
