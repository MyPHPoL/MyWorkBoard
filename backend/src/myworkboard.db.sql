BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "user_key" (
	"id"	TEXT NOT NULL,
	"user_id"	TEXT NOT NULL,
	"hashed_password"	TEXT,
	PRIMARY KEY("id"),
	FOREIGN KEY("user_id") REFERENCES "user"("id")
);
CREATE TABLE IF NOT EXISTS "user_session" (
	"id"	TEXT NOT NULL,
	"user_id"	TEXT NOT NULL,
	"active_expires"	INTEGER NOT NULL,
	"idle_expires"	INTEGER NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("user_id") REFERENCES "user"("id")
);
CREATE TABLE IF NOT EXISTS "user" (
	"id"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"email"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "card" (
	"id"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"priority"	INTEGER NOT NULL,
	"color"	TEXT NOT NULL,
	"boardId"	TEXT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("boardId") REFERENCES "board"("id")
);
CREATE TABLE IF NOT EXISTS "board" (
	"id"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"ownerId"	TEXT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("ownerId") REFERENCES "user"("id")
);
CREATE TABLE IF NOT EXISTS "userBoard" (
	"userId"	TEXT NOT NULL,
	"boardId"	TEXT NOT NULL,
	PRIMARY KEY("userId","boardId"),
	FOREIGN KEY("userId") REFERENCES "user"("id"),
	FOREIGN KEY("boardId") REFERENCES "board"("id")
);
CREATE TABLE IF NOT EXISTS "task" (
	"id"	TEXT NOT NULL,
	"content"	TEXT NOT NULL,
	"creationDate"	TEXT NOT NULL,
	"hasNotDue"	INTEGER NOT NULL,
	"dueDate"	TEXT NOT NULL,
	"desc"	TEXT NOT NULL,
	"priority"	INTEGER NOT NULL,
	"isDone"	INTEGER NOT NULL,
	"cardId"	TEXT NOT NULL,
	"taskedId"	TEXT,
	PRIMARY KEY("id"),
	FOREIGN KEY("taskedId") REFERENCES "user"("id"),
	FOREIGN KEY("cardId") REFERENCES "card"("id")
);
COMMIT;
