import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';
import { Guid } from 'guid-typescript';

export class Card{
  id: Guid = Guid.createEmpty();
  name: string = ' ';
  taskList: string[] = [];
  priority: number = 0;
  color: string = 'white';

  constructor(_name: string, _priority: number, _color: string){
    this.id = Guid.create();
    this.name = _name;
    this.priority = _priority;
    this.color = _color;
    this.taskList = [];
  }
  }


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  @Input() card!: Card;

  drop(event: CdkDragDrop<string[]>) {
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
 
  onSubmit(newTaskForm: NgForm) {
    this.card.taskList.push(newTaskForm.value.newTask);
    newTaskForm.reset();
  }
}
