# Frontend Integration Guide - Phase 6

## Overview
This guide outlines how to connect the Next.js frontend to the Django REST API backend. We'll replace all mock data with real API calls and test each feature thoroughly.

---

## Prerequisites
- ✅ Django backend running on `http://localhost:8000`
- ✅ Next.js frontend running on `http://localhost:3000`
- ✅ CORS configured in Django settings

---

## Integration Checklist

### 1. Environment Setup
- [ ] Create `.env.local` in frontend root
- [ ] Add `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1`
- [ ] Update `lib/api/client.ts` to use environment variable
- [ ] Test API client connection

### 2. Authentication Integration
**Files to Update:**
- [ ] `lib/api/auth.ts` - Replace mock with real API calls
- [ ] `contexts/AuthContext.tsx` - Use real auth API
- [ ] Test registration flow
- [ ] Test login flow (get JWT tokens)
- [ ] Test token refresh
- [ ] Test logout (blacklist token)
- [ ] Test profile view/update
- [ ] Verify JWT tokens stored in localStorage
- [ ] Verify protected routes redirect when not authenticated

### 3. Posts/Articles Integration
**Files to Update:**
- [ ] `lib/api/posts.ts` - Replace mock with real API calls
- [ ] `app/page.tsx` - Fetch real featured posts
- [ ] `app/discover/page.tsx` - Fetch all published posts
- [ ] `app/article/[slug]/page.tsx` - Fetch single post by slug
- [ ] `app/search/page.tsx` - Use real search API
- [ ] Test post listing (pagination works)
- [ ] Test post detail view
- [ ] Test filtering by category
- [ ] Test filtering by author
- [ ] Test search functionality
- [ ] Verify draft posts only visible to author

### 4. Categories Integration
**Files to Update:**
- [ ] `lib/api/categories.ts` - Replace mock with real API calls
- [ ] `app/categories/page.tsx` - Fetch all categories
- [ ] `app/category/[slug]/page.tsx` - Fetch posts by category
- [ ] `components/filter-modal.tsx` - Use real categories
- [ ] Test category listing
- [ ] Test category detail page
- [ ] Test category filtering
- [ ] Verify post counts are accurate

### 5. Comments Integration
**Files to Update:**
- [ ] `lib/api/comments.ts` - Replace mock with real API calls
- [ ] `app/article/[slug]/page.tsx` - Fetch/create/delete comments
- [ ] Test viewing comments
- [ ] Test adding comment (auth required)
- [ ] Test deleting own comment
- [ ] Test cannot delete other's comments
- [ ] Verify comments update in real-time

### 6. Dashboard Integration
**Files to Update:**
- [ ] `app/dashboard/page.tsx` - Fetch user's posts
- [ ] `app/dashboard/editor/[id]/page.tsx` - Create/update posts
- [ ] Test viewing own posts (drafts + published)
- [ ] Test creating new post
- [ ] Test editing own post
- [ ] Test deleting own post
- [ ] Test publishing draft
- [ ] Test unpublishing post
- [ ] Verify non-authors cannot access dashboard

### 7. Author Pages Integration
**Files to Update:**
- [ ] `app/author/[username]/page.tsx` - Fetch author's posts
- [ ] `app/profile/page.tsx` - Fetch current user profile
- [ ] Test author profile view
- [ ] Test author's published posts
- [ ] Test profile stats (post count)

---

## API Endpoints Reference

### Authentication
```
POST   /api/v1/auth/register/     - Register new user
POST   /api/v1/auth/login/        - Login (get tokens)
POST   /api/v1/auth/refresh/      - Refresh access token
POST   /api/v1/auth/logout/       - Logout (blacklist token)
GET    /api/v1/auth/profile/      - Get current user
PUT    /api/v1/auth/profile/      - Update profile
```

### Posts
```
GET    /api/v1/posts/                        - List all published posts
POST   /api/v1/posts/                        - Create post (author only)
GET    /api/v1/posts/{slug}/                 - Get single post
PUT    /api/v1/posts/{slug}/                 - Update post (owner only)
DELETE /api/v1/posts/{slug}/                 - Delete post (owner only)
GET    /api/v1/posts/category/{slug}/        - Posts by category
GET    /api/v1/posts/author/{username}/      - Posts by author
GET    /api/v1/posts/?search={query}         - Search posts
```

### Categories
```
GET    /api/v1/categories/        - List all categories
GET    /api/v1/categories/{slug}/ - Get category by slug
```

### Comments
```
GET    /api/v1/posts/{slug}/comments/     - Get post comments
POST   /api/v1/posts/{slug}/comments/     - Add comment (auth)
DELETE /api/v1/posts/{slug}/comments/{id}/ - Delete comment (owner)
```

---

## Testing Checklist

### Manual Testing
- [ ] Register new user (reader)
- [ ] Register new user (author)
- [ ] Login with both accounts
- [ ] Create post as author
- [ ] View post as reader
- [ ] Add comment as reader
- [ ] Delete own comment
- [ ] Edit post as author
- [ ] Delete post as author
- [ ] Search for posts
- [ ] Filter by category
- [ ] Filter by author
- [ ] Test pagination
- [ ] Logout

### Error Handling
- [ ] Test invalid login credentials
- [ ] Test expired token refresh
- [ ] Test unauthorized actions (non-author creating post)
- [ ] Test 404 for non-existent posts
- [ ] Test network errors (backend down)
- [ ] Test validation errors (empty fields)

### UI/UX Testing
- [ ] Loading states show during API calls
- [ ] Error messages display properly
- [ ] Success messages display properly
- [ ] Forms clear after submission
- [ ] Redirects work correctly
- [ ] Protected routes redirect to login

---

## Common Issues & Solutions

### CORS Errors
**Problem:** Browser blocks API requests
**Solution:** Verify Django CORS settings include `http://localhost:3000`

### 401 Unauthorized
**Problem:** API returns 401 for protected endpoints
**Solution:** Check JWT token in localStorage, verify token not expired

### 404 Not Found
**Problem:** API endpoint not found
**Solution:** Verify URL matches backend routes, check trailing slashes

### Network Error
**Problem:** Cannot connect to backend
**Solution:** Ensure Django server is running on port 8000

---

## Next Steps After Integration
1. Test all features thoroughly
2. Fix any bugs discovered
3. Optimize API calls (caching, debouncing)
4. Add loading skeletons
5. Add error boundaries
6. Prepare for deployment (Phase 7)
