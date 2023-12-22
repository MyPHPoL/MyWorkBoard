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
- integration with json-server

## Installation and Usage

Run inside frontend directory.

installing packages:
```bash
npm install
```
installing json-server: 
```bash
npm install -g json-server
```  
launching db.json: 
```bash
json-server --watch db.json
```  
launching app:
```bash 
ng serve --open
```
After that page should open in a new card

## Running backend

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
