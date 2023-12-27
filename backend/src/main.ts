import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { lucia } from "lucia";
import { express as express_lucia } from "lucia/middleware";
import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
import sqlite from "better-sqlite3"
import * as board from "./board"
import * as task from "./task"
import * as user from "./user"
import * as card from "./card"
import * as boardBig from "./board-big"
import fs from 'fs'
import { AuthError, ValidationError } from "./types.js";
import cors from "cors";
import { Crypto } from "@peculiar/webcrypto";


if (process.versions.node.split('.').map(Number)[0] < 19) {
	globalThis.crypto = new Crypto();
}


dotenv.config();

if (process.env.SQLITE_FILE === undefined) {
	throw new Error("SQLITE_FILE not defined");
}

export const db = sqlite(process.env.SQLITE_FILE,{
	verbose: console.log
});

export const auth = lucia({
	adapter: betterSqlite3(db, {
		user: "user",
		key: "user_key",
		session: "user_session"
	}),
	
	// POST LOGOUT DOESNT WORK WITHOUT IT
	csrfProtection: false,
	env: "DEV", // "PROD" if deployed to HTTPS
	middleware: express_lucia(),
	getUserAttributes: (data) => {
		return {
			name: data.name,
			email: data.email
		}
	}
});

export type Auth = typeof auth;
export const app: Express = express();

const port = process.env.PORT || 3000;

app.use(async (req,res,next) => {
	console.log(JSON.stringify({
		endpoint: `${req.method.toUpperCase()} ${req.url}`,
		headers: req.headers,
		query: req.query,
		body: req.body,
	},null,2))
	next()
})

const corsopts = {
	origin: 'http://localhost:4200',
	credentials: true,
	optionsSuccessStatus: 200,
	methods: ['GET','POST','PUT','PATCH','DELETE'],
	
}

app.use(cors(corsopts))
app.use(express.urlencoded())
app.use(express.json())
app.use(async (err: any,_req: any,res: any,next: any) => {
	if (err instanceof SyntaxError) {
		console.error(err)
		return res.sendStatus(400)
	}
	
	next()

})

app.use("/board", board.router);
app.use("/user", user.router);
app.use("/card", card.router)
app.use("/task", task.router)
app.use("/boards", boardBig.router)

app.get("/createDb", (req,res) => {
	try {
		const script = fs.readFileSync("src/myworkboard.db.sql",'utf8')
		db.exec(script)
	} catch (e) {
		console.error(e)
		return res.status(500).send()
	}
	return res.status(200).send()
})

app.use(async (e: any,_req: any,res: any,next: any) => {
	if (e instanceof AuthError) {
		// return unauthorized status
		res.status(401).json({ status: e.message })
		next()
	} else if (e instanceof ValidationError) {
		console.error(`${JSON.stringify(e.message,null,2)}; Issues: ${JSON.stringify(e.issues,null,2)}`)
		res.status(400).json(e.issues)
		next()
	} else {
		// log and return internal server error
		console.error(e)
		res.status(500);
		next()
	}
})


app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});