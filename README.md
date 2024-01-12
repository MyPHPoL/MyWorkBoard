# MyWorkBoard

> Project management tool powered by MyPHPoL written in Angular

## Features:

- create multiple boards to manage your projects
- each board can contain multiple cards with different names, priorities and colors
- cards can store multiple tasks with names, descriptions, due dates and priorities
- complete your tasks before they reach their deadline
- filter and sort tasks by name or priority
- move cards and tasks with a mouse drag
- multiple webpage themes
- custom restful api in Express.js, utilizing Lucia auth and SQlite for the database
- authentication and authorization
- work with multiple users on your boards


## Installation and Usage

Run inside frontend directory.

installing packages:
```bash
npm install
```
launching app:
```bash 
ng serve --open
```
After that page should open in a new card

## Running backend

Create the .env file with content from .env.example in /backend/
Then create the database by accessing site:
```html
localhost:3000/createDb
```

You can run backend with
```bash
npm run dev --workspace=backend
```



## Made by:

Piotr Radziszewski \
Paweł Świerzbiński \
Paweł Oświeciński \
Dawid Szymański

MyPHPoL™ 2023
