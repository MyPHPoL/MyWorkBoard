import { Guid } from 'guid-typescript';
import { Card } from './card';

export class Board{
    private _id: Guid;
    private _cards: Card[];
    private _theme: string = 'blue';

    constructor(id : Guid = Guid.create(), cards: Card[] = [], theme: string = 'blue'){
        this._id = id;
        this._cards = cards;
        this._theme = theme;
    }

    addCard(card: Card): void{
        this._cards.push(card);
    }

    deleteCard(index: number): void{
        this._cards.splice(index, 1);
    }

    // getters
    get allCards(): Card[]{
        return this._cards;
    }

    get theme(): string{
        return this._theme;
    }

    get Id(): Guid{
        return this._id;
    }

    // setters
    set theme(theme: string){
        this._theme = theme;
    }

    set Id(id: Guid){
        this._id = id;
    }

    set cards(cards: Card[]){
        this._cards = cards;
    }
}