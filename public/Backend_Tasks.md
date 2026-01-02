# Django Backend Development

## Phase 1: Project Setup
- [ ] Initialize Django project in backend folder
- [ ] Install dependencies (Django, DRF, JWT, etc.)
- [ ] Configure settings.py
- [ ] Set up database (SQLite for dev)
- [ ] Create superuser

## Phase 2: Database Models
- [ ] Create User model (extend AbstractUser)
- [ ] Create Category model
- [ ] Create Post model
- [ ] Create Comment model
- [ ] Run migrations
- [ ] Register models in admin

## Phase 3: Authentication
- [ ] Install SimpleJWT
- [ ] Create registration endpoint
- [ ] Create login endpoint
- [ ] Create profile endpoint
- [ ] Create custom permissions (IsAuthor, IsOwnerOrReadOnly)
- [ ] Test authentication flow

## Phase 4: Posts API
- [ ] Create Post serializers
- [ ] Create Post viewset (CRUD)
- [ ] Implement slug auto-generation
- [ ] Add filtering (category, author)
- [ ] Add search functionality
- [ ] Apply permissions
- [ ] Test all endpoints

## Phase 5: Categories & Comments
- [ ] Create Category serializers & views
- [ ] Create Comment serializers & views
- [ ] Implement nested comments
- [ ] Apply permissions
- [ ] Test endpoints

## Phase 6: Frontend Integration
- [ ] Configure CORS
- [ ] Update frontend API services
- [ ] Test authentication flow
- [ ] Test all CRUD operations
- [ ] Test filtering & search

## Phase 7: Deployment
- [ ] Set up PostgreSQL
- [ ] Configure production settings
- [ ] Create Procfile
- [ ] Set environment variables
- [ ] Deploy to Heroku/Railway
- [ ] Test production endpoints
- [ ] Connect frontend to production API
