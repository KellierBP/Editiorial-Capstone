"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"

interface SignInFormProps {
    onSuccess: () => void
    onSwitchToSignUp: () => void
}

export function SignInForm({ onSuccess, onSwitchToSignUp }: SignInFormProps) {
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            await login(formData.username, formData.password)
            onSuccess()
        } catch (err) {
            setError("Invalid username or password")
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h2 className="font-serif text-3xl text-foreground mb-2">Welcome Back</h2>
                <p className="text-sm text-muted-foreground">Sign in to continue to Editorial</p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive">{error}</p>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div>
                    <label htmlFor="username" className="block text-sm uppercase tracking-wider text-foreground font-medium mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-b-2 border-dotted border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                        placeholder="Enter your username"
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm uppercase tracking-wider text-foreground font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-b-2 border-dotted border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                        placeholder="Enter your password"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider"
                >
                    {isLoading ? "Signing In..." : "Sign In"}
                </Button>
            </form>

            {/* Switch to Sign Up */}
            <div className="text-center">
                <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                        onClick={onSwitchToSignUp}
                        className="text-foreground hover:text-accent transition-colors font-medium"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    )
}
