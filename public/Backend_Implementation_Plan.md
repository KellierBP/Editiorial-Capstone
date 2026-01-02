# Django Backend Implementation Plan

## Overview

Building a Django REST Framework API for the blogging platform based on both specification documents. The backend will support user authentication, post management, categories, and comments, with deployment to Heroku or Railway.

## Combined Requirements Analysis

### From Document 1 (Detailed Spec):
- JWT authentication with user roles (readers vs authors)
- Post CRUD with draft/publish status
- Categories for posts
- Filter by author and category
- Search functionality
- Slug-based URLs

### From Document 2 (ERD & API):
- Comments on posts
- User-post-comment relationships
- Simpler endpoint structure

### Unified Feature Set:
✅ User authentication (JWT)
✅ User roles (is_author flag)
✅ Posts (CRUD, draft/publish, categories)
✅ Categories
✅ Comments (add, delete)
✅ Filtering (author, category)
✅ Search (title, content)

---

## Database Models

### 1. User Model
Extends Django's `AbstractUser`:
```python
- id (auto)
- username (unique)
- email (unique)
- password (hashed)
- first_name
- last_name
- is_author (boolean, default=False)
- created_at (auto)
```

### 2. Category Model
```python
- id (auto)
- name (unique)
- slug (unique, auto-generated)
- created_at (auto)
```

### 3. Post Model
```python
- id (auto)
- title
- slug (unique, auto-generated)
- content (TextField)
- excerpt (auto-generated from content)
- status (choices: 'draft', 'published')
- author (ForeignKey → User)
- category (ForeignKey → Category)
- image (optional, for future)
- created_at (auto)
- updated_at (auto)
```

### 4. Comment Model
```python
- id (auto)
- content (TextField)
- author (ForeignKey → User)
- post (ForeignKey → Post)
- created_at (auto)
```

---

## API Endpoints

Base URL: `/api/v1/`

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register/` | Register new user | No |
| POST | `/auth/login/` | Login & get JWT tokens | No |
| POST | `/auth/refresh/` | Refresh access token | No |
| GET | `/auth/profile/` | Get current user profile | Yes |

### Posts
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/posts/` | List all published posts | No |
| POST | `/posts/` | Create new post | Yes (Author) |
| GET | `/posts/{slug}/` | Get single post | No |
| PUT/PATCH | `/posts/{slug}/` | Update post | Yes (Owner) |
| DELETE | `/posts/{slug}/` | Delete post | Yes (Owner) |
| GET | `/posts/category/{slug}/` | Posts by category | No |
| GET | `/posts/author/{username}/` | Posts by author | No |
| GET | `/posts/search/?q={query}` | Search posts | No |

### Categories
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/categories/` | List all categories | No |
| GET | `/categories/{slug}/` | Get single category | No |

### Comments
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/posts/{slug}/comments/` | Get post comments | No |
| POST | `/posts/{slug}/comments/` | Add comment | Yes |
| DELETE | `/comments/{id}/` | Delete comment | Yes (Owner) |

---

## Implementation Steps

### Week 1: Project Setup & Models
- [NEW] `backend/` - Django project root
- [NEW] `backend/requirements.txt` - Dependencies
- [NEW] `backend/manage.py` - Django management
- [NEW] `backend/blog_api/` - Main app
- [NEW] `backend/blog_api/models.py` - All models
- [NEW] `backend/blog_api/admin.py` - Admin configuration

**Tasks:**
1. Initialize Django project
2. Install dependencies (Django, DRF, SimpleJWT, etc.)
3. Create User, Category, Post, Comment models
4. Run migrations
5. Register models in admin panel
6. Create superuser for testing

### Week 2: Authentication
- [NEW] `backend/blog_api/serializers/auth.py` - Auth serializers
- [NEW] `backend/blog_api/views/auth.py` - Auth views
- [NEW] `backend/blog_api/permissions.py` - Custom permissions

**Tasks:**
1. Install `djangorestframework-simplejwt`
2. Configure JWT settings
3. Create registration serializer & view
4. Create login view (token generation)
5. Create profile view
6. Implement `IsAuthor` permission
7. Implement `IsOwnerOrReadOnly` permission

### Week 3: Posts API
- [NEW] `backend/blog_api/serializers/posts.py` - Post serializers
- [NEW] `backend/blog_api/views/posts.py` - Post viewsets
- [NEW] `backend/blog_api/urls.py` - URL routing

**Tasks:**
1. Create PostSerializer (with nested author/category)
2. Create PostViewSet with CRUD operations
3. Implement slug auto-generation
4. Apply permissions (author-only create, owner-only edit/delete)
5. Filter published posts for public endpoints
6. Add filtering by category
7. Add filtering by author
8. Implement search functionality

### Week 4: Categories & Comments
- [NEW] `backend/blog_api/serializers/categories.py` - Category serializers
- [NEW] `backend/blog_api/serializers/comments.py` - Comment serializers
- [NEW] `backend/blog_api/views/categories.py` - Category views
- [NEW] `backend/blog_api/views/comments.py` - Comment views

**Tasks:**
1. Create CategorySerializer
2. Create CategoryViewSet
3. Create CommentSerializer
4. Create CommentViewSet
5. Implement nested comments under posts
6. Apply owner-only delete for comments

### Week 5: Testing & Deployment
- [NEW] `backend/blog_api/tests/` - Test files
- [NEW] `backend/Procfile` - Heroku/Railway config
- [NEW] `backend/runtime.txt` - Python version
- [MODIFY] `backend/settings.py` - Production settings

**Tasks:**
1. Write model tests
2. Write API endpoint tests
3. Write permission tests
4. Configure CORS for frontend
5. Set up environment variables
6. Configure PostgreSQL for production
7. Create Procfile for deployment
8. Deploy to Heroku or Railway
9. Test all endpoints in production

---

## Technology Stack

- **Framework**: Django 5.0+
- **API**: Django REST Framework 3.14+
- **Auth**: djangorestframework-simplejwt
- **Database (Dev)**: SQLite
- **Database (Prod)**: PostgreSQL
- **Deployment**: Heroku or Railway
- **CORS**: django-cors-headers

---

## Dependencies (requirements.txt)

```
Django>=5.0
djangorestframework>=3.14
djangorestframework-simplejwt>=5.3
django-cors-headers>=4.3
psycopg2-binary>=2.9
python-decouple>=3.8
gunicorn>=21.2
whitenoise>=6.6
Pillow>=10.1
```

---

## Environment Variables

```
SECRET_KEY=<django-secret-key>
DEBUG=False
ALLOWED_HOSTS=<your-domain>
DATABASE_URL=<postgres-url>
CORS_ALLOWED_ORIGINS=<frontend-url>
```

---

## Next Steps

1. ✅ Review this plan
2. Create Django project structure
3. Set up models and migrations
4. Implement authentication
5. Build Posts API
6. Add Categories & Comments
7. Test thoroughly
8. Deploy to production

This plan ensures we build a robust, scalable backend that matches both specification documents and integrates seamlessly with the frontend we've already built.
