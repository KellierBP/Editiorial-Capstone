// Comments API service
// Connected to Django REST API

import { apiClient } from "./client"

interface Author {
    id: number
    username: string
    email: string
    is_author: boolean
}

interface Comment {
    id: number
    content: string
    author: Author
    post: number
    created_at: string
}

export const commentsApi = {
    // Get comments for a post
    async getCommentsByPost(postSlug: string): Promise<Comment[]> {
        return apiClient.get<Comment[]>(`/posts/${postSlug}/comments/`)
    },

    // Create a comment on a post (auth required)
    async createComment(postSlug: string, content: string): Promise<Comment> {
        return apiClient.post<Comment>(`/posts/${postSlug}/comments/`, {
            content,
        })
    },

    // Delete a comment (owner only)
    async deleteComment(postSlug: string, commentId: number): Promise<void> {
        return apiClient.delete<void>(`/posts/${postSlug}/comments/${commentId}/`)
    },
}
