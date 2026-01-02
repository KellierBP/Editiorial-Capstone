// Base API client configuration
// This will be used by all API services

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1"

interface ApiError {
    message: string
    status: number
}

class ApiClient {
    private baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    private getAuthToken(): string | null {
        if (typeof window === "undefined") return null
        return localStorage.getItem("access_token")
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const error: ApiError = {
                message: `API Error: ${response.statusText}`,
                status: response.status,
            }
            throw error
        }
        return response.json()
    }

    async get<T>(endpoint: string): Promise<T> {
        const token = this.getAuthToken()
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        }
        if (token) {
            headers["Authorization"] = `Bearer ${token}`
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "GET",
            headers,
        })
        return this.handleResponse<T>(response)
    }

    async post<T>(endpoint: string, data: any): Promise<T> {
        const token = this.getAuthToken()
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        }
        if (token) {
            headers["Authorization"] = `Bearer ${token}`
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        })
        return this.handleResponse<T>(response)
    }

    async put<T>(endpoint: string, data: any): Promise<T> {
        const token = this.getAuthToken()
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        }
        if (token) {
            headers["Authorization"] = `Bearer ${token}`
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(data),
        })
        return this.handleResponse<T>(response)
    }

    async delete<T>(endpoint: string): Promise<T> {
        const token = this.getAuthToken()
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        }
        if (token) {
            headers["Authorization"] = `Bearer ${token}`
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "DELETE",
            headers,
        })
        return this.handleResponse<T>(response)
    }
}

export const apiClient = new ApiClient(API_BASE_URL)
