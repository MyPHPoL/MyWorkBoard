export interface IUser {
    id: string;
    name: string;
    email: string;
}

export class User {
    private _id: string;
    private _name: string;
    private _email: string;

    constructor(id: string, name: string, email: string) {
        this._id = id;
        this._name = name;
        this._email = email;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get Id(): string {
        return this._id;
    }

    set name(name: string) {
        this._name = name;
    }

    set email(email: string) {
        this._email = email;
    }
}
