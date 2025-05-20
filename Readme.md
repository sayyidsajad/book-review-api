# Book Review API

A RESTful API for managing users, books and reviews. Built with Node.js, Express, MongoDB and JWT authentication. Designed using clean architecture and production-level patterns.

---

## Features

- User signup/login with JWT authentication
- Add, view, search and filter books
- Submit one review per user per book
- Secure routes and input validation
- Centralized error handling and consistent API response format
- Modular folder structure with service/controller separation
---

## Tech Stack

- Node.js with Express.js
- MongoDB + Mongoose
- JWT for Authentication
- dotenv for environment config

---

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/sayyidsajad/book-review-api.git
cd book-review-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/book_review_db
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 4. Run the app

```bash
npm start
```

The server will run on `http://localhost:3000`

---

## Authentication Endpoints

| Method | Endpoint     | Description         |
|--------|--------------|---------------------|
| POST   | `/signup`    | Register a user     |
| POST   | `/login`     | Login and get token |

---

## Book Endpoints

| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
| POST   | `/books`           | Add new book (requires auth)         |
| GET    | `/books`           | List all books with optional filters |
| GET    | `/books/search`    | Search books by title or author      |
| GET    | `/books/:id`       | Get book details and reviews         |
| POST   | `/books/:id/reviews` | Add review (requires auth)        |

---

## Review Endpoints

| Method | Endpoint           | Description                       |
|--------|--------------------|-----------------------------------|
| PUT    | `/reviews/:id`     | Update own review (requires auth) |
| DELETE | `/reviews/:id`     | Delete own review (requires auth) |

---

## Database Schema

### 1. User

| Field     | Type     | Description                |
|-----------|----------|----------------------------|
| _id       | ObjectId | Unique identifier          |
| username  | String   | User's display name        |
| email     | String   | Unique email address       |
| password  | String   | Hashed password            |
| createdAt | Date     | User creation time         |
| updatedAt | Date     | Last update time           |

**Constraints:** unique email, hashed password, timestamps enabled

### 2. Book

| Field       | Type     | Description                   |
|-------------|----------|-------------------------------|
| _id         | ObjectId | Unique identifier             |
| title       | String   | Book title                    |
| author      | String   | Book author                   |
| genre       | String   | Genre/category                |
| description | String   | Short summary                 |
| createdAt   | Date     | Added time                    |
| updatedAt   | Date     | Last update time              |

### 3. Review

| Field     | Type     | Description                          |
|-----------|----------|--------------------------------------|
| _id       | ObjectId | Unique identifier                    |
| book      | ObjectId | Reference to related `Book`          |
| user      | ObjectId | Reference to `User`                  |
| rating    | Number   | Score between 1 and 5                |
| comment   | String   | Review content                      |
| createdAt | Date     | Created time                        |
| updatedAt | Date     | Last update time                    |

**Constraints:** One review per user per book (compound index), rating between 1–5

### ER Diagram (Conceptual)

```
User (1) ────< Book (M)
                 └───< Review (M) >───┐
                                     └───> User (1)
```

---

## Design Decisions

- Clean architecture with service/controller split
- Centralized error handling using custom `AppError` class
- Async functions wrapped with `catchAsync` utility
- Consistent API response format using `responseFormatter`
- Modular code with future scalability in mind

---