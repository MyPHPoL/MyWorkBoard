import { Guid } from 'guid-typescript';

export class Task{
    private _id: Guid;
    private _content: string;
    private _creationDate: Date;
    private _hasNotDue: boolean;
    private _dueDate: Date;
    private _color: string;
    private _priority: number;
    private _isDone: boolean;

    constructor(id : Guid = Guid.create(), content: string = 'New Task', creationDate: Date = new Date(), hasNotDue: boolean = true, dueDate: Date = new Date(), color: string = 'blue' ,priority: number  = 0, isDone: boolean = false){
        this._id = id;
        this._content = content;
        this._creationDate = creationDate;
        this._hasNotDue = hasNotDue;
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

    get hasNotDue(): boolean{
        return this._hasNotDue;
    }

    get dueDateNoTime(): string{
        return this._dueDate.toLocaleDateString();
    }

    get creationDateNoTime(): string {
        return this._creationDate.toLocaleDateString();
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
}