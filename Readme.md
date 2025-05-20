# Database Schema

This project uses **MongoDB** with three main collections: `User`, `Book` and `Review`.

---

## 1. User

| Field     | Type     | Description                |
| --------- | -------- | -------------------------- |
| \_id      | ObjectId | Unique identifier          |
| username  | String   | User's display name        |
| email     | String   | Unique email address       |
| password  | String   | Hashed password            |
| createdAt | Date     | Timestamp of user creation |
| updatedAt | Date     | Timestamp of last update   |

**Constraints:**

- `email` is unique and required
- Password is stored hashed (bcrypt)

---

## 2. Book

| Field       | Type     | Description                   |
| ----------- | -------- | ----------------------------- |
| \_id        | ObjectId | Unique identifier             |
| title       | String   | Title of the book             |
| author      | String   | Book author                   |
| genre       | String   | Book genre/category           |
| description | String   | Brief summary or description  |
| createdAt   | Date     | Timestamp when book was added |
| updatedAt   | Date     | Timestamp of last update      |

---

## 3. Review

| Field     | Type     | Description                          |
| --------- | -------- | ------------------------------------ |
| \_id      | ObjectId | Unique identifier                    |
| book      | ObjectId | Reference to the related `Book`      |
| user      | ObjectId | Reference to the `User` who wrote it |
| rating    | Number   | Rating score (1 to 5)                |
| comment   | String   | Review comment                       |
| createdAt | Date     | Timestamp when review was created    |
| updatedAt | Date     | Timestamp of last update             |

**Constraints:**

- One review per user per book (unique compound index on `book + user`)
- `rating` must be between 1 and 5

---

## ER Diagram (Conceptual)

```text
User (1) ────< Book (M)
                 └───< Review (M) >───┐
                                     └───> User (1)
```
