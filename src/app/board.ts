import { Guid } from 'guid-typescript';
import { Card, ICard } from './card';

// interface used when getting a json file
export interface IBoard {
    id: string;
    cards: ICard[];
  }

export class Board{
    private _id: string;
    private _cards: Card[];

    constructor(id : string = Guid.create().toString(), cards: Card[] = []){
        this._id = id;
        this._cards = cards;
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

    get Id(): string{
        return this._id;
    }

    set Id(id: string){
        this._id = id;
    }

    set cards(cards: Card[]){
        this._cards = cards;
    }

    // used when converting to and from json file (hopefully it will work with fake db)
    toJSON(): IBoard {
        return {
            id: this._id,
            cards: this._cards.map(card => card.toJSON()),
        };
    }

    fromJSON(json: IBoard): Board {
        const board = new Board(
            json.id,
            json.cards.map(card => new Card().fromJSON(card))
        );
        return board;
    }
}