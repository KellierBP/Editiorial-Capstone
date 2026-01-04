# Editorial — Full-Stack Blogging Platform

A modern, robust, and scalable blogging platform designed for thoughtful writing and curated content. Built with a **Django REST Framework** backend and a **Next.js** frontend, deployed on **Render**.

## 🚀 Live Demo

*   **Frontend**: [https://blog-frontend-cyzu.onrender.com](https://blog-frontend-cyzu.onrender.com)
*   **Backend API**: [https://blog-backend-u399.onrender.com/api/v1/](https://blog-backend-u399.onrender.com/api/v1/)

> **⚠️ Important Note on Performance (Render Free Tier)**
> Since this project is hosted on Render's **Free Tier**, the backend service will "sleep" after 15 minutes of inactivity to save resources.
>
> **If you visit the site and it feels stuck or slow to load (45-60 seconds), please be patient.** This is a "Cold Start" — Render is waking up the server, loading the Django application, and connecting to the database. Once awake, the site will remain fast and responsive!

---

## ✨ Features

This platform combines a powerful backend API with a sleek, responsive frontend.

### 🔐 User & Authentication
*   **Secure Auth**: JWT (JSON Web Tokens) based authentication.
*   **User Roles**: Distinction between **Authors** (can publish posts) and **Readers**.
*   **Profile Management**: Authors can manage their profile and content.

### 📝 Content Management
*   **Rich Editor**: Markdown-supported editor with specific inputs for Title, Category, and Cover Image.
*   **Image Integration**: Direct support for Unsplash and external image URLs to create beautiful cover art.
*   **Organization**: robust **Categories** system and **Tagging** (via search).
*   **Search & Filter**: Find posts by Title, Content keywords, Author, or Category.

### 💬 Community
*   **Comments**: Readers can engage with content (requires login).
*   **Social Sharing**: Integrated sharing for Twitter, LinkedIn, and Email.

---

## 🛠️ Technology Stack

### Backend (API)
*   **Framework**: Django 5.0+
*   **API**: Django REST Framework (DRF) 3.14+
*   **Authentication**: `djangorestframework-simplejwt`
*   **Database**: PostgreSQL (`psycopg2-binary`)
*   **Deployment**: `gunicorn` (WSGI server) & `whitenoise` (Static files)
*   **Utilities**: `python-decouple` (Environment variables), `Pillow` (Image processing)

### Frontend (Client)
*   **Framework**: Next.js 14+ (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **State**: React Context API (Auth) & Hooks
*   **Icons**: Lucide React

### Infrastructure
*   **Host**: Render (Web Services for both Frontend & Backend)
*   **Database**: Render PostgreSQL (Free Plan)

---

## 🏗️ Local Development Setup

Follow these steps to run the full stack locally.

### Prerequisites
*   Python 3.10+
*   Node.js 18+
*   PostgreSQL (optional, can use SQLite for dev)

### 1. Backend Setup

```bash
# Clone the repository
git clone <repo-url>
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Environment Setup
# Create a .env file in backend/blog_project/ with:
# SECRET_KEY=your_secret_key
# DEBUG=True
# ALLOWED_HOSTS=localhost,127.0.0.1
# DATABASE_URL=sqlite:///db.sqlite3  (or your local Postgres URL)

# Run Migrations
python manage.py migrate

# Seed Data (Optional - Populates DB with demo data)
python manage.py seed_data

# Run Server
python manage.py runserver
```
*The API will be available at `http://localhost:8000/api/v1/`*

### 2. Frontend Setup

```bash
# Navigate to project root (if not already there)
cd ..

# Install dependencies
npm install

# Environment Setup
# Create a .env.local file in root with:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1

# Run Development Server
npm run dev
```
*The Application will be available at `http://localhost:3000`*

---

## 📚 API Documentation

The CRUD API is fully documented and follows RESTful principles.

### Key Endpoints
*   `POST /auth/register/` - Register new user
*   `POST /auth/login/` - Login & receive Tokens
*   `GET /posts/` - List all published posts
*   `POST /posts/` - Create new post (Author only)
*   `GET /categories/` - List categories
*   `GET /posts/?search=keyword` - Search posts

---

## 🏛️ Database Schema (ERD)

The database centers around 3 core entities:
1.  **Users** (Authors/Readers)
2.  **Posts** (Belong to User + Category)
3.  **Comments** (Belong to User + Post)

*For a detailed breakdown, see the `public/` directory documentation.*
