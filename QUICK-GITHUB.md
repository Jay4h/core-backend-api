# 🚀 Quick GitHub Connection Commands

## Copy & Paste These Commands After Creating Your GitHub Repository

### Step 1: Create Repository on GitHub
✅ GitHub page is open in your browser: https://github.com/new

**Repository Settings:**
- **Name**: `core-backend-api` (or your choice)
- **Description**: Core Backend API - 12 REST endpoints with JWT auth, MongoDB & Express
- **Privacy**: Private (recommended) or Public
- **DO NOT** check: Initialize with README, .gitignore, or license

---

### Step 2: Run These Commands

After creating the repository, run these in your terminal:

```bash
# Navigate to project (if not already there)
cd c:\trial\core-backend

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/core-backend-api.git

# Rename branch to 'main' (modern standard)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Example for user 'jay4h':**
```bash
git remote add origin https://github.com/jay4h/core-backend-api.git
git branch -M main
git push -u origin main
```

---

### 🔐 If Asked for Password

**DO NOT** use your GitHub password!

Use a **Personal Access Token** instead:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: `Core Backend API`
4. Check: **`repo`** (all checkboxes under it)
5. Click "Generate token"
6. **Copy the token** (starts with `ghp_`)
7. When Git asks for password, **paste the token**

---

### ✅ Verify It Worked

```bash
# Check remote connection
git remote -v

# Should show:
# origin  https://github.com/YOUR_USERNAME/core-backend-api.git (fetch)
# origin  https://github.com/YOUR_USERNAME/core-backend-api.git (push)
```

Then visit: `https://github.com/YOUR_USERNAME/core-backend-api`

You should see all your files there! ✨

---

### 📝 Future Updates

Whenever you make changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

---

**That's it! Your code is now on GitHub!** 🎉
