"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"

interface SignUpFormProps {
    onSuccess: () => void
    onSwitchToSignIn: () => void
}

export function SignUpForm({ onSuccess, onSwitchToSignIn }: SignUpFormProps) {
    const { register } = useAuth()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAuthor: false,
    })
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setIsLoading(true)

        try {
            await register(formData.username, formData.email, formData.password, formData.isAuthor)
            onSuccess()
        } catch (err) {
            setError("Registration failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h2 className="font-serif text-3xl text-foreground mb-2">Create Account</h2>
                <p className="text-sm text-muted-foreground">Join Editorial today</p>
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
                        placeholder="Choose a username"
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm uppercase tracking-wider text-foreground font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-b-2 border-dotted border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                        placeholder="your@email.com"
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
                        placeholder="Create a password"
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm uppercase tracking-wider text-foreground font-medium mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-b-2 border-dotted border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                        placeholder="Confirm your password"
                    />
                </div>

                {/* Author Checkbox */}
                <div className="flex items-center gap-3 pt-2">
                    <input
                        type="checkbox"
                        id="isAuthor"
                        name="isAuthor"
                        checked={formData.isAuthor}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <label htmlFor="isAuthor" className="text-sm text-foreground">
                        Register as an <span className="font-medium">Author</span> (can create posts)
                    </label>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider"
                >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                </Button>
            </form>

            {/* Switch to Sign In */}
            <div className="text-center">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <button
                        onClick={onSwitchToSignIn}
                        className="text-foreground hover:text-accent transition-colors font-medium"
                    >
                        Sign In
                    </button>
                </p>
            </div>
        </div>
    )
}
