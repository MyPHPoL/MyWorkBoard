import { Guid } from 'guid-typescript';
import { Card, ICard } from './card';

// interface used when getting a json file
export interface IBoard {
    id: string;
    cards: ICard[];
    name: string;
  }

export class Board{
    private _id: string;
    private _cards: Card[];
    private _name: string;

    constructor(id : string = Guid.create().toString(), cards: Card[] = [], name: string = "newBoard"){
        this._id = id;
        this._cards = cards;
        this._name = name;
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

    get name(): string{
        return this._name;
    }

    set Id(id: string){
        this._id = id;
    }

    set cards(cards: Card[]){
        this._cards = cards;
    }

    set name(name: string){
        this._name = name;
    }
    

    // used when converting to and from json file 
    toJSON(): IBoard {
        return {
            id: this._id,
            cards: this._cards.map(card => card.toJSON()),
            name: this._name
        };
    }

    fromJSON(json: IBoard): Board {
        const board = new Board(
            json.id,
            json.cards.map(card => new Card().fromJSON(card)),
            json.name
        );
        return board;
    }
}