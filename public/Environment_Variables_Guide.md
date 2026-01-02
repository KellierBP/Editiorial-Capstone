# Environment Variables Guide

## Overview
This guide lists all sensitive data and configuration that should be moved to environment variables for security and flexibility.

---

## Frontend (.env.local)

**Location:** `Capstone/.env.local`

**Already Configured:**
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

**No additional secrets needed for frontend!** ✅
- Next.js doesn't need API keys for this project
- All authentication happens via JWT tokens from backend
- The `NEXT_PUBLIC_` prefix means it's safe to expose to browser

---

## Backend (.env)

**Location:** `Capstone/backend/.env`

**Currently Hardcoded (Need to Move):**

### 1. Django Secret Key
**Current Location:** `backend/blog_project/settings.py` line 23
```python
SECRET_KEY = 'django-insecure-zx^fe^2n4%k2l#420&+x&xyb@3^)ndg&70#)s0_b%1&g8oc4b#'
```

**Should be:**
```bash
# .env
SECRET_KEY=your-secret-key-here
```

**In settings.py:**
```python
from decouple import config
SECRET_KEY = config('SECRET_KEY')
```

### 2. Debug Mode
**Current Location:** `backend/blog_project/settings.py` line 26
```python
DEBUG = True
```

**Should be:**
```bash
# .env
DEBUG=True  # False in production
```

**In settings.py:**
```python
DEBUG = config('DEBUG', default=False, cast=bool)
```

### 3. Allowed Hosts
**Current Location:** `backend/blog_project/settings.py` line 28
```python
ALLOWED_HOSTS = []
```

**Should be:**
```bash
# .env
ALLOWED_HOSTS=localhost,127.0.0.1  # Add production domain later
```

**In settings.py:**
```python
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='').split(',')
```

### 4. Database URL (for Production)
**Current:** Using SQLite (fine for development)

**For Production:**
```bash
# .env (production)
DATABASE_URL=postgresql://user:password@host:port/dbname
```

**In settings.py:**
```python
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        default='sqlite:///' + str(BASE_DIR / 'db.sqlite3')
    )
}
```

### 5. CORS Allowed Origins
**Current Location:** `backend/blog_project/settings.py` line 157
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

**Should be:**
```bash
# .env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
# Production: https://your-frontend-domain.com
```

**In settings.py:**
```python
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', default='').split(',')
```

---

## Complete .env Files

### Frontend: `.env.local`
```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

### Backend: `.env`
```bash
# Django Configuration
SECRET_KEY=your-secret-key-here-generate-new-one
DEBUG=True

# Security
ALLOWED_HOSTS=localhost,127.0.0.1

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Database (optional for development, required for production)
# DATABASE_URL=sqlite:///db.sqlite3
```

---

## Production Environment Variables

### Heroku/Railway Deployment
Set these in your hosting platform's dashboard:

```bash
# Django
SECRET_KEY=<generate-new-secret-key>
DEBUG=False
ALLOWED_HOSTS=your-app.herokuapp.com
DATABASE_URL=<provided-by-heroku>
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app

# Next.js (Vercel)
NEXT_PUBLIC_API_BASE_URL=https://your-backend.herokuapp.com/api/v1
```

---

## How to Generate Secret Key

**For Django SECRET_KEY:**
```python
# Run in Python shell
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

Or use online generator: https://djecrety.ir/

---

## .gitignore Check

**Make sure these are in `.gitignore`:**
```
# Frontend
.env.local
.env*.local

# Backend
backend/.env
backend/db.sqlite3
backend/__pycache__/
backend/*.pyc
```

---

## Priority Actions

### For Development (Now):
1. ✅ Frontend `.env.local` - Already has API URL
2. ⚠️ Backend `.env` - **Optional for now** (hardcoded values work for local dev)

### For Production (Later):
1. ❌ **MUST** move all secrets to environment variables
2. ❌ **MUST** generate new SECRET_KEY
3. ❌ **MUST** set DEBUG=False
4. ❌ **MUST** configure DATABASE_URL
5. ❌ **MUST** set ALLOWED_HOSTS and CORS

---

## Recommendation

**For now (development):**
- Keep hardcoded values in Django settings
- Just use `.env.local` for frontend API URL
- **This is fine for local development!**

**Before deployment:**
- Create backend `.env` file
- Move all secrets to environment variables
- Update settings.py to use `python-decouple`

**Want me to set up the backend `.env` now, or wait until deployment?**
