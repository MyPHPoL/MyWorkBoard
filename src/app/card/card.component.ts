import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';
import { Card } from '../card';
import { Task } from '../task';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  @Input() card!: Card;
  @Input() item!: number;
  @Output() newItemEvent = new EventEmitter<number>();

  drop(event: CdkDragDrop<Task[]>) {
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
    this.card.addTask(newTaskForm.value.newTask);
    newTaskForm.reset();
  }

  deleteCard(value: number) {
    console.log(value);
    this.newItemEvent.emit(value);
  }
}
