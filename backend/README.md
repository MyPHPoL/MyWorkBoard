# Api endpoints

## User

### POST /register

input:
```json
{
    "email": "example@example.example",
    "name": "example", // minimum 4 max 31
    "password": "example123" // minimum 6 max 255
}
```

### POST /login

input:
```json
{
    "email": "example@example.example",
    "password": "example123" // minimum 6 max 255
}
```

### GET /

result:
```json
{
    "email": "example@example.example",
    "name": "example", 
    "password": "example123" 
}
```

### PATCH /

input:
```json
{
    "email": "example@example.example",
    "name": "example", 
}
```

### POST /logout

return: 204 no content

## Board

### POST /

input:
```json
{
    "name": "example", 
}
```

### GET /

result:
```json
{
    "name": "example", 
    "id": "some-id"
}
```

### PATCH /
query: ?id=some-id
body: 
```json
{
    "name": "example", 
}
```

### DELETE /

query: ?id=some-id

