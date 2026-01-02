// Authentication API service
// Connected to Django REST API

import { apiClient } from "./client"

interface User {
    id: number
    username: string
    email: string
    first_name?: string
    last_name?: string
    is_author: boolean
    created_at: string
}

interface AuthResponse {
    user: User
    tokens: {
        access: string
        refresh: string
    }
    message?: string
}

interface LoginResponse {
    access: string
    refresh: string
}

export const authApi = {
    // Register a new user
    async register(
        username: string,
        email: string,
        password: string,
        isAuthor: boolean = false,
        firstName?: string,
        lastName?: string
    ): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>("/auth/register/", {
            username,
            email,
            password,
            password2: password, // Django expects password confirmation
            is_author: isAuthor,
            first_name: firstName || "",
            last_name: lastName || "",
        })

        // Store tokens and user in localStorage
        if (typeof window !== "undefined") {
            localStorage.setItem("access_token", response.tokens.access)
            localStorage.setItem("refresh_token", response.tokens.refresh)
            localStorage.setItem("user", JSON.stringify(response.user))
        }

        return response
    },

    // Login user
    async login(username: string, password: string): Promise<AuthResponse> {
        // First, get tokens from login endpoint
        const loginResponse = await apiClient.post<LoginResponse>("/auth/login/", {
            username,
            password,
        })

        // Store tokens
        if (typeof window !== "undefined") {
            localStorage.setItem("access_token", loginResponse.access)
            localStorage.setItem("refresh_token", loginResponse.refresh)
        }

        // Then fetch user profile
        const profileResponse = await apiClient.get<User>("/auth/profile/")

        // Store user data
        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(profileResponse))
        }

        return {
            user: profileResponse,
            tokens: {
                access: loginResponse.access,
                refresh: loginResponse.refresh,
            },
        }
    },

    // Logout user
    async logout(): Promise<void> {
        try {
            const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null

            if (refreshToken) {
                await apiClient.post("/auth/logout/", {
                    refresh: refreshToken,
                })
            }
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            // Clear local storage regardless of API call success
            if (typeof window !== "undefined") {
                localStorage.removeItem("access_token")
                localStorage.removeItem("refresh_token")
                localStorage.removeItem("user")
            }
        }
    },

    // Refresh access token
    async refreshToken(refreshToken: string): Promise<{ access: string }> {
        const response = await apiClient.post<{ access: string }>("/auth/refresh/", {
            refresh: refreshToken,
        })

        // Update access token in localStorage
        if (typeof window !== "undefined") {
            localStorage.setItem("access_token", response.access)
        }

        return response
    },

    // Get current user profile
    async getProfile(): Promise<User> {
        return apiClient.get<User>("/auth/profile/")
    },

    // Update user profile
    async updateProfile(data: Partial<User>): Promise<User> {
        const response = await apiClient.put<User>("/auth/profile/", data)

        // Update user in localStorage
        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(response))
        }

        return response
    },

    // Get current user from localStorage
    getCurrentUser(): User | null {
        if (typeof window === "undefined") return null

        const userStr = localStorage.getItem("user")
        if (!userStr) return null

        try {
            return JSON.parse(userStr)
        } catch {
            return null
        }
    },

    // Check if user is authenticated
    isAuthenticated(): boolean {
        if (typeof window === "undefined") return false
        return !!localStorage.getItem("access_token")
    },
}
