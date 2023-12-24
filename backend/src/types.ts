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