# Divs-Scripts API Documentation

This document provides an overview of all available API endpoints.

## Authentication

| Method | Endpoint                   | Description         | Auth Required |
| ------ | -------------------------- | ------------------- | ------------- |
| POST   | `/api/auth/login`          | User login          | No            |
| POST   | `/api/auth/register`       | User registration   | No            |
| GET    | `/api/auth/profile`        | Get user profile    | Yes           |
| PATCH  | `/api/auth/update-profile` | Update user profile | Yes           |

## Users

| Method | Endpoint         | Description    | Auth Required |
| ------ | ---------------- | -------------- | ------------- |
| GET    | `/api/users/`    | Get all users  | Yes           |
| GET    | `/api/users/:id` | Get user by ID | Yes           |
| POST   | `/api/users/`    | Create user    | Yes           |
| PUT    | `/api/users/:id` | Update user    | Yes           |
| DELETE | `/api/users/:id` | Delete user    | Yes           |

## Dashboard

| Method | Endpoint          | Description        | Auth Required |
| ------ | ----------------- | ------------------ | ------------- |
| GET    | `/api/dashboard/` | Get dashboard data | Yes           |

## Classification

| Method | Endpoint            | Description             | Auth Required |
| ------ | ------------------- | ----------------------- | ------------- |
| POST   | `/api/classify`     | Classify personality    | No            |
| GET    | `/api/classify/all` | Get all classifications | Yes           |

## Emotions

| Method | Endpoint                  | Description                   | Auth Required |
| ------ | ------------------------- | ----------------------------- | ------------- |
| GET    | `/api/emotions/`          | Get all emotions              | Yes           |
| GET    | `/api/emotions/last7days` | Get emotions from last 7 days | Yes           |
| POST   | `/api/emotions/`          | Create emotion                | Yes           |
| GET    | `/api/emotions/:id`       | Get emotion by ID             | Yes           |
| PUT    | `/api/emotions/:id`       | Update emotion                | Yes           |
| DELETE | `/api/emotions/:id`       | Delete emotion                | Yes           |

## Notes

| Method | Endpoint         | Description    | Auth Required |
| ------ | ---------------- | -------------- | ------------- |
| GET    | `/api/notes/`    | Get all notes  | Yes           |
| GET    | `/api/notes/:id` | Get note by ID | Yes           |
| POST   | `/api/notes/`    | Create note    | Yes           |
| PUT    | `/api/notes/:id` | Update note    | Yes           |
| DELETE | `/api/notes/:id` | Delete note    | Yes           |

## Activities

| Method | Endpoint              | Description        | Auth Required |
| ------ | --------------------- | ------------------ | ------------- |
| GET    | `/api/activities/`    | Get all activities | Yes           |
| GET    | `/api/activities/:id` | Get activity by ID | Yes           |
| POST   | `/api/activities/`    | Create activity    | Yes           |
| PUT    | `/api/activities/:id` | Update activity    | Yes           |
| DELETE | `/api/activities/:id` | Delete activity    | Yes           |

## Chats

| Method | Endpoint                  | Description          | Auth Required |
| ------ | ------------------------- | -------------------- | ------------- |
| GET    | `/api/chats/`             | Get all chats        | Yes           |
| GET    | `/api/chats/:id`          | Get chat by ID       | Yes           |
| POST   | `/api/chats/`             | Create chat          | Yes           |
| POST   | `/api/chats/:id/messages` | Send message in chat | Yes           |
| PUT    | `/api/chats/:id/title`    | Update chat title    | Yes           |
| DELETE | `/api/chats/:id`          | Delete chat          | Yes           |

## Archetypes

| Method | Endpoint              | Description         | Auth Required |
| ------ | --------------------- | ------------------- | ------------- |
| GET    | `/api/archetypes/`    | Get all archetypes  | Yes           |
| GET    | `/api/archetypes/:id` | Get archetype by ID | Yes           |
| POST   | `/api/archetypes/`    | Create archetype    | Yes           |
| PUT    | `/api/archetypes/:id` | Update archetype    | Yes           |
| DELETE | `/api/archetypes/:id` | Delete archetype    | Yes           |

## Temperaments

| Method | Endpoint                | Description           | Auth Required |
| ------ | ----------------------- | --------------------- | ------------- |
| GET    | `/api/temperaments/`    | Get all temperaments  | Yes           |
| GET    | `/api/temperaments/:id` | Get temperament by ID | Yes           |
| POST   | `/api/temperaments/`    | Create temperament    | Yes           |
| PUT    | `/api/temperaments/:id` | Update temperament    | Yes           |
| DELETE | `/api/temperaments/:id` | Delete temperament    | Yes           |

## Onboarding

| Method | Endpoint                | Description                         | Auth Required |
| ------ | ----------------------- | ----------------------------------  | ------------- |
| POST   | `/api/onboarding/`      | Create temperament and archetype    | Yes           |

## Authentication

Most endpoints require authentication using a JWT token. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

The token is obtained from the login endpoint.

## Error Handling

All endpoints return appropriate HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

Error responses include a message and often details about the error.
