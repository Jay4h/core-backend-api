# Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (v14+)
- ✅ MongoDB installed locally OR MongoDB Atlas account

## Option 1: Local MongoDB

### Install MongoDB locally:
1. Download from: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. MongoDB will run on `mongodb://localhost:27017`

### Start the server:
```bash
npm run dev
```

## Option 2: MongoDB Atlas (Cloud)

### Setup MongoDB Atlas:
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a FREE cluster
3. Create database user
4. Get connection string
5. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-management
   ```

### Start the server:
```bash
npm run dev
```

## Testing the API

### 1. Health Check (No auth required)
```bash
curl http://localhost:5000/stats/health
```

### 2. Register a User
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

Save the `accessToken` from the response!

### 3. Get Your Profile
```bash
curl http://localhost:5000/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. Create a Task
```bash
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d "{\"title\":\"My First Task\",\"status\":\"pending\"}"
```

### 5. Get All Tasks
```bash
curl http://localhost:5000/tasks \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 6. Get Statistics
```bash
curl http://localhost:5000/stats \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Using Postman

1. Import `postman-collection.json` into Postman
2. Set `baseUrl` variable to `http://localhost:5000`
3. Register/Login to get access token
4. Set `accessToken` variable with the token you received
5. Start testing all endpoints!

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB service or use MongoDB Atlas

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in `.env` file or kill the process using port 5000

### JWT Secret Warning
**Always change** `JWT_SECRET` in `.env` for production!

## Next Steps

✅ Backend is running!
✅ All 12 endpoints are working!

Now you can:
1. Build the BFF (Backend-for-Frontend) layer
2. Connect Framer to the BFF
3. Deploy to production

---

Happy coding! 🚀
