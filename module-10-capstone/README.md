# Module 10 Capstone — Notes API

A REST API for managing personal notes, built with Express and Prisma (SQLite). Capstone project for the Node.js Foundations self-paced course.

## Setup

```bash
npm install
cp .env.example .env
npm run db:migrate
```

## Run

```bash
npm run dev
```

The server starts at `http://localhost:3000`. Check it's up with:

```bash
curl http://localhost:3000/health
```

## Test

```bash
npm test
npm run test:coverage
```

## Endpoints

| Method | Route        | Description                     | Status     |
| ------ | ------------ | -------------------------------- | ---------- |
| GET    | `/health`    | Health check                     | 200        |
| GET    | `/notes`     | List all notes, newest first     | 200        |
| GET    | `/notes/:id` | Get a single note                | 200 / 404  |
| POST   | `/notes`     | Create a new note                | 201 / 400  |
| PUT    | `/notes/:id` | Update a note                    | 200 / 400 / 404 |
| DELETE | `/notes/:id` | Delete a note                    | 204 / 404  |

### Note fields

| Field       | Rules                                      |
| ----------- | ------------------------------------------- |
| `title`     | Required. String. 1–100 characters.         |
| `content`   | Required. String. 1–5000 characters.        |
| `tag`       | Optional. String. Max 30 characters.        |
| `id`        | Auto-generated.                             |
| `createdAt` | Auto-set on creation.                       |
| `updatedAt` | Auto-updated on modification.               |

### Error format

```json
{
  "error": {
    "status": 400,
    "message": "title is required"
  }
}
```

## Project structure

```
module-10-capstone/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes/notes.js
│   ├── middleware/validate.js
│   ├── middleware/errorHandler.js
│   └── db.js
├── tests/
│   └── notes.test.js
├── bruno/
│   └── Notes API.json
└── package.json
```

## API client

[`bruno/Notes API.json`](./bruno/Notes%20API.json) is a Postman v2.1-format collection with one request per endpoint. Import it into Bruno or Postman to try the API against a running server.
