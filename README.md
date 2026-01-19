# Core Backend API - User & Task Management System

A robust, secure, and scalable RESTful API built with Node.js, Express, and MongoDB for user authentication and task management.

## 🚀 Features

- **JWT Authentication** - Secure token-based authentication
- **User Management** - Profile creation and updates
- **Task CRUD Operations** - Complete task management with filtering and pagination
- **Statistics Dashboard** - Comprehensive user task analytics
- **Input Validation** - Express-validator for request validation
- **Error Handling** - Centralized error handling with proper HTTP status codes
- **Security** - Helmet, CORS, bcrypt password hashing
- **Database** - MongoDB with Mongoose ODM

## 📋 API Endpoints (12 Total)

### Authentication (3 endpoints)
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Users (2 endpoints)
- `GET /users/me` - Get current user profile
- `PATCH /users/me` - Update current user profile

### Tasks (5 endpoints)
- `POST /tasks` - Create new task
- `GET /tasks` - Get all tasks (with filters, sorting, pagination)
- `GET /tasks/:id` - Get single task by ID
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Stats & Health (2 endpoints)
- `GET /stats` - Get user statistics
- `GET /stats/health` - Health check endpoint

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS
- **Logging**: Morgan

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Steps

1. **Clone and navigate to the project**
   ```bash
   cd core-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/task-management
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=24h
   ALLOWED_ORIGINS=http://localhost:3000
   ```

4. **Start the server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

## 🔐 Authentication Flow

1. **Register**: `POST /auth/register`
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```
   
   Response includes `accessToken` and `refreshToken`

2. **Login**: `POST /auth/login`
   ```json
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **Use Token**: Include in Authorization header
   ```
   Authorization: Bearer <your-access-token>
   ```

## 📝 API Usage Examples

### Create a Task
```bash
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "status": "pending",
  "dueDate": "2026-01-25T00:00:00.000Z"
}
```

### Get Tasks with Filters
```bash
GET /tasks?status=pending&sortBy=dueDate&order=asc&limit=10&page=1
Authorization: Bearer <token>
```

### Update Task
```bash
PATCH /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "done"
}
```

### Get Statistics
```bash
GET /stats
Authorization: Bearer <token>
```

Response:
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

## 🏗️ Project Structure

```
core-backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js   # Auth logic
│   │   ├── users.controller.js  # User logic
│   │   ├── tasks.controller.js  # Task logic
│   │   └── stats.controller.js  # Stats logic
│   ├── middleware/
│   │   ├── auth.middleware.js   # JWT verification
│   │   ├── error.middleware.js  # Error handling
│   │   └── validator.middleware.js # Input validation
│   ├── models/
│   │   ├── user.model.js        # User schema
│   │   └── task.model.js        # Task schema
│   ├── routes/
│   │   ├── auth.routes.js       # Auth routes
│   │   ├── users.routes.js      # User routes
│   │   ├── tasks.routes.js      # Task routes
│   │   └── stats.routes.js      # Stats routes
│   ├── utils/
│   │   └── jwt.util.js          # JWT helpers
│   └── app.js                   # Express app setup
├── .env.example                 # Environment template
├── .gitignore
├── package.json
└── README.md
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure access & refresh tokens
- **Input Validation**: express-validator for all inputs
- **Helmet**: Security headers
- **CORS**: Configurable origin restrictions
- **NoSQL Injection Prevention**: Mongoose sanitization
- **Error Handling**: No sensitive data in error responses

## 📊 Database Models

### User Model
```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, validated),
  passwordHash: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  userId: ObjectId (ref: User, indexed),
  title: String (required, 1-200 chars),
  description: String (optional, max 1000 chars),
  status: String (enum: ['pending', 'done']),
  dueDate: Date (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

To test the API, you can use:
- **Postman** - Import the endpoints
- **curl** - Command line testing
- **Thunder Client** (VS Code extension)
- **Insomnia** - REST client

Example curl:
```bash
# Health check
curl http://localhost:5000/stats/health

# Register
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string and update `MONGODB_URI` in `.env`
3. Whitelist your server IP

### Deployment Platforms
- **Render**: Easy deployment with free tier
- **Railway**: Simple with automatic SSL
- **Fly.io**: Global edge deployment
- **Heroku**: Classic PaaS option
- **DigitalOcean App Platform**: Managed container service

## 📈 Next Steps (for BFF Integration)

This Core Backend is designed to work with a BFF (Backend-for-Frontend) layer:

1. **Keep this API private** - Don't expose publicly
2. **BFF calls these endpoints** - Using internal API keys
3. **BFF handles sessions** - Cookie-based for Framer
4. **BFF adds rate limiting** - Protect against abuse
5. **BFF simplifies responses** - Optimize for UI needs

## 🤝 Development

### Running in Development
```bash
npm run dev
```

### Code Structure Guidelines
- Controllers handle business logic
- Services for complex operations (future)
- Middleware for cross-cutting concerns
- Models define data schema and methods
- Routes map URLs to controllers

## 📄 License

ISC

## 👨‍💻 Author

Built for the User & Task Management System

---

**Note**: This is the Core Backend layer. For production, combine with a BFF layer for enhanced security and better frontend integration.
