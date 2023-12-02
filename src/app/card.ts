import { Guid } from "guid-typescript";
import { Task } from './task';
export class Card{
    private _id: Guid;
    private _name: string;
    private _taskList: Task[] = [];
    private _priority: number;
    private _color: string;
    private _filterValue: number; //priority selected to be shown
    private _filter: boolean; // is filter on
  
    constructor(id: Guid = Guid.create(), name: string = 'New Card', priority: number  = 0 , color: string = '', taskList: Task[] = [], filterValue: number = 0, filter: boolean = false){
      this._id = id;
      this._name = name;
      this._priority = priority;
      this._color = color;
      this._taskList = taskList;
      this._filterValue = filterValue;
      this._filter = filter;
    }

    addTask(value: string, cardPriority: number): void{
        var tmp: Task = new Task(undefined, value, undefined, undefined , undefined, undefined, cardPriority, undefined) // most left undefined since task constructor has default values
        this._taskList.push(tmp);
    }

    deleteTask(index: number): void{
        this._taskList.splice(index, 1);
    }
    
    //deprecated
    editTask(id: Guid){
        return this._taskList.find(t => t.Id === id);
    }

    // getters
    get name(): string{
        return this._name;
    }

    get taskList(): Task[]{
        return this._taskList;
    }

    get priority(): number{
        return this._priority;
    }

    get color(): string{
        return this._color;
    }

    get Id(): Guid{
        return this._id;
    }

    get filter():boolean{
        return this._filter;
    }

    get filterValue(): number{
        return this._filterValue;
    }

    // setters
    set priority(priority: number){
        this._priority = priority;
    }
    
    set name(name: string){
        this._name = name;
    }

    set color(color: string){
        this._color = color;
    }

    set filter(filter: boolean){
         this._filter = filter;
    }

    set filterValue(filterValue: number){
         this._filterValue = filterValue;
    }
}