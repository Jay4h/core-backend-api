# Deployment Guide - Core Backend

## 🚀 Deployment Options

This guide covers deploying your Core Backend to popular hosting platforms.

---

## Option 1: Render.com (Recommended - Free Tier Available)

### Step 1: Prepare Repository
```bash
git init
git add .
git commit -m "Initial commit - Core Backend"
git remote add origin <your-github-repo>
git push -u origin main
```

### Step 2: Create MongoDB Atlas Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a FREE cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/task-management`

### Step 3: Deploy to Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `core-backend-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-management
   JWT_SECRET=your-super-secret-production-key-change-this
   JWT_REFRESH_SECRET=your-refresh-token-secret
   JWT_EXPIRES_IN=24h
   JWT_REFRESH_EXPIRES_IN=7d
   ALLOWED_ORIGINS=https://your-bff-domain.com
   ```

6. Click "Create Web Service"

### Step 4: Test Deployment
```bash
curl https://your-app.onrender.com/stats/health
```

**Render URL**: `https://your-app-name.onrender.com`

---

## Option 2: Railway.app

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
railway login
```

### Step 2: Deploy
```bash
cd core-backend
railway init
railway up
```

### Step 3: Configure Environment
```bash
railway variables set NODE_ENV=production
railway variables set MONGODB_URI=mongodb+srv://...
railway variables set JWT_SECRET=your-secret
railway variables set ALLOWED_ORIGINS=https://your-frontend.com
```

### Step 4: Get URL
```bash
railway domain
```

---

## Option 3: Heroku

### Step 1: Install Heroku CLI
Download from [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

### Step 2: Create App
```bash
heroku login
heroku create your-app-name
```

### Step 3: Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your-secret
heroku config:set ALLOWED_ORIGINS=https://your-frontend.com
```

### Step 4: Deploy
```bash
git push heroku main
```

### Step 5: Test
```bash
heroku open
curl https://your-app.herokuapp.com/stats/health
```

---

## Option 4: DigitalOcean App Platform

