// Base API client configuration
// This will be used by all API services

const getBaseUrl = () => {
    let url = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1"
    // Remove trailing slash if present
    if (url.endsWith('/')) {
        url = url.slice(0, -1)
    }
    // Append /api/v1 if not present
    if (!url.endsWith('/api/v1')) {
        url += '/api/v1'
    }
    return url
}

const API_BASE_URL = getBaseUrl()

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
            let errorMessage = `API Error: ${response.statusText}`
            try {
                const text = await response.text()
                try {
                    const errorBody = JSON.parse(text)
                    if (typeof errorBody === 'object' && errorBody !== null) {
                        if ('detail' in errorBody) {
                            errorMessage = errorBody.detail
                        } else {
                            errorMessage = Object.entries(errorBody)
                                .map(([key, val]) => `${key}: ${val}`)
                                .join(', ')
                        }
                    }
                } catch {
                    // If JSON parse fails, show the raw text (up to 100 chars)
                    // This catches HTML 400s or empty bodies
                    errorMessage = `API Error (${response.status}): ${text.slice(0, 100)}`
                }
            } catch (e) {
                // Failed to read text, fall back to status
            }

            const error: ApiError = {
                message: errorMessage,
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
