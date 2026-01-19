# 🚀 GitHub Setup Guide

Your Core Backend is now initialized with Git! Follow these steps to connect it to GitHub.

---

## ✅ What's Already Done

- ✅ Git repository initialized
- ✅ All files committed to Git
- ✅ Git user configured: **jay4h** (thakkarjay152005@gmail.com)
- ✅ .gitignore configured (node_modules, .env are excluded)

**Current Status:**
- Branch: `master`
- Commit: Initial commit with 27 files

---

## 📋 Step-by-Step: Connect to GitHub

### **Step 1: Create a New Repository on GitHub**

1. Go to [GitHub](https://github.com)
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in the details:
   - **Repository name**: `core-backend-api` (or your preferred name)
   - **Description**: "Core Backend API for User & Task Management - 12 REST endpoints with JWT auth"
   - **Visibility**: Choose **Private** or **Public**
   - ⚠️ **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

---

### **Step 2: Link Your Local Repository to GitHub**

After creating the repository, GitHub will show you commands. Use these:

#### **Option A: If the branch is called 'main' on GitHub**
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/core-backend-api.git
git push -u origin main
```

#### **Option B: If the branch is called 'master' (current)**
```bash
git remote add origin https://github.com/YOUR_USERNAME/core-backend-api.git
git push -u origin master
```

**Replace:**
- `YOUR_USERNAME` with your GitHub username
- `core-backend-api` with your repository name

---

### **Step 3: Quick Commands (Copy & Paste)**

**For a repository named `core-backend-api` by user `jay4h`:**

```bash
# Add GitHub remote
git remote add origin https://github.com/jay4h/core-backend-api.git

# Rename branch to 'main' (optional, if you prefer 'main' over 'master')
git branch -M main

# Push to GitHub
git push -u origin main
```

**OR keep 'master' branch:**

```bash
# Add GitHub remote
git remote add origin https://github.com/jay4h/core-backend-api.git

# Push to GitHub
git push -u origin master
```

---

### **Step 4: Authentication**

When you run `git push`, you'll be prompted for authentication:

#### **Option 1: GitHub Personal Access Token (Recommended)**

1. Go to GitHub Settings → Developer settings → [Personal access tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Name: `Core Backend API`
4. Scopes: Check **`repo`** (full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)
7. When prompted for password, paste the token

#### **Option 2: GitHub CLI**
```bash
# Install GitHub CLI if not already
winget install --id GitHub.cli

# Authenticate
gh auth login
```

#### **Option 3: SSH Key**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "thakkarjay152005@gmail.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH and GPG keys → New SSH key
```

Then use SSH URL:
```bash
git remote add origin git@github.com:jay4h/core-backend-api.git
git push -u origin main
```

---

## 🎯 Verify Connection

After pushing, verify:

```bash
# Check remote
git remote -v

# Expected output:
# origin  https://github.com/jay4h/core-backend-api.git (fetch)
# origin  https://github.com/jay4h/core-backend-api.git (push)
```

---

## 📝 Common Git Commands for Future Use

### **Push Changes**
```bash
git add .
git commit -m "Your commit message"
git push
```

### **Pull Latest Changes**
```bash
git pull
```

### **Check Status**
```bash
git status
```

### **View Commit History**
```bash
git log --oneline
```

### **Create a New Branch**
```bash
git checkout -b feature/new-feature
```

### **Switch Branches**
```bash
git checkout main
```

---

## 🔒 Security Notes

### **⚠️ Important: .env File**

Your `.env` file (which contains secrets) is **already excluded** from Git via `.gitignore`. This means:

- ✅ `.env` is NOT in the repository
- ✅ Your JWT secrets are safe
- ✅ Database credentials are private

### **What's Committed:**
- ✅ Source code
- ✅ `.env.example` (template without secrets)
- ✅ Documentation
- ✅ Package files

### **What's NOT Committed:**
- ❌ `.env` (your actual secrets)
- ❌ `node_modules/` (dependencies)
- ❌ Build files
- ❌ Logs

---

## 📋 Next Steps After Pushing to GitHub

### **1. Add Repository Description**
On GitHub, edit your repository and add:
- Description: "Core Backend API - 12 REST endpoints for User & Task Management with JWT authentication, MongoDB, and Express.js"
- Topics: `nodejs`, `express`, `mongodb`, `jwt`, `rest-api`, `backend`, `api`

### **2. Create a README Badge**
Add to your README.md:
```markdown
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![License](https://img.shields.io/badge/License-ISC-yellow)
```

### **3. Enable GitHub Actions (Optional)**
Create `.github/workflows/test.yml` for automated testing.

### **4. Add Collaborators**
If working in a team: Settings → Collaborators → Add people

---

## 🎨 Recommended Repository Settings

1. **Branch Protection** (for production):
   - Settings → Branches → Add rule for `main`
   - Require pull request reviews
   - Require status checks to pass

2. **GitHub Pages** (Optional):
   - Host your API docs as a website

3. **Secrets** (for GitHub Actions):
   - Settings → Secrets and variables → Actions
   - Add: `MONGODB_URI`, `JWT_SECRET`, etc.

---

## 🆘 Troubleshooting

### **Error: "remote origin already exists"**
```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### **Error: "Permission denied (publickey)"**
Use HTTPS instead of SSH, or set up SSH keys properly.

### **Error: "Authentication failed"**
Use a Personal Access Token instead of your password.

### **Large Files Warning**
If any file is too large, use Git LFS:
```bash
git lfs install
git lfs track "*.zip"
```

---

## ✅ Your Setup Checklist

- [x] Git repository initialized
- [x] Initial commit created (27 files)
- [x] .gitignore configured
- [ ] GitHub repository created
- [ ] Remote origin added
- [ ] Code pushed to GitHub
- [ ] Repository description added
- [ ] Topics/tags added
- [ ] Collaborators added (if needed)

---

## 🎉 Success!

Once you push to GitHub, your Core Backend will be:
- ✅ Version controlled
- ✅ Backed up in the cloud
- ✅ Shareable with team members
- ✅ Ready for CI/CD pipelines
- ✅ Portfolio-ready

---

**Need Help?**

Run these commands in your terminal:
```bash
cd c:\trial\core-backend
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin master
```

Replace `YOUR_USERNAME` and `REPO_NAME` with your details!
