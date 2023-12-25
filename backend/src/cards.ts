import express, { Express } from "express"
import { z } from "zod"
import { apiMessage, findUser, formatZodError, getUser, isOwningBoard, isUserInBoard, validateQuery, validateUser } from "./util.js"
import { db } from "./main.js"
import { SqliteError } from "better-sqlite3";


export const router = express.Router()

const cardValidator = z.object({
    name: z.string(),
    priority: z.number().min(0).max(5),
    color: z.string(),
})

const idValidator = z.object({
    id: z.string().uuid()
})

router.get("/", async (req,res,next) => {
    try {
        const user = await getUser(req,res)
        const boardId = validateQuery(idValidator, req.params).id
        if (!isUserInBoard(boardId,user.id)) {
            return res.status(403).send()
        }
        const query = db.prepare(`SELECT id,name,priority,color FROM card WHERE boardId=?`)
        const cards = query.all(boardId)
        return res.status(200).json(cards)
    } catch (e) { next(e) }
})

router.post("/", async (req,res,next) => {
    try {
        const user = await getUser(req,res)
        const boardId = validateQuery(idValidator, req.params).id
        if (!isOwningBoard(boardId,user.id)) {
            return res.status(403).send()
        }
        const body = validateQuery(cardValidator, req.body)
        const { name, priority, color } = body
        const query = db.prepare(`INSERT INTO "main"."card" ("id", "name", "priority", "color", "boardId") VALUES (?, ?, ?, ?, ?)`)
        const uid = crypto.randomUUID();
        const result = query.run(uid, name, priority, color, boardId)
        if (result.changes != 1) {
            return res.status(500).json(apiMessage("DB ERROR"))
        }
        return res.status(200).json({
            id: uid,
            name: name,
            priority: priority,
            color: color,
            boardId: boardId
        })
    } catch (e) { next(e) }
})
const cardWithBoardValidator = z.object({
    name: z.string(),
    priority: z.number().min(0).max(5),
    color: z.string(),
    boardId: z.string().uuid()
})
router.patch("/", async (req,res,next) => {
    try {
        const user = await getUser(req,res)
        const cardId = validateQuery(idValidator, req.params).id
        const body = validateQuery(cardWithBoardValidator, req.body)
        const { name, priority, color, boardId } = body
        if (!isOwningBoard(boardId,user.id)) {
            return res.status(403).send()
        }
        const query = db.prepare(`UPDATE card SET name=?, priority=?, color=?, boardId=? WHERE id=?`)
        const result = query.run(name, priority, color, boardId,cardId)
        if (result.changes != 1) {
            return res.status(500).json(apiMessage("DB ERROR"))
        }
        return res.status(200).send()
    } catch (e) { next(e) }
})

router.delete("/", async (req,res,next) => {
    try {
        const user = await getUser(req,res)
        const cardId = validateQuery(idValidator, req.params).id
        const boardId = validateQuery(z.object({
            boardId : z.string().uuid()
        }),req.body).boardId
        if (!isOwningBoard(boardId,user.id)) {
            return res.status(403).send()
        }
        const query = db.prepare(`DELETE FROM card WHERE id=? AND boardId=?`)
        const result = query.run(cardId,boardId)
        if (result.changes != 1) {
            return res.status(500).json(apiMessage("DB ERROR"))
        }
        return res.status(200).send()
    } catch (e) { next(e) }
})