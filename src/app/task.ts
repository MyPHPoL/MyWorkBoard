import { Guid } from 'guid-typescript';

// interface used when getting a json file
export interface ITask{
    id: string;
    content: string;
    creationDate: Date | string;
    hasNotDue: boolean;
    dueDate: Date | string;
    desc: string;
    priority: number;
    isDone: boolean;
}

export class Task{
    private _id: string;
    private _content: string;
    private _creationDate: Date;
    private _hasNotDue: boolean;
    private _dueDate: Date;
    private _desc: string;
    private _priority: number;
    private _isDone: boolean;

    constructor(id : string = Guid.create().toString(), content: string = 'New Task', creationDate: Date = new Date(), hasNotDue: boolean = true, dueDate: Date = new Date(), desc: string = '' ,priority: number  = 0, isDone: boolean = false){
        this._id = id;
        this._content = content;
        this._creationDate = creationDate;
        this._hasNotDue = hasNotDue;
        this._dueDate = dueDate;
        this._desc = desc;
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

    get desc(): string{
        return this._desc;
    }

    get Id(): string{
        return this._id;
    }

    get hasNotDue(): boolean{
        return this._hasNotDue;
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

    set desc( desc: string ){
        this._desc = desc;
    }

    set hasNotDue( hasNotDue: boolean ){
        this._hasNotDue = hasNotDue;
    }

    checkIfDue(): boolean{
        if (this.isDone) // task is already done
            return false;
        if (this.hasNotDue) // there is no due date
            return false;
        if (this.dueDate >= new Date()) // due date didn't happen yet
            return false;
        return true;
    }

    // if there are less than 2 days to complete task
    checkIfAlmostDue(): boolean {
        if (!this.checkIfDue()){ // if not due
            var Difference_In_Time = this.dueDate.getTime() - this.creationDate.getTime(); // time difference
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); // changed to day difference
            if (Difference_In_Days < 2){
                return true;
            }
            return false;
        }
        return false;
    }

    // used when converting to and from json file (hopefully it will work with fake db)
    toJSON(): ITask {
        return {
          id: this._id,
          content: this._content,
          creationDate: this._creationDate,
          hasNotDue: this._hasNotDue,
          dueDate: this._dueDate,
          desc: this._desc,
          priority: this._priority,
          isDone: this._isDone,
        };
    }

    fromJSON(json: ITask): Task {
        const task = new Task(
            json.id,
            json.content,
            new Date(json.creationDate),
            json.hasNotDue,
            new Date(json.dueDate),
            json.desc,
            json.priority,
            json.isDone
        );
        return task;
    }
}