// Posts API service
// Connected to Django REST API

import { apiClient } from "./client"

interface Author {
    id: number
    username: string
    email: string
    is_author: boolean
}

interface Category {
    id: number
    name: string
    slug: string
}

interface Post {
    id: number
    title: string
    slug: string
    content: string
    excerpt: string
    status: "draft" | "published"
    category: Category
    author: Author
    image: string | null
    created_at: string
    updated_at: string
    comments_count?: number
}

interface PostListResponse {
    count: number
    next: string | null
    previous: string | null
    results: Post[]
}

interface CreatePostData {
    title: string
    content: string
    excerpt?: string
    category_id: number
    image?: string
    status: "draft" | "published"
}

export const postsApi = {
    // Get all posts (with pagination)
    async getAllPosts(page: number = 1): Promise<PostListResponse> {
        return apiClient.get<PostListResponse>(`/posts/?page=${page}`)
    },

    // Get single post by slug
    async getPostBySlug(slug: string): Promise<Post> {
        return apiClient.get<Post>(`/posts/${slug}/`)
    },

    // Get posts by category
    async getPostsByCategory(categorySlug: string, page: number = 1): Promise<PostListResponse> {
        return apiClient.get<PostListResponse>(`/posts/category/${categorySlug}/?page=${page}`)
    },

    // Get posts by author
    async getPostsByAuthor(username: string, page: number = 1): Promise<PostListResponse> {
        return apiClient.get<PostListResponse>(`/posts/author/${username}/?page=${page}`)
    },

    // Search posts
    async searchPosts(query: string, page: number = 1): Promise<PostListResponse> {
        return apiClient.get<PostListResponse>(`/posts/?search=${encodeURIComponent(query)}&page=${page}`)
    },

    // Create new post (author only)
    async createPost(data: CreatePostData): Promise<Post> {
        return apiClient.post<Post>("/posts/", data)
    },

    // Update post (owner only)
    async updatePost(slug: string, data: Partial<CreatePostData>): Promise<Post> {
        return apiClient.put<Post>(`/posts/${slug}/`, data)
    },

    // Delete post (owner only)
    async deletePost(slug: string): Promise<void> {
        return apiClient.delete<void>(`/posts/${slug}/`)
    },

    // Get user's own posts (drafts + published)
    async getMyPosts(page: number = 1): Promise<PostListResponse> {
        return apiClient.get<PostListResponse>(`/posts/my-posts/?page=${page}`)
    },
}
