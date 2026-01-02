# API Service Layer - Export all services

This directory contains all API service files for communicating with the backend.

## Structure

- `client.ts` - Base API client with HTTP methods and auth token handling
- `auth.ts` - Authentication services (login, register, logout, token refresh)
- `posts.ts` - Posts CRUD operations, filtering, and search
- `categories.ts` - Categories retrieval

## Current Status

All services are currently using **mock data** to allow frontend development without a backend.

## Usage

```typescript
import { authApi } from '@/lib/api/auth'
import { postsApi } from '@/lib/api/posts'
import { categoriesApi } from '@/lib/api/categories'

// Example: Login
const response = await authApi.login('username', 'password')

// Example: Get all posts
const posts = await postsApi.getAllPosts()

// Example: Get categories
const categories = await categoriesApi.getAllCategories()
```

## Backend Integration

When the Django backend is ready:

1. Uncomment the real API calls in each service file
2. Comment out the mock implementations
3. Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
4. Test all endpoints

The structure is already in place - just swap mock for real!
