import { z } from "zod"
import { apiMessage, findUser, formatZodError, getUser, isOwningBoard, isUserInBoard, validateQuery, validateUser } from "../util.js"
import { db } from "../main.js"
import { SqliteError } from "better-sqlite3"
import { Card } from "../types.js"


// todo add, delete, get

export function getCards(boardId: string) : Card[] {
    const query = db.prepare(`SELECT id,name,priority,color FROM card WHERE boardId=?`)
    const cards = query.all(boardId) as any[]
    return cards.map( card => {
        return {
            id: card.id,
            name: card.name,
            priority: card.priority,
            color: card.color,
            taskList: []
        }
    })
}

export function addCard(boardId: string, newCardId: string, card: Card) {
    const query = db.prepare(`INSERT INTO "main"."card" ("id", "name", "priority", "color", "boardId") VALUES (?, ?, ?, ?, ?)`)
    const result = query.run(newCardId, card.name, card.priority, card.color, boardId)
    if (result.changes != 1) {
        return false;
    }
    return true;
}