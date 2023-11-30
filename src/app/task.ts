import { Guid } from 'guid-typescript';

export class Task{
    private _id: Guid;
    private _content: string;
    private _creationDate: Date;
    private _dueDate: Date;
    private _color: string;
    private _priority: number;
    private _isDone: boolean;

    constructor(id : Guid = Guid.create(), content: string = 'Eo', creationDate: Date, dueDate: Date = new Date(), color: string = 'blue' ,priority: number  = 0, isDone: boolean = false){
        this._id = id;
        this._content = content;
        this._creationDate = creationDate;
        this._dueDate = dueDate;
        this._color = color;
        this._priority = priority;
        this._isDone = isDone;
    }

    get content(): string{
        return this._content;
    }

    get creationDate(): Date{
        return this._creationDate;
    }

    get dueDate(): Date{
        return this._dueDate;
    }

    get priority(): number{
        return this._priority;
    }

    get isDone(): boolean{
        return this._isDone;
    }

    get color(): string{
        return this._color;
    }

    get Id(): Guid{
        return this._id;
    }

    // setters
        
    set content( content: string ){
        this._content = content;
    }

    set creationDate( creationDate: Date ){
        this._creationDate =creationDate;
    }

    set dueDate( dueDate: Date ){
        this._dueDate = dueDate;
    }

    set priority( priority: number ){
        this._priority = priority;
    }

    set isDone( isDone: boolean ){
        this._isDone = isDone;
    }

    set color( color: string ){
        this._color = color;
    }
}