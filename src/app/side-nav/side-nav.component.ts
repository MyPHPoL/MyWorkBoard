import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})



export class SideNavComponent implements OnInit{

  @Input() sideNavStatus: boolean = false;

  constructor(){}
  list =[
    {
      number: '1',
      name: 'home',
      icon: 'fa-solid fa-house',
      route: '/home',
    },
    {
      number: '2',
      name: 'groups',
      icon: 'fa-solid fa-layer-group',
      route: '/home',
    },
    {
      number: '3',
      name: 'private',
      icon: 'fa-solid fa-user-secret',
      route: '/home',
    }
  ]
  ngOnInit(): void {
      
  }
}
