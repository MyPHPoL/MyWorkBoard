import { Guid } from "guid-typescript";

export class Card{
    private id: Guid;
    private name: string;
    private taskList: string[] = [];
    private priority: number;
    private color: string;
  
    constructor(_name: string, _priority: number, _color: string){
      this.id = Guid.create();
      this.name = _name;
      this.priority = _priority;
      this.color = _color;
      this.taskList = [];
    }

    addTask(value: any){
        this.taskList.push(value);
    }

    deleteTask(index: number){
        this.taskList.splice(index, 1);
    }

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

    set setPriority(_priority: number){
        this.priority = _priority;
    }
    
    set setName(name: string){
        this.name = name;
    }

    set setColor(color: string){
        this.color = color;
    }
}