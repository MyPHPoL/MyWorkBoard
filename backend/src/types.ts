export interface BoardCreateRequest {
    name: string;
}

export class AuthError extends Error {
	constructor(msg : string) {
		super(msg)
		Object.setPrototypeOf(this,AuthError.prototype)
	}
}

export class ValidationError extends Error {
	constructor(msg : string, public issues: any) {
		super(msg)
		Object.setPrototypeOf(this,ValidationError.prototype)
	}
}

export type User = {
	id: string,
	name: string,
	email: string
}

export type Task = {
	id: string;
    content: string;
    creationDate: Date | string;
    hasNotDue: boolean | number;
    dueDate: Date | string;
    desc: string;
    priority: number;
    isDone: boolean | number;
}

export type Card = {
	id: string;
    name: string;
    taskList: Task[];
    priority: number;
    color: string
}

export type Board = {
    id: string;
    cards: Card[];
    name: string;
}