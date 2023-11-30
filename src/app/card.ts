import { Guid } from "guid-typescript";
import { Task } from './task';
export class Card{
    private _id: Guid;
    private _name: string;
    private _taskList: Task[] = [];
    private _priority: number;
    private _color: string;
  
    constructor(id: Guid = Guid.create(), name: string = 'New Card', priority: number  = 0 , color: string = ''){
      this._id = id;
      this._name = name;
      this._priority = priority;
      this._color = color;
      this._taskList = [];
    }

    addTask(value: string): void{
        var tmp: Task = new Task(Guid.create(), value, new Date(), undefined , 'blue', 0 , false ) 
        this._taskList.push(tmp);
    }

    deleteTask(index: number): void{
        this._taskList.splice(index, 1);
    }

    editTask(index: number): void{
        //this._taskList[index]
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
}