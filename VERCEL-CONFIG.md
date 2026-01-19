# 🚀 Vercel Environment Variable Configuration

## ✅ Add This to Vercel RIGHT NOW

### **Step-by-Step:**

1. Go to: https://vercel.com/thakkarjay152005-gmailcoms-projects/core-backend-
2. Click **"Settings"** tab (top navigation)
3. Click **"Environment Variables"** (left sidebar)
4. Click **"Add New"** button

---

## 📋 Environment Variables to Add

### **Variable 1: MONGODB_URI** (REQUIRED)

**Name/Key**: 
```
MONGODB_URI
```

**Value**: 
```
mongodb+srv://thakkarjay152005:ZBaHUpJ7Bq1LAeeD@cluster0.tsck7j9.mongodb.net/task-management?retryWrites=true&w=majority&appName=Cluster0
```

**Environments**: ✅ Check ALL three:
- ✅ Production
- ✅ Preview  
- ✅ Development

Click **"Save"**

---

### **Variable 2: JWT_SECRET** (REQUIRED)

**Name/Key**: 
```
JWT_SECRET
```

**Value**: 
```
super-secret-jwt-key-change-in-production-12345
```

**Environments**: ✅ Check ALL three

Click **"Save"**

---

### **Variable 3: JWT_REFRESH_SECRET** (REQUIRED)

**Name/Key**: 
```
JWT_REFRESH_SECRET
```

**Value**: 
```
super-secret-refresh-token-key-98765
```

**Environments**: ✅ Check ALL three

Click **"Save"**

---

### **Variable 4: NODE_ENV** (REQUIRED)

**Name/Key**: 
```
NODE_ENV
```

**Value**: 
```
production
```

**Environments**: ✅ Production only

Click **"Save"**

---

### **Variable 5: ALLOWED_ORIGINS** (Optional but Recommended)

**Name/Key**: 
```
ALLOWED_ORIGINS
```

**Value**: 
```
https://core-backend-two.vercel.app,https://your-frontend-domain.com
```

**Environments**: ✅ Check ALL three

Click **"Save"**

---

## 🔄 Redeploy After Adding Variables

### **Option 1: Redeploy via Vercel Dashboard**
1. Go to **"Deployments"** tab
2. Click **"..."** (three dots) on the LATEST deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes

### **Option 2: Redeploy via Git Push**
```bash
# Make a small change
git commit --allow-empty -m "Trigger redeployment with environment variables"
git push
```

---

## ✅ Test Your Deployment

After redeployment, test:

```bash
# Health check
curl https://core-backend-two.vercel.app/stats/health

# Or open in browser:
https://core-backend-two.vercel.app/stats/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is healthy",
  "data": {
    "status": "OK",
    "database": "connected"
  }
}
```

---

## 🎯 COPY-PASTE READY

**For quick copy-paste into Vercel:**

1. **MONGODB_URI**:
   ```
   mongodb+srv://thakkarjay152005:ZBaHUpJ7Bq1LAeeD@cluster0.tsck7j9.mongodb.net/task-management?retryWrites=true&w=majority&appName=Cluster0
   ```

2. **JWT_SECRET**:
   ```
   super-secret-jwt-key-change-in-production-12345
   ```

3. **JWT_REFRESH_SECRET**:
   ```
   super-secret-refresh-token-key-98765
   ```

4. **NODE_ENV**:
   ```
   production
   ```

---

**Your Vercel URL**: https://core-backend-two.vercel.app/

**Add these variables NOW and redeploy!** 🚀