### Step 1: Create App
1. Go to [DigitalOcean Apps](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Connect GitHub repository
4. Select `core-backend` directory

### Step 2: Configure
- **Type**: Web Service
- **Build Command**: `npm install`
- **Run Command**: `npm start`
- **HTTP Port**: 5000

### Step 3: Environment Variables
Add in the UI:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret
ALLOWED_ORIGINS=https://your-frontend.com
```

### Step 4: Deploy
Click "Deploy"

---

## Option 5: Fly.io (Global Edge Deployment)

### Step 1: Install Fly CLI
```bash
curl -L https://fly.io/install.sh | sh
fly auth login
```

### Step 2: Create fly.toml
```toml
app = "your-app-name"

[env]
  NODE_ENV = "production"
  PORT = "8080"

[http_service]
  internal_port = 8080
  force_https = true
```

### Step 3: Deploy
```bash
fly launch
fly secrets set MONGODB_URI=mongodb+srv://...
fly secrets set JWT_SECRET=your-secret
fly deploy
```

---

## 🗄️ MongoDB Atlas Setup (Required for All)

### Step 1: Create Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free
3. Create a FREE M0 cluster (512MB storage)

### Step 2: Database Access
1. Database Access → Add New Database User
2. Choose "Password" authentication
3. Username: `taskuser`
4. Password: Generate strong password
5. User Privileges: "Read and write to any database"

### Step 3: Network Access
1. Network Access → Add IP Address
2. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or whitelist specific IPs for better security

### Step 4: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy connection string:
   ```
   mongodb+srv://taskuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name: `.../task-management?retryWrites=true&w=majority`

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Change `JWT_REFRESH_SECRET` to a different strong value
- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas with proper authentication
- [ ] Whitelist only necessary IP addresses (or use 0.0.0.0/0 if BFF IP is dynamic)
- [ ] Set `ALLOWED_ORIGINS` to your actual BFF/frontend domain
- [ ] Enable HTTPS (most platforms do this automatically)
- [ ] Review and remove any console.log with sensitive data
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Enable MongoDB Atlas backup
- [ ] Use environment variables for ALL secrets

---

## 🔐 Generating Strong Secrets

### Option 1: Node.js
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Option 2: OpenSSL
```bash
openssl rand -hex 64
```

### Option 3: Online
Use: https://randomkeygen.com/ (Fort Knox Passwords section)

---

## 📊 Post-Deployment Testing

### 1. Health Check
```bash
curl https://your-domain.com/stats/health
```

Expected: `{"success":true,"data":{"status":"OK"}}`

### 2. Register Test User
```bash
curl -X POST https://your-domain.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

### 3. Login
```bash
curl -X POST https://your-domain.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

Save the `accessToken` from response!

### 4. Create Task
```bash
curl -X POST https://your-domain.com/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Task","status":"pending"}'
```

---

## 🌐 CORS Configuration for Production

Update `.env` with your actual BFF domain:

```env
ALLOWED_ORIGINS=https://your-bff.vercel.app,https://your-frontend.com
```

Multiple origins separated by commas.

---

## 📈 Monitoring & Logging

### Option 1: Sentry (Error Tracking)
```bash
npm install @sentry/node
```

Add to `src/app.js`:
```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

// Add before error handler
app.use(Sentry.Handlers.errorHandler());
```

### Option 2: LogRocket
For session replay and logging

### Option 3: Platform Logs
- **Render**: Built-in logs in dashboard
- **Railway**: `railway logs`
- **Heroku**: `heroku logs --tail`

---

## 🔄 CI/CD Setup

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

Add `RENDER_DEPLOY_HOOK` to GitHub Secrets.

---

## 📝 Environment Variables Summary

| Variable | Example | Required |
|----------|---------|----------|
| `NODE_ENV` | `production` | Yes |
| `PORT` | `5000` | Yes |
| `MONGODB_URI` | `mongodb+srv://...` | Yes |
| `JWT_SECRET` | Random 64 chars | Yes |
| `JWT_REFRESH_SECRET` | Random 64 chars | Yes |
| `JWT_EXPIRES_IN` | `24h` | No (has default) |
| `JWT_REFRESH_EXPIRES_IN` | `7d` | No (has default) |
| `ALLOWED_ORIGINS` | `https://bff.com` | Yes |
| `SENTRY_DSN` | Sentry URL | No (optional) |

---

## 🎯 Keep Core Backend Private (Important!)

According to your architecture, the Core Backend should NOT be publicly accessible by Framer. It should only be called by the BFF layer.

### Options to Keep Private:

1. **Firewall Rules** (DigitalOcean, AWS)
   - Only allow traffic from BFF IP

2. **Internal API Key**
   - Add API key verification middleware
   - BFF includes key in headers

3. **VPC/Private Network** (Advanced)
   - Deploy Core Backend in private network
   - Only BFF can reach it

4. **IP Whitelisting**
   - Only allow BFF server IP

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Connection string tested locally
- [ ] All environment variables set
- [ ] JWT secrets are strong and unique
- [ ] CORS configured for BFF domain
- [ ] Health endpoint works
- [ ] Register/Login tested
- [ ] Task CRUD tested  
- [ ] Error monitoring configured
- [ ] Backup strategy in place
- [ ] Documentation updated with production URL

---

## 🆘 Troubleshooting

### MongoDB Connection Fails
- Check connection string format
- Verify database user credentials
- Ensure IP is whitelisted (0.0.0.0/0 for all)
- Test connection locally first

### Server Won't Start
- Check logs for specific error
- Verify PORT environment variable
- Ensure all dependencies installed
- Check Node.js version (14+)

### CORS Errors
- Update `ALLOWED_ORIGINS` in env
- Check if CORS middleware is loaded
- Verify protocol (http vs https)

### JWT Errors
- Ensure `JWT_SECRET` is set
- Check token format in Authorization header
- Verify token hasn't expired

---

**Ready to deploy! Choose your platform and follow the steps above.**

*For BFF layer deployment, follow similar steps but expose it publicly for Framer.*
