import { Guid } from "guid-typescript";

export class Card{
    private id: Guid;
    private name: string;
    private taskList: string[] = [];
    private priority: number;
    private color: string;
  
    constructor(_id: Guid = Guid.create(), _name: string = 'New Card', _priority: number  = 0 , _color: string = ''){
      this.id = _id;
      this.name = _name;
      this.priority = _priority;
      this.color = _color;
      this.taskList = [];
    }

    addTask(value: any): void{
        this.taskList.push(value);
    }

    deleteTask(index: number): void{
        this.taskList.splice(index, 1);
    }

    // getters
    get getName(): string{
        return this.name;
    }

    get getTaskList(): string[]{
        return this.taskList;
    }

    get getPriority(): number{
        return this.priority;
    }

    get getColor(): string{
        return this.color;
    }

    get getId(): Guid{
        return this.id;
    }

    // setters
    set setPriority(priority: number){
        this.priority = priority;
    }
    
    set setName(name: string){
        this.name = name;
    }

    set setColor(color: string){
        this.color = color;
    }
}