import { z } from "zod"
import { apiMessage, findUser, formatZodError, getUser, isOwningBoard, isUserInBoard, validateQuery, validateUser } from "../util.js"
import { db } from "../main.js"
import { SqliteError } from "better-sqlite3"
import { Card, Task } from "../types.js"


// todo add, delete, get

export function getTasks(cardId: string) : Task[] {
    const query = db.prepare(`SELECT id,content,creationDate,hasNotDue,dueDate,desc,priority,isDone,taskedId FROM task WHERE cardId=?`)
    const tasks = query.all(cardId) as any[]
    return tasks.map( card => {
        return {
            id: card.id,
            content: card.content,
            creationDate: card.creationDate,
            hasNotDue: card.hasNotDue,
            dueDate: card.dueDate,
            desc: card.desc,
            priority: card.priority,
            isDone: card.isDone,
            taskedId: card.taskedId
        }
    })
}

export function addTask(cardId: string, newTaskId: string, task: Task) {
    const query = db.prepare(`INSERT INTO "main"."task" ("id", "content", "creationDate", "hasNotDue", "dueDate", "desc", "priority", "isDone", "cardId") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    const result = query.run(newTaskId, task.content, task.creationDate, +task.hasNotDue, task.dueDate, task.desc, task.priority, +task.isDone, cardId)
    if (result.changes != 1) {
        return false;
    }
    return true;
}