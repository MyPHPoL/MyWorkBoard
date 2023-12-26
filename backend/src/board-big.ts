import express, { Express } from "express"
import { z } from "zod"
import { apiMessage, findUser, formatZodError, getUser, isOwningBoard, isUserInBoard, joinBoard, validateQuery, validateUser } from "./util.js"
import { db } from "./main.js"
import { SqliteError } from "better-sqlite3";
import * as boardService from './services/board'
import * as cardService from './services/card'
import * as taskService from './services/task'


export const router = express.Router()


router.post("/", async (req,res,next) => {
    try {
        const parsedBody = z.object({
            name: z.string()
        }).safeParse(req.body);

        if (!parsedBody.success) {
            return res.status(401).json(formatZodError(parsedBody.error))
        }
        
        const user = await getUser(req,res);
        
        const { name } = parsedBody.data
        const uid = crypto.randomUUID();
        const ownerId = user.id;

        const result = db.transaction(() => {
            const query = db.prepare(`INSERT INTO "main"."board" ("id", "name", "ownerId") VALUES (?, ?, ?)`)
            const result = query.run(uid, name, ownerId)
            return joinBoard(user.id,uid)
        })()
        
        if (result == "success") {
            return res.status(200).json({
                id: uid,
                name: name,
                ownerId: ownerId
            })
        } else if (result == "conflict") {
            return res.status(409).json(apiMessage("User already added"))
        } else if (result == "dberror") {
            return res.status(500).json(apiMessage("DB ERROR"))
        }
        
    } catch (e) { next(e) }
})


const idValidator = z.object({
    id: z.string().uuid()
})

router.get("/", async (req,res,next) => {
    try {
        const parseUrl = z.object({
            id: z.optional(z.string().uuid())
        })
        
        const { id } = validateQuery(parseUrl,req.query)
        
        //await validateUser(req,res)
        const user = await getUser(req,res)
        
        
        let boards;
        if (id !== undefined) {
            if (!isUserInBoard(id,user.id)) {
                return res.status(403).send()
            }
            boards = [boardService.getBoard(user,id)]
        } else {
            boards = boardService.getAllBoards(user)
        }
        
        for (let board of boards) {
            board.cards = cardService.getCards(board.id);
            for (let card of board.cards) {
                card.taskList = taskService.getTasks(card.id)
            }
            
        }
        
        return res.status(200).json({
            boards: boards
        })

    } catch (e) { next(e) }
})

router.delete("/", async (req,res,next) => {
    try {
        const user = await getUser(req,res)
        const boardId = validateQuery(idValidator, req.params).id
        if (!isOwningBoard(boardId,user.id)) {
            return res.status(403).send()
        }
        
        const result = boardService.deleteBoard(user,boardId)
        
        if (result === false) {
            return res.status(500).json(apiMessage("DB ERROR"))
        }
        
        return res.status(200).send()
    } catch (e) { next(e) }
})