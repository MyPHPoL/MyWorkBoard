import express, { Express } from "express"
import { z } from "zod"
import { apiMessage, findUser, formatZodError, getUser, isOwningBoard, isUserInBoard, joinBoard, validateQuery, validateUser } from "./util.js"
import { db } from "./main.js"
import { SqliteError } from "better-sqlite3";
import * as boardService from './services/board'
import * as cardService from './services/card'
import * as taskService from './services/task'
import { Board, User } from "./types.js";


export const router = express.Router()



const idValidator = z.object({
    id: z.string().uuid()
})


const taskValidator = z.object({
    id: z.string().uuid(),
    content: z.string(),
    creationDate: z.string().datetime(),
    hasNotDue: z.boolean().or(z.number()),
    dueDate: z.string().datetime(),
    desc: z.string(),
    priority: z.number().min(0).max(5),
    isDone: z.boolean().or(z.number()),
})

const cardValidator = z.object({
    id: z.string().uuid(),
    name: z.string(),
    taskList: z.array(taskValidator),
    priority: z.number().min(0).max(5),
    color: z.string(),
})

const boardValidator = z.object({
    id: z.string().uuid(),
    cards: z.array(cardValidator),
    name: z.string()
})

const boardNameValidator = z.object({
    name: z.string()
})

function addBoard(user: User, board: Board) {
    try {
        const result = boardService.createBoard(user,board.id,board.name)
        for (let card of board.cards) {
            cardService.addCard(board.id,card.id,card)
            for (let task of card.taskList) {
                taskService.addTask(card.id,task.id,task)
            }
        }
        console.log("gitek")
        return result
    } catch (e) {
        console.error(e)
        return null
    }
}

router.post("/", async (req,res,next) => {
    try {

        const user = await getUser(req,res)
        const body = validateQuery(boardValidator,req.body)

        const result = db.transaction(() => {
            return addBoard(user,body)
        })()
        
        if (result === null) {
            return res.status(500).json(apiMessage("DB ERROR"))
        }

        return res.status(200).json(result)
        
    } catch (e) { next(e) }
})

router.patch("/:id", async (req,res,next) => {
    try {
        const user = await getUser(req,res)
        const boardId = validateQuery(idValidator, req.params).id
        if (!isOwningBoard(boardId,user.id)) {
            return res.status(403).send()
        }
        const body = validateQuery(boardNameValidator, req.body)
        const { name } = body
        
        const result = boardService.editBoard(user,boardId,name);
        
        if (result === false) {
            return res.status(500).json(apiMessage("DB ERROR"))
        }
        
        return res.status(200).json(body)
    } catch (e) { next(e) }
})

router.put("/:id", async (req,res,next) => {
    try {
        const user = await getUser(req,res)
        const boardId = validateQuery(idValidator, req.params).id
        if (!isOwningBoard(boardId,user.id)) {
            return res.status(403).send()
        }
        console.log(`PUT validating ${JSON.stringify(req.body,null,2)}`)
        const body = validateQuery(boardValidator, req.body)
        const { name, cards } = body
        
        
        const result = db.transaction(() => {
            try {
                boardService.deleteBoard(user,body.id)
                return addBoard(user,body)
            } catch (e) {
                console.error(e)
                return false
            }
        })()
        
        if (result === false) {
            return res.status(500).json(apiMessage("DB ERROR"))
        }
        
        return res.status(200).json(body)
    } catch (e) { next(e) }
})

router.get("/:id?", async (req,res,next) => {
    try {
        const parseUrl = z.object({
            id: z.optional(z.string().uuid())
        })
        
        const { id } = validateQuery(parseUrl,req.params)
        
        //await validateUser(req,res)
        const user = await getUser(req,res)
        
        
        let boards: Board[] | Board;
        if (id !== undefined) {
            if (!isUserInBoard(id,user.id)) {
                return res.status(403).send()
            }
            boards = boardService.getBoard(user,id)
            boards.cards = cardService.getCards(boards.id);
            for (let card of boards.cards) {
                card.taskList = taskService.getTasks(card.id)
            }
        } else {
            boards = boardService.getAllBoards(user)
            console.log(boards)
            for (let board of boards) {
                board.cards = cardService.getCards(board.id);
                for (let card of board.cards) {
                    card.taskList = taskService.getTasks(card.id)
                }
            }
        }
        
        console.log(`returning ${JSON.stringify(boards)}`)
        
        return res.status(200).json(
            boards
        )

    } catch (e) { next(e) }
})

router.delete("/:id", async (req,res,next) => {
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