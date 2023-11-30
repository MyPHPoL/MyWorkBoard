import { Guid } from "guid-typescript";

export class Card{
    private _id: Guid;
    private _name: string;
    private _taskList: string[] = [];
    private _priority: number;
    private _color: string;
  
    constructor(id: Guid = Guid.create(), name: string = 'New Card', priority: number  = 0 , color: string = ''){
      this._id = id;
      this._name = name;
      this._priority = priority;
      this._color = color;
      this._taskList = [];
    }

    addTask(value: any): void{
        this._taskList.push(value);
    }

    deleteTask(index: number): void{
        this._taskList.splice(index, 1);
    }

    // getters
    get name(): string{
        return this._name;
    }

    get taskList(): string[]{
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