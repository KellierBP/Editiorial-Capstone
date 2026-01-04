"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { authApi } from "@/lib/api/auth"

interface User {
    id: number
    username: string
    email: string
    first_name?: string
    last_name?: string
    is_author: boolean
    created_at: string
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isAuthor: boolean
    loading: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => Promise<void>
    register: (username: string, email: string, password: string, isAuthor: boolean) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    // Load user from localStorage on mount
    useEffect(() => {
        const loadUser = () => {
            const currentUser = authApi.getCurrentUser()
            setUser(currentUser)
            setLoading(false)
        }

        loadUser()

        // Listen for 401 Unauthorized events from API client
        const handleUnauthorized = () => {
            setUser(null)
            // Optional: Redirect to login or show notification
            console.log("Session expired. Logging out.")
        }

        window.addEventListener("auth:unauthorized", handleUnauthorized)

        return () => {
            window.removeEventListener("auth:unauthorized", handleUnauthorized)
        }
    }, [])

    const login = async (username: string, password: string) => {
        try {
            const response = await authApi.login(username, password)
            setUser(response.user)
        } catch (error) {
            console.error("Login error:", error)
            throw error
        }
    }

    const logout = async () => {
        try {
            await authApi.logout()
            setUser(null)
        } catch (error: any) {
            // If the token is invalid (401), we don't need to log an error
            // because we are logging out anyway.
            if (error?.status !== 401) {
                console.error("Logout error:", error)
            }
            // Clear user even if API call fails
            setUser(null)
        }
    }

    const register = async (username: string, email: string, password: string, isAuthor: boolean) => {
        try {
            const response = await authApi.register(username, email, password, isAuthor)
            setUser(response.user)
        } catch (error) {
            console.error("Registration error:", error)
            throw error
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isAuthor: user?.is_author || false,
                loading,
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
