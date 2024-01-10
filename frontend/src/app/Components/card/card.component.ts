import { ChangeDetectorRef, Component, EventEmitter, Input, Output, AfterContentChecked } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';
import { Card } from '../../card';
import { Task } from '../../task';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewCardComponent } from '../new-card/new-card.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { SetFilterComponent } from '../set-filter/set-filter.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  @Input() card!: Card;
  @Input() item!: number;
  @Output() newItemEvent = new EventEmitter<number>(); // for deleting card
  @Output() newItemEvent2 = new EventEmitter<number>(); // for updating db.json
  filterValue: number = 0;
  filter: boolean = false;
  filterDone: boolean = false;
  sortType: number = 0;
  boardListService: any;
  constructor(public dialog: MatDialog, private changeDetector: ChangeDetectorRef) { }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.newItemEvent2.emit();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.newItemEvent2.emit();
    }
  }

  onSubmit(newTaskForm: NgForm): void {
    this.card.addTask(newTaskForm.value.newTask, this.card.priority);
    this.newItemEvent2.emit();
    newTaskForm.reset();
  }

  deleteCard(value: number): void {
    if (confirm("Are you sure you want to delete this card?")) {
      this.newItemEvent.emit(value);
    }
  }

  // filter off button
  filterOff(): void {
    this.filter = false;
    this.filterDone = false;
  }

  // 1 function handles all dialog windows
  openDialog(opt: string, i: number): void {
    let dialogRef = null;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (opt === 'editCard') // edit card
    {
      dialogConfig.width = '405px';
      dialogConfig.height = '415px';
      dialogConfig.data = { name: this.card.name, priority: this.card.priority, color: this.card.color }; // data we give to the dialog window

      dialogRef = this.dialog.open(NewCardComponent, dialogConfig); // opens dialog window

      // happens after user clicks 'Accept'
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          console.log(result.name, result.priority, result.color);
          this.card.name = result.name;
          this.card.priority = result.priority;
          this.card.color = result.color;
          this.newItemEvent2.emit();
        }
      });
    }
    if (opt === 'editTask') //edit task
    {
      dialogConfig.width = '405px';
      dialogConfig.height = '740px';
      dialogConfig.data = { content: this.card.taskList[i].content, hasNotDue: this.card.taskList[i].hasNotDue, dueDate: this.card.taskList[i].dueDate, priority: this.card.taskList[i].priority, isDone: this.card.taskList[i].isDone, desc: this.card.taskList[i].desc };

      dialogRef = this.dialog.open(EditTaskComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.card.taskList[i] = new Task(this.card.taskList[i].Id, result.content, this.card.taskList[i].creationDate, result.hasNotDue, result.dueDate, result.desc, result.priority, result.isDone);
          this.newItemEvent2.emit();
        }
      });
    }
    if (opt === 'filterTasks') //filter tasks
    {
      dialogConfig.width = '405px';
      dialogConfig.height = '310px';
      dialogConfig.data = { name: this.card.name, filterValue: this.filterValue, filterDone: this.filterDone, filter: this.filter };

      dialogRef = this.dialog.open(SetFilterComponent, dialogConfig); // opens dialog window

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.filter = result.filter;
          this.filterValue = result.filterValue;
          this.filterDone = result.filterDone;
        }
      });
    }
    if (opt === 'taskDetails') {
      dialogConfig.disableClose = false;
      dialogConfig.width = 'auto';
      dialogConfig.height = 'auto';
      dialogConfig.data = { content: this.card.taskList[i].content, hasNotDue: this.card.taskList[i].hasNotDue, dueDate: this.card.taskList[i].dueDate, priority: this.card.taskList[i].priority, isDone: this.card.taskList[i].isDone, desc: this.card.taskList[i].desc, creationDate: this.card.taskList[i].creationDate };

      dialogRef = this.dialog.open(TaskDetailsComponent, dialogConfig);
    }
  }

  // used when displaying task content on the card
  chooseCorrectColor(task: Task): string {
    if (task.isDone) {
      return 'green';
    }
    if (!task.isDone && task.checkIfDue() && !task.hasNotDue) {
      return 'red';
    }
    if (!task.isDone && task.checkIfAlmostDue() && !task.checkIfDue() && !task.hasNotDue) {
      return 'goldenrod';
    }
    if (!task.isDone && task.hasNotDue || !task.hasNotDue && !task.checkIfAlmostDue() && !task.checkIfDue()) {
      return 'black';
    }
    else {
      return 'black';
    }
  }

  // used to set the sort type
  setSort(set: number): void {
    this.sortType = set;
  }

  // used in order to reset sort after ngFor 
  getLength(): number {
    return this.card.taskList.length - 1;
  }

  deleteTask(i: number): void {
    if (confirm("Are you sure you want to delete this task?")) {
      this.card.deleteTask(i);
      this.newItemEvent2.emit();
    }
  }
}
