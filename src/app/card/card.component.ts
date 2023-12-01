import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';
import { Card } from '../card';
import { Task } from '../task';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewCardComponent } from '../new-card/new-card.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  @Input() card!: Card;
  @Input() item!: number;
  @Output() newItemEvent = new EventEmitter<number>();

  constructor(public dialog: MatDialog) {}

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
    this.card.addTask(newTaskForm.value.newTask, this.card.priority);
    newTaskForm.reset();
  }

  deleteCard(value: number) {
    console.log(value);
    this.newItemEvent.emit(value);
  }

  // for test purposes ()
  clickTest(task: Task) {
    console.log(task);
  }

  // THE SAME popup modal dialog AS NEW CARD 
  openDialog() : void {
    let dialogRef = null;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='405px';
    dialogConfig.height='415px';
    dialogConfig.data={name: this.card.name, priority: this.card.priority, color: this.card.color}; // data we give to the dialog window

    dialogRef = this.dialog.open(NewCardComponent,dialogConfig); // opens dialog window

    // happens after user clicks 'Accept'
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result.name, result.priority, result.color);
        this.card = new Card(this.card.Id, result.name, result.priority, result.color, this.card.taskList);
      }
    });
  }
}
