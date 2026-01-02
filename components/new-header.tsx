"use client"

import Link from "next/link"
import { Search, Menu, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { AuthModal } from "@/components/auth-modal"
import { SignInForm } from "@/components/sign-in-form"
import { SignUpForm } from "@/components/sign-up-form"
import { SearchModal } from "@/components/search-modal"

export function NewHeader() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [authModalOpen, setAuthModalOpen] = useState<"signin" | "signup" | null>(null)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const { user, isAuthenticated, isAuthor, logout } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLogout = () => {
        logout()
        setIsMobileMenuOpen(false)
    }

    const handleAuthSuccess = () => {
        setAuthModalOpen(null)
        setIsMobileMenuOpen(false)
    }

    return (
        <>
            <header
                className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
                    }`}
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="flex items-center justify-between h-20">
                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-foreground"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        {/* Left: Navigation Links */}
                        <nav className="hidden md:flex items-center gap-8">
                            <Link
                                href="/discover"
                                className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Discover
                            </Link>
                            <Link
                                href="/categories"
                                className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Categories
                            </Link>
                            {isAuthor && (
                                <Link
                                    href="/dashboard"
                                    className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </nav>

                        {/* Center: Logo */}
                        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                            <div className="font-serif text-2xl tracking-tight text-foreground">Editorial</div>
                        </Link>

                        {/* Right: Search & Auth */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            {isAuthenticated ? (
                                <>
                                    {/* Profile Icon */}
                                    <Link href="/profile" className="hidden md:block">
                                        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                                            <User className="w-5 h-5" />
                                        </button>
                                    </Link>
                                    {/* Logout Button */}
                                    <button
                                        onClick={handleLogout}
                                        className="hidden md:flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setAuthModalOpen("signin")}
                                        className="hidden md:block text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Sign In
                                    </button>
                                    <Button
                                        onClick={() => setAuthModalOpen("signup")}
                                        className="hidden md:block h-10 px-6 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider"
                                    >
                                        Sign Up
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden border-t border-border bg-background">
                            <nav className="flex flex-col py-4 space-y-1">
                                <Link
                                    href="/discover"
                                    className="px-6 py-3 text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Discover
                                </Link>
                                <Link
                                    href="/categories"
                                    className="px-6 py-3 text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Categories
                                </Link>
                                {isAuthor && (
                                    <Link
                                        href="/dashboard"
                                        className="px-6 py-3 text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                )}

                                {isAuthenticated ? (
                                    <>
                                        <Link
                                            href="/profile"
                                            className="px-6 py-3 text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="px-6 py-3 text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-left"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setAuthModalOpen("signin")
                                                setIsMobileMenuOpen(false)
                                            }}
                                            className="px-6 py-3 text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-left"
                                        >
                                            Sign In
                                        </button>
                                        <div className="px-6 py-3">
                                            <Button
                                                onClick={() => {
                                                    setAuthModalOpen("signup")
                                                    setIsMobileMenuOpen(false)
                                                }}
                                                className="w-full h-10 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider"
                                            >
                                                Sign Up
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            {/* Auth Modals */}
            <AuthModal isOpen={authModalOpen === "signin"} onClose={() => setAuthModalOpen(null)}>
                <SignInForm
                    onSuccess={handleAuthSuccess}
                    onSwitchToSignUp={() => setAuthModalOpen("signup")}
                />
            </AuthModal>

            <AuthModal isOpen={authModalOpen === "signup"} onClose={() => setAuthModalOpen(null)}>
                <SignUpForm
                    onSuccess={handleAuthSuccess}
                    onSwitchToSignIn={() => setAuthModalOpen("signin")}
                />
            </AuthModal>

            {/* Search Modal */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    )
}
