import { Card } from './card';

export class Board{
    private cards: Card[] = [];
    private theme: string = 'blue';

    constructor(){
        this.cards = [];
    }

    get allCards(){
        return this.cards;
    }

    addCard(card: Card){
        this.cards.push(card);
    }
}