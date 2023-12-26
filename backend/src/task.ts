import express, { Express } from "express"
import { z } from "zod"
import { apiMessage, findUser, formatZodError, getUser, isOwningBoard, isUserInBoard, isUserInCard, validateQuery, validateUser } from "./util.js"
import { db } from "./main.js"
import { SqliteError } from "better-sqlite3";

export const router = express.Router()

const taskValidator = z.object({
    content: z.string(),
    creationDate: z.string().datetime(),
    hasNotDue: z.boolean(),
    dueDate: z.string().datetime(),
    desc: z.string(),
    priority: z.number().min(0).max(5),
    isDone: z.boolean(),
})

const createTaskValidator = z.object({
    content: z.string(),
    desc: z.string(),
    priority: z.number().min(0).max(5),
})

const idValidator = z.object({
    id: z.string().uuid()
})

const cardIdValidator = z.object({
    cardId: z.string().uuid()
})

const updateTaskValidator = taskValidator
        .and(cardIdValidator)
        .and(z.object({ 
            taskedId: z.optional(z.string().uuid())
        }))


router.get("/", async (req,res,next) => {
    try {
        const user = await getUser(req,res)
        const cardId = validateQuery(idValidator, req.query).id
        if (!isUserInCard(cardId,user.id)) {
            return res.status(403).send()
        }
        const query = db.prepare(`SELECT id,content,creationDate,hasNotDue,dueDate,desc,priority,isDone,taskedId FROM task WHERE cardId=?`)
        const cards = query.all(cardId)
        return res.status(200).json(cards)
    } catch (e) { next(e) }
})

router.post("/", async (req,res,next) => {
    try {
        const user = await getUser(req,res)
        const cardId = validateQuery(idValidator, req.query).id
        if (!isUserInCard(cardId,user.id)) {
            return res.status(403).send()
        }
        const body = validateQuery(createTaskValidator, req.body);
        const query = db.prepare(
            `INSERT INTO task ("id", "content", "creationDate", "hasNotDue", "dueDate", "desc", "priority", "isDone", "cardId") VALUES (?,?,?,?,?,?,?,?,?)`)
        const uid = crypto.randomUUID();
        const dateNow = new Date().toISOString();
        const result = query.run(
            uid, body.content, dateNow,
            1,dateNow,body.desc,
            body.priority, 0, cardId
        )
        if (result.changes != 1) {
            return res.status(500).json(apiMessage("DB ERROR"))
        }
        return res.status(200).json({
            id: uid,
            content: body.content,
            creationDate: dateNow,
            hasNotDue: true,
            dueDate: dateNow,
            desc: body.desc,
            priority: body.priority,
            isDone: false
        })
    } catch (e) { next(e) }
})
router.patch("/", async (req,res,next) => {
    try {
        const user = await getUser(req,res)
        const cardId = validateQuery(idValidator, req.query).id
        const body = validateQuery(updateTaskValidator, req.body)
        //const { name, priority, color, boardId } = body
        if (!isUserInCard(cardId,user.id)) {
            return res.status(403).send()
        }
        const query = db.prepare(
            `UPDATE card SET content=?, hasNotDue=?, dueDate=?, desc=?, priority=?, isDone=?, cardId=?, taskedId=? WHERE id=?`
        )
        const result = query.run(
            body.content, body.hasNotDue,
            body.dueDate, body.desc, body.priority,
            body.isDone, body.cardId, body.taskedId
        )
        if (result.changes != 1) {
            return res.status(500).json(apiMessage("DB ERROR"))
        }
        return res.status(200).send()
    } catch (e) { next(e) }
})

router.delete("/", async (req,res,next) => {
    try {
        const user = await getUser(req,res)
        const taskId = validateQuery(idValidator, req.query).id
        const cardId = validateQuery(cardIdValidator,req.body).cardId
        if (!isOwningBoard(taskId,user.id)) {
            return res.status(403).send()
        }
        const query = db.prepare(`DELETE FROM task WHERE id=? AND cardId=?`)
        const result = query.run(taskId,cardId)
        if (result.changes != 1) {
            return res.status(500).json(apiMessage("DB ERROR"))
        }
        return res.status(200).send()
    } catch (e) { next(e) }
})