// Categories API service
// Connected to Django REST API

import { apiClient } from "./client"

interface Category {
    id: number
    name: string
    slug: string
    created_at: string
    posts_count: number
}

export const categoriesApi = {
    // Get all categories
    async getAllCategories(): Promise<Category[]> {
        return apiClient.get<Category[]>("/categories/")
    },

    // Get single category by slug
    async getCategoryBySlug(slug: string): Promise<Category> {
        return apiClient.get<Category>(`/categories/${slug}/`)
    },
}
