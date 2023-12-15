import { Guid } from "guid-typescript";
import { ITask, Task } from './task';

// interface used when getting a json file
export interface ICard {
    id: string;
    name: string;
    taskList: ITask[];
    priority: number;
    color: string;
}

export class Card {
    private _id: string;
    private _name: string;
    private _taskList: Task[] = [];
    private _priority: number;
    private _color: string;

    constructor(id: string = Guid.create().toString(), name: string = 'New Card', priority: number = 0, color: string = '', taskList: Task[] = []) {
        this._id = id;
        this._name = name;
        this._priority = priority;
        this._color = color;
        this._taskList = taskList;
    }

    addTask(value: string, cardPriority: number): void {
        var tmp: Task = new Task(undefined, value, undefined, undefined, undefined, undefined, cardPriority, undefined) // most left undefined since task constructor has default values
        this._taskList.push(tmp);
    }

    deleteTask(index: number): void {
        this._taskList.splice(index, 1);
    }


    // getters
    get name(): string {
        return this._name;
    }

    get taskList(): Task[] {
        return this._taskList;
    }

    get priority(): number {
        return this._priority;
    }

    get color(): string {
        return this._color;
    }

    get Id(): string {
        return this._id;
    }

    // setters
    set priority(priority: number) {
        this._priority = priority;
    }

    set name(name: string) {
        this._name = name;
    }

    set color(color: string) {
        this._color = color;
    }

    set id(id: string) {
        this.id = id;
    }

    // used when converting to and from json file
    toJSON(): ICard {
        return {
            id: this._id,
            name: this._name,
            taskList: this._taskList.map(task => task.toJSON()),
            priority: this._priority,
            color: this._color,
        };
    }

    fromJSON(json: ICard): Card {
        const card = new Card(
            json.id,
            json.name,
            json.priority,
            json.color,
            json.taskList.map(task => new Task().fromJSON(task))
        );
        return card;
    }
}