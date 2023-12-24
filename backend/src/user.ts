import { z } from "zod"
import { auth } from "./main.js"
import express from "express";
import { apiMessage, formatZodError } from "./util.js";
import { SqliteError } from "better-sqlite3";
import { LuciaError } from "lucia";


export const router = express.Router();

router.post("/register", async (req, res) => {
	const parsedBody = z.object({
		email: z.string().email(),
		name: z.string().min(4).max(31),
		password: z.string().min(6).max(255)
	}).safeParse(req.body);

	if (!parsedBody.success) {
		return res.json((formatZodError(parsedBody.error)))
	}
	const { name, email, password } = parsedBody.data;

	// basic check
	try {
		const user = await auth.createUser({
			key: {
				providerId: "email", // auth method
				providerUserId: email.toLowerCase(), // unique id when using "username" auth method
				password // hashed by Lucia
			},
			attributes: {
				name, email
			}
		});
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		const authRequest = auth.handleRequest(req, res);
		authRequest.setSession(session);
		// redirect to profile page
		return res.status(200).json({ status: "User created" });
	} catch (e) {
		// handle better-sqlite 3 unique key error
		if (e instanceof SqliteError && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
			return res.status(400).json(apiMessage("Email already exists"))
		}

		return res.status(500).send("An unknown error occurred");
	}
})

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1).max(255)
})
router.post("/login", async (req , res ) => {
	const schemaValidation = loginSchema.safeParse(req.body)
	if (!schemaValidation.success) {
		return res.status(400).json({ status: schemaValidation.error.issues })
	}
	const { email, password } = schemaValidation.data;
	try {
		// find user by key
		// and validate password
		const key = await auth.useKey("email", email.toLowerCase(), password);
		const session = await auth.createSession({
			userId: key.userId,
			attributes: {}
		});
		const authRequest = auth.handleRequest(req, res);
		authRequest.setSession(session);
		return res.status(200).json({ status: "User login successful" });
		// redirect to profile page
	} catch (e) {
		// check for unique constraint error in user table
		if (
			e instanceof LuciaError &&
			(e.message === "AUTH_INVALID_KEY_ID" ||
				e.message === "AUTH_INVALID_PASSWORD")
		) {
			// user does not exist
			// or invalid password
			return res.status(400).send("Incorrect username or password");
		}

		return res.status(500).send("An unknown error occurred");
	}
});

router.get("/user", async (req, res) => {
	const authRequest = auth.handleRequest(req, res);
	const session = await authRequest.validate(); // or `authRequest.validateBearerToken()`
	console.log(session)
	if (session) {
		const user = session.user;
		const name = user.name;
		const email = user.email;
		return res.status(200).json({
			user
		})
	}
	return res.status(401).json({ status: "Unauthorized" });
});

router.post("/logout", async (req, res) => {
	const authRequest = auth.handleRequest(req, res);
	const session = await authRequest.validate(); // or `authRequest.validateBearerToken()`
	if (!session) {
		return res.sendStatus(401);
	}
	await auth.invalidateSession(session.sessionId);

	authRequest.setSession(null); // for session cookie

	// return no content
	return res.sendStatus(204);
});