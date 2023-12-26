import { z } from "zod"
import { auth } from "./main.js"
import { Request, Response } from "express"
import { AuthError, ValidationError, type User } from './types'
import { db } from './main'

export function apiMessage(err: string) {
	return {
		status: err
	}
}
export function formatZodError<T>(error: z.ZodError<T>) {
	return {
		error: error.issues.map(x => x.message).join(' ')
	}
}

export async function getUser(req: Request, res: Response) : Promise<User> {
	const authRequest = auth.handleRequest(req,res)
	const session = await authRequest.validate()
	if (!session) {
		throw new AuthError("Session not found")
	}
	
	const user = session.user;
	return {
		email: user.email,
		id: user.userId,
		name: user.name
	}
}

export function isUserInBoard(boardId: string, userId: string) {
	const result = db
		.prepare("select 1 from userBoard where boardId=? and userId=?")
		.get(boardId,userId)
	return (result as any)["1"] === 1
}
export function isOwningBoard(boardId: string, userId: string) {
	const result = db
		.prepare("select 1 from board where id=? and ownerId=?")
		.get(boardId,userId)
	return (result as any)["1"] === 1
}
export function isUserInCard(cardId: string, userId: string) {
	const result = db
		.prepare("select 1 from userBoard join card on card.boardId=userBoard.boardId where card.id=? and userId=?")
		.get(cardId,userId)
	return (result as any)["1"] === 1
}
export function isOwningCard(cardId: string, userId: string) {
	const result = db
		.prepare("select 1 from board join card on card.boardId=board.id where card.id=? and board.ownerId=?")
		.get(cardId,userId)
	return (result as any)["1"] === 1
}

export function findUser(email: string) {
	const user = db.prepare(`select * from user where email=?`).get(email)
	if (user === null) {
		return null
	}
	return user as User;
}

export async function validateUser(req: Request, res: Response) {
	const authRequest = auth.handleRequest(req,res)
	const session = await authRequest.validate()
	if (!session) {
		throw new AuthError("Session not found")
	}
}

export function validateQuery<T extends z.ZodTypeAny>(validator: T, query: any) {
	
	const res = validator.safeParse(query);
	if (!res.success) {
		throw new ValidationError("Validation error", res.error.issues)
	}
	
	return res.data
}
