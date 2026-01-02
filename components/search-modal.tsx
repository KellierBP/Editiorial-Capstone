"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import Link from "next/link"

interface SearchResult {
    title: string
    excerpt: string
    category: string
    author: string
    slug: string
    image: string
}

interface SearchModalProps {
    isOpen: boolean
    onClose: () => void
}

// Mock search function - will be replaced with API call
const searchArticles = (query: string): SearchResult[] => {
    if (!query || query.length < 2) return []

    const mockArticles: SearchResult[] = [
        {
            title: "Architecture as Poetry: The Work of Tadao Ando",
            excerpt: "Discovering the profound simplicity and spiritual depth in concrete and light.",
            category: "Architecture",
            author: "Sarah Chen",
            slug: "tadao-ando-architecture",
            image: "/tadao-ando-concrete-architecture.jpg",
        },
        {
            title: "The Revival of Analog Photography",
            excerpt: "Why artists are returning to film in the digital age.",
            category: "Photography",
            author: "Marcus Webb",
            slug: "analog-photography-revival",
            image: "/analog-film-photography-camera.jpg",
        },
        {
            title: "Slow Fashion: A Conversation with Sustainability",
            excerpt: "Leading designers discuss conscious consumption and timeless style.",
            category: "Fashion",
            author: "Elena Rodriguez",
            slug: "slow-fashion-sustainability",
            image: "/sustainable-minimalist-fashion.jpg",
        },
    ]

    return mockArticles.filter(
        (article) =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            article.category.toLowerCase().includes(query.toLowerCase()) ||
            article.author.toLowerCase().includes(query.toLowerCase())
    )
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<SearchResult[]>([])

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
            document.body.style.overflow = "hidden"
        }
        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = "unset"
        }
    }, [isOpen, onClose])

    // Search as user types
    useEffect(() => {
        if (query.length >= 2) {
            const searchResults = searchArticles(query)
            setResults(searchResults)
        } else {
            setResults([])
        }
    }, [query])

    // Reset on close
    useEffect(() => {
        if (!isOpen) {
            setQuery("")
            setResults([])
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-foreground/80 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
                {/* Search Input */}
                <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-4">
                        <Search className="w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search articles..."
                            autoFocus
                            className="flex-1 text-lg bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                        />
                        <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className="overflow-y-auto max-h-[calc(80vh-100px)]">
                    {query.length < 2 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            <p className="text-sm">Type at least 2 characters to search</p>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            <p className="text-sm">No results found for "{query}"</p>
                        </div>
                    ) : (
                        <div className="p-4 space-y-2">
                            {results.map((result) => (
                                <Link
                                    key={result.slug}
                                    href={`/article/${result.slug}`}
                                    onClick={onClose}
                                    className="block p-4 rounded-lg hover:bg-muted/50 transition-colors group"
                                >
                                    <div className="flex gap-4">
                                        {/* Image */}
                                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                            <img
                                                src={result.image || "/placeholder.svg"}
                                                alt={result.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            {/* Category */}
                                            <span className="text-xs uppercase tracking-wider text-accent font-medium">
                                                {result.category}
                                            </span>

                                            {/* Title */}
                                            <h3 className="font-serif text-base text-foreground group-hover:text-accent transition-colors mt-1 line-clamp-1">
                                                {result.title}
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{result.excerpt}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {results.length > 0 && (
                    <div className="p-4 border-t border-border bg-muted/30">
                        <p className="text-xs text-center text-muted-foreground">
                            Found {results.length} result{results.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
