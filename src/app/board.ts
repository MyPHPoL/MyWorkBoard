import { Guid } from 'guid-typescript';
import { Card } from './card';

export class Board{
    private id: Guid;
    private cards: Card[];
    private theme: string = 'blue';

    constructor(_id : Guid = Guid.create(), _cards: Card[] = [], _theme: string = 'blue'){
        this.id = _id;
        this.cards = _cards;
        this.theme = _theme;
    }

    addCard(card: Card): void{
        this.cards.push(card);
    }

    deleteCard(index: number): void{
        this.cards.splice(index, 1);
    }

    // getters
    get allCards(): Card[]{
        return this.cards;
    }

    get getTheme(): string{
        return this.theme;
    }

    get getId(): Guid{
        return this.id;
    }

    // setters
    set setTheme(theme: string){
        this.theme = theme;
    }

    set setId(id: Guid){
        this.id = id;
    }

    set setCards(cards: Card[]){
        this.cards = cards;
    }
}