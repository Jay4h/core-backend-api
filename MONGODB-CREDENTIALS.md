# 🗄️ MongoDB Atlas - Finding Your Credentials

## 📍 Where to Find Your MongoDB Username & Password

### **Step 1: Log into MongoDB Atlas**
1. Go to: https://cloud.mongodb.com
2. Log in with your account (Email, Google, or GitHub)

---

### **Step 2: Find Database Username**

After logging in:

1. **Look at the LEFT SIDEBAR**
2. Find the **"Security"** section
3. Click on **"Database Access"**

You'll see a page with **"Database Users"** table.

**Your username is shown in the "User" column**

Example: It might be something like:
- `admin`
- `taskuser`
- `jay4h`
- Or whatever you created

---

### **Step 3: Get/Reset Password**

**⚠️ Important**: Passwords are NOT shown for security reasons.

**If you don't remember your password:**

1. Click the **"EDIT"** button next to your database user
2. Click **"Edit Password"**
3. You have 2 options:
   - **Option A**: Click "Autogenerate Secure Password" (MongoDB creates a strong one)
   - **Option B**: Enter your own password
4. **📋 COPY THE PASSWORD** (you won't see it again!)
5. Click **"Update User"** at the bottom

---

### **Step 4: Check Network Access (Important!)**

Still in the Security section:

1. Click **"Network Access"** (in left sidebar)
2. You should see IP addresses listed

**For Development/Testing:**
- Click **"Add IP Address"**
- Choose **"Allow Access from Anywhere"** (0.0.0.0/0)
- Click **"Confirm"**

**For Production:**
- Add only your server's specific IP address

---

### **Step 5: Get Your Connection String**

1. Go back to **"Database"** (in left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string

It looks like:
```
mongodb+srv://<username>:<password>@ac-oj2ipwf.tsck7j9.mongodb.net/?retryWrites=true&w=majority
```

Note: Based on your cluster ID, your connection string should be:
```
mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@ac-oj2ipwf.tsck7j9.mongodb.net/task-management?retryWrites=true&w=majority
```

---

## 🔑 What You Need to Tell Me

Once you have the credentials, provide:

1. **Username**: (e.g., `admin`, `taskuser`, etc.)
2. **Password**: (the one you just copied or reset)

**Example:**
- Username: `admin`
- Password: `MySecurePassword123`

---

## 🚀 Quick Steps Summary

```
1. Go to: https://cloud.mongodb.com
2. Log in
3. Left Sidebar → Security → Database Access
4. Find your username in the "User" column
5. If needed: Click "Edit" → "Edit Password" → Copy new password
6. Left Sidebar → Security → Network Access
7. Add IP: 0.0.0.0/0 (Allow from anywhere)
8. Tell me your username and password
```

---

## 📝 Alternative: Create New Database User

If you don't have a user yet or want a new one:

1. **Database Access** page
2. Click **"+ ADD NEW DATABASE USER"**
3. Choose **"Password"** authentication
4. **Username**: Enter one (e.g., `taskuser`)
5. **Password**: Click "Autogenerate Secure Password" or enter your own
6. **📋 COPY THE PASSWORD!**
7. **Database User Privileges**: Select "Read and write to any database"
8. Click **"Add User"**

---

## ⚠️ Security Note

**Never share your password publicly or commit it to Git!**

Once I have your username and password, I'll:
1. Update your `.env` file securely
2. Restart the server
3. Connect to MongoDB Atlas cloud database

---

**MongoDB Atlas is open in your browser. Log in and follow the steps above!**

Let me know your username and password when ready! 🔐
