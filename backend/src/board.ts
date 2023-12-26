import express, { Express } from "express"
import { z } from "zod"
import { apiMessage, findUser, formatZodError, getUser, joinBoard, validateQuery, validateUser } from "./util.js"
import { db } from "./main.js"
import { SqliteError } from "better-sqlite3";


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
});

router.post("/add", async (req,res,next) => {
    try {
        const parseBody = z.object({
            userEmail: z.string(),
            boardId: z.string().uuid()
        });

        const body = validateQuery(parseBody,req.body)
        
        const user = await getUser(req,res);
        const otherUser = findUser(body.userEmail)
        
        if (otherUser === null) {
            return res.status(400).json(apiMessage("User not found"))
        }
        
        const { userEmail, boardId} = body
        {
            const result = db
                .prepare(`select 1 from "board" where ownerId=? and id=?`)
                .get(user.id,boardId)
            if ((result as any)["1"] !== 1) {
                return res.status(403).send()
            }
        }
        
        const query = db.prepare(`insert into "main"."userBoard" ("userId", "boardId") VALUES (?, ?)`)

        try {
            const result = query.run(otherUser.id,boardId)
            
            if (result.changes != 1) {
                return res.status(500).json(apiMessage("DB ERROR"))
            }
            
            return res.status(200).send()
        } catch (e) {
            if (e instanceof SqliteError && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
                res.status(400).send(apiMessage("User already added"))
            }
        }
    } catch (e) { next(e) }
});


// get all users in board
router.get("/users", async (req,res,next) => {
    try {
        const parseUrl = z.object({
            id: z.string().uuid()
        })
        
        const boardId = validateQuery(parseUrl,req.query).id
        
        const user = await getUser(req,res)
        
        // check if user is in board
        {
            const result = db
                .prepare("select 1 from userBoard where boardId=? and userId=?")
                .get(boardId,user.id)
            if ((result as any)["1"] !== 1) {
                return res.status(403).send()
            }
        }
        
        const result = db
            .prepare(`select id,name,email from user join userBoard on boardId = ? where userId=id`)
            .all(boardId)
        
        if (result.length == 0) {
            return res.status(403).send()
        }
        
        return res.status(200).json(result)
    } catch (e) { next(e) }
})

// edit board with new name
router.patch("/", async (req,res,next) => {
    try {
        const parseBody = z.object({
            name: z.string()
        })
        
        const body = validateQuery(parseBody,req.body)

        const parseQuery = z.object({
            id: z.string().uuid(),
        })
        
        const id = validateQuery(parseQuery,req.query).id
        
        const user = await getUser(req,res)
        
        const result = db
            .prepare(`update board set name=? where id=? and ownerId=?`)
            .run(body.name,id,user.id)
        
        if (result.changes == 0) {
            return res.status(403).send()
        }
        
        return res.status(200).send()
    } catch (e) { next(e) }
})

router.delete("/", async (req,res,next) => {
    try {
    const parseUrl = z.object({
        id: z.string().uuid()
    })

    const { id } = validateQuery(parseUrl,req.query)

    const user = await getUser(req,res)

    const result = db
        .prepare('delete from "main"."board" where id=@id and ownerId=@owner')
        .run({
            id: id,
            owner: user.id
        });
    
    if (result.changes == 0) {
        return res.status(400).send()
    }
    return res.status(200).send()
    } catch (e) { next(e) }
})

router.delete("/remove", async (req,res,next) => {
    try {
        const parseBody = z.object({
            userEmail: z.string(),
        });
        
        const parseQuery = z.object({
            id: z.string().uuid()
        })

        const body = validateQuery(parseBody,req.body)
        const param = validateQuery(parseQuery,req.query)
        
        const user = await getUser(req,res);
        const otherUser = findUser(body.userEmail)
        
        if (otherUser === null) {
            return res.status(400).json(apiMessage("User not found"))
        }
        
        const { userEmail } = body
        const boardId = param.id;
        {
            const result = db
                .prepare(`select 1 from "board" where ownerId=? and id=?`)
                .get(user.id,boardId)
            if ((result as any)["1"] !== 1) {
                return res.status(403).send()
            }
        }
        
        const query = db.prepare(`delete from "main"."userBoard" where userId=? and boardId=?`)

        const result = query.run(otherUser.id,boardId)
        
        if (result.changes != 1) {
            return res.status(500).json(apiMessage("DB ERROR"))
        }
        
        return res.status(200).send()

    } catch (e) { next(e) }
})

router.delete("/leave", async (req,res,next) => {
    try {
        // leave the server if user is not an owner
        const parseQuery = z.object({
            id: z.string().uuid()
        })

        const param = validateQuery(parseQuery,req.query)
        const user = await getUser(req,res);
        if (user === null) {
            return res.status(400).send()
        }
        {
            const result = db
                .prepare(`select 1 from "board" where ownerId=? and id=?`)
                .get(user.id,param.id)
            if ((result as any)["1"] === 1) {
                return res.status(403).json(apiMessage("Can't leave server as owner"))
            }
        }

        const query = db.prepare(`delete from "main"."userBoard" where userId=? and boardId=?`)
        const result = query.run(user.id,param.id)

        if (result.changes != 1) {
            return res.status(500).json(apiMessage("DB ERROR"))
        }
        return res.status(200).send()
    } catch (e) { next(e) }
})

router.get("/", async (req,res,next) => {
    try {
        const parseUrl = z.object({
            id: z.optional(z.string().uuid())
        })
        
        const { id } = validateQuery(parseUrl,req.query)
        
        validateUser(req,res)
        
        let query = `select * from "main"."board"`
        if (id !== undefined) {
            query = query + ` where "id"=@id`
        }
        
        const stmt = db.prepare(query)
        const result = stmt.all({id: id})
        
        return res.status(200).json(result)

    } catch (e) { next(e) }
})

