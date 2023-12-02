import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';
import { Card } from '../card';
import { Task } from '../task';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewCardComponent } from '../new-card/new-card.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { SetFilterComponent } from '../set-filter/set-filter.component';

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

  // filter off button
  filterOff(){
    this.card.filter=false;
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

  // Almost the same, but used for task edition
  openTaskDialog(i:number): void{
    let dialogRef = null;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='405px';
    dialogConfig.height='550px'; // below data injection might need improvement
    dialogConfig.data={content: this.card.taskList[i].content, hasNotDue: this.card.taskList[i].hasNotDue, dueDate: this.card.taskList[i].dueDate, priority: this.card.taskList[i].priority,isDone: this.card.taskList[i].isDone}; 

    dialogRef = this.dialog.open(EditTaskComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.card.taskList[i] = new Task(this.card.taskList[i].Id, result.content ,this.card.taskList[i].creationDate, result.hasNotDue, result.dueDate, this.card.taskList[i].color , result.priority, result.isDone);
      }
    });
  }

  // Smaller dialog for setting up the filter 
  openFilterDialog() : void {
    let dialogRef = null;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='405px';
    dialogConfig.height='260px';
    dialogConfig.data={name: this.card.name, filterValue: this.card.filterValue};

    dialogRef = this.dialog.open(SetFilterComponent,dialogConfig); // opens dialog window

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.card.filter = true;
        this.card.filterValue = result.filterValue;
      }
    });
  }
}
