import { BoardCreateRequest } from "./types.js"
import { Express } from "express"
import { z } from "zod"
import { formatApiError, formatZodError } from "./util.js"
import { app, db } from "./main.js"



export function attachEndpoints() {
    app.post("/board/create", async (req,res) => {
        const parsedBody = z.object({
            name: z.string()
        }).safeParse(req.body);

        if (!parsedBody.success) {
            return res.status(401).json(formatApiError(formatZodError(parsedBody.error)))
        }
        
        throw new Error("TODO /board/create");
    });
}
