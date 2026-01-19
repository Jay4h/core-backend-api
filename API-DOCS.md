# API Endpoints Documentation

## Base URL
```
http://localhost:5000
```

---

## 🔓 Public Endpoints (No Authentication Required)

### 1. Health Check
**GET** `/stats/health`

Check if the server and database are running.

**Response:**
```json
{
  "success": true,
  "message": "Server is healthy",
  "data": {
    "status": "OK",
    "timestamp": "2026-01-19T14:34:07.000Z",
    "uptime": 123.45,
    "database": "connected",
    "environment": "development"
  }
}
```

---

## 🔐 Authentication Endpoints

### 2. Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "60d5ec49f1b2c72b8c8e4f1a",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-01-19T14:34:07.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation:**
- `name`: 2-50 characters
- `email`: Valid email format
- `password`: Minimum 6 characters

---

### 3. Login User
**POST** `/auth/login`

Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "60d5ec49f1b2c72b8c8e4f1a",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-01-19T14:34:07.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 4. Logout User
**POST** `/auth/logout`

Logout current user (client should delete tokens).

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## 👤 User Endpoints (Authentication Required)

### 5. Get Current User Profile
**GET** `/users/me`

Get the profile of the currently authenticated user.

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "60d5ec49f1b2c72b8c8e4f1a",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-01-19T14:34:07.000Z",
      "updatedAt": "2026-01-19T14:34:07.000Z"
    }
  }
}
```

---

### 6. Update Current User Profile
**PATCH** `/users/me`

Update the current user's profile information.

**Headers:**
```
Authorization: Bearer <access-token>
Content-Type: application/json
```

**Request Body (all fields optional):**
```json
{
  "name": "John Updated",
  "email": "john.new@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "60d5ec49f1b2c72b8c8e4f1a",
      "name": "John Updated",
      "email": "john.new@example.com",
      "createdAt": "2026-01-19T14:34:07.000Z",
      "updatedAt": "2026-01-19T15:20:15.000Z"
    }
  }
}
```

---

## ✅ Task Endpoints (Authentication Required)

### 7. Create Task
**POST** `/tasks`

Create a new task for the current user.

**Headers:**
```
Authorization: Bearer <access-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "pending",
  "dueDate": "2026-01-25T00:00:00.000Z"
}
```

**Fields:**
- `title` (required): 1-200 characters
- `description` (optional): Max 1000 characters
- `status` (optional): "pending" or "done" (default: "pending")
- `dueDate` (optional): ISO 8601 date format

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {
      "_id": "60d5ec49f1b2c72b8c8e4f2b",
      "userId": "60d5ec49f1b2c72b8c8e4f1a",
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API docs",
      "status": "pending",
      "dueDate": "2026-01-25T00:00:00.000Z",
      "createdAt": "2026-01-19T14:34:07.000Z",
      "updatedAt": "2026-01-19T14:34:07.000Z"
    }
  }
}
```

---

### 8. Get All Tasks
**GET** `/tasks`

Get all tasks for the current user with optional filters, sorting, and pagination.

**Headers:**
```
Authorization: Bearer <access-token>
```

**Query Parameters (all optional):**
- `status`: Filter by status ("pending" or "done")
- `sortBy`: Field to sort by (default: "createdAt")
- `order`: Sort order ("asc" or "desc", default: "desc")
- `limit`: Results per page (default: 50)
- `page`: Page number (default: 1)

**Example:**
```
GET /tasks?status=pending&sortBy=dueDate&order=asc&limit=10&page=1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "_id": "60d5ec49f1b2c72b8c8e4f2b",
        "userId": "60d5ec49f1b2c72b8c8e4f1a",
        "title": "Complete project documentation",
        "description": "Write comprehensive README and API docs",
        "status": "pending",
        "dueDate": "2026-01-25T00:00:00.000Z",
        "createdAt": "2026-01-19T14:34:07.000Z",
        "updatedAt": "2026-01-19T14:34:07.000Z"
      }
    ],
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 10,
      "pages": 3
    }
  }
}
```

---

### 9. Get Task by ID
**GET** `/tasks/:id`

Get a specific task by its ID.

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "task": {
      "_id": "60d5ec49f1b2c72b8c8e4f2b",
      "userId": "60d5ec49f1b2c72b8c8e4f1a",
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API docs",
      "status": "pending",
      "dueDate": "2026-01-25T00:00:00.000Z",
      "createdAt": "2026-01-19T14:34:07.000Z",
      "updatedAt": "2026-01-19T14:34:07.000Z"
    }
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

### 10. Update Task
**PATCH** `/tasks/:id`

Update an existing task.

**Headers:**
```
Authorization: Bearer <access-token>
Content-Type: application/json
```

**Request Body (all fields optional):**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "done",
  "dueDate": "2026-01-26T00:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "task": {
      "_id": "60d5ec49f1b2c72b8c8e4f2b",
      "userId": "60d5ec49f1b2c72b8c8e4f1a",
      "title": "Updated title",
      "description": "Updated description",
      "status": "done",
      "dueDate": "2026-01-26T00:00:00.000Z",
      "createdAt": "2026-01-19T14:34:07.000Z",
      "updatedAt": "2026-01-19T15:45:30.000Z"
    }
  }
}
```

---

### 11. Delete Task
**DELETE** `/tasks/:id`

Delete a task permanently.

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "task": {
      "_id": "60d5ec49f1b2c72b8c8e4f2b",
      "title": "Complete project documentation",
      "status": "done"
    }
  }
}
```

---

## 📊 Statistics Endpoints

### 12. Get User Statistics
**GET** `/stats`

Get comprehensive statistics about the current user's tasks.

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalTasks": 25,
      "pendingTasks": 10,
      "completedTasks": 15,
      "overdueTasks": 2,
      "tasksCreatedToday": 3,
      "tasksCompletedToday": 5,
      "completionRate": 60.00
    }
  }
}
```

---

## 🔴 Error Responses

All endpoints may return these common error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token provided. Authorization denied."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Route /invalid-route not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "email already exists"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 🔑 Authentication

All protected endpoints require a JWT access token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Lifecycle

1. **Obtain Token**: Login or Register
2. **Use Token**: Include in Authorization header
3. **Token Expires**: Default 24 hours
4. **Refresh Token**: Use refresh token to get new access token (implementation ready)
5. **Logout**: Client removes tokens

---

## 📋 Summary

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/stats/health` | GET | ❌ | Health check |
| `/auth/register` | POST | ❌ | Register user |
| `/auth/login` | POST | ❌ | Login user |
| `/auth/logout` | POST | ✅ | Logout user |
| `/users/me` | GET | ✅ | Get profile |
| `/users/me` | PATCH | ✅ | Update profile |
| `/tasks` | POST | ✅ | Create task |
| `/tasks` | GET | ✅ | List tasks |
| `/tasks/:id` | GET | ✅ | Get task |
| `/tasks/:id` | PATCH | ✅ | Update task |
| `/tasks/:id` | DELETE | ✅ | Delete task |
| `/stats` | GET | ✅ | Get statistics |

**Total: 12 Endpoints** ✅

---

*Generated for Core Backend API v1.0.0*
