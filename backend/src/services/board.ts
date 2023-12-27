import { z } from "zod"
import { apiMessage, findUser, formatZodError, getUser, joinBoard, validateQuery, validateUser } from "../util.js"
import { db } from "../main.js"
import { SqliteError } from "better-sqlite3";
import { Board, User } from "../types";


const boardValidator = z.object({
    name: z.string()
})

export function createBoard(user: User, name: string) {
    const uid = crypto.randomUUID();
    const ownerId = user.id;

    const result = db.transaction(() => {
        const query = db.prepare(`INSERT INTO "main"."board" ("id", "name", "ownerId") VALUES (?, ?, ?)`)
        const result = query.run(uid, name, ownerId)
        return joinBoard(user.id,uid)
    })()
    
    return result;
}

export function getBoard(user: User, boardId: string) : Board {
    const query = `select id,name,ownerId from "main"."board", userBoard where id=? and userId=?`
    const stmt = db.prepare(query)
    const result = stmt.get(boardId, user.id) as any
    return {
        cards: [],
        id: result.id,
        name: result.name
    }
}
export function getAllBoards(user: User) : Board[] {
    const query = `select id,name,ownerId from "main"."board", userBoard where userId=?`
    const stmt = db.prepare(query)
    const result = stmt.all(user.id) as any[]
    return result.map( val => {
        return {
            cards: [],
            id: val.id,
            name: val.name
        }
    })
}
export function editBoard(user: User, boardId: string, boardName: string) {
    const result = db
        .prepare(`update board set name=? where id=? and ownerId=?`)
        .run(boardName, boardId, user.id)

    if (result.changes == 0) {
        return false
    }
    return true 
}

export function deleteBoard(user: User, boardId: string) {
    const result = db
        .prepare('delete from "main"."board" where id=@id and ownerId=@owner')
        .run({
            id: boardId,
            owner: user.id
        })
    
    if (result.changes == 0) {
        return false
    }
    return true
}