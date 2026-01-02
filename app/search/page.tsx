"use client"

import { NewHeader } from "@/components/new-header"
import { NewFooter } from "@/components/new-footer"
import { ArticleCard } from "@/components/article-card"
import { Search } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"

function SearchContent() {
    const searchParams = useSearchParams()
    const queryParam = searchParams.get("q") || ""
    const [query, setQuery] = useState(queryParam)
    const [results, setResults] = useState<any[]>([])

    // Mock search function (will be replaced with API call)
    const searchArticles = (searchQuery: string) => {
        if (!searchQuery || searchQuery.length < 2) return []

        const mockArticles = [
            {
                title: "Architecture as Poetry: The Work of Tadao Ando",
                excerpt: "Discovering the profound simplicity and spiritual depth in concrete and light.",
                author: "Sarah Chen",
                date: "Dec 15, 2024",
                category: "Architecture",
                image: "/tadao-ando-concrete-architecture.jpg",
                slug: "tadao-ando-architecture",
            },
            {
                title: "The Revival of Analog Photography",
                excerpt: "Why artists are returning to film in the digital age.",
                author: "Marcus Webb",
                date: "Dec 12, 2024",
                category: "Photography",
                image: "/analog-film-photography-camera.jpg",
                slug: "analog-photography-revival",
            },
            {
                title: "Slow Fashion: A Conversation with Sustainability",
                excerpt: "Leading designers discuss conscious consumption and timeless style.",
                author: "Elena Rodriguez",
                date: "Dec 10, 2024",
                category: "Fashion",
                image: "/sustainable-minimalist-fashion.jpg",
                slug: "slow-fashion-sustainability",
            },
        ]

        return mockArticles.filter(
            (article) =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.author.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }

    useEffect(() => {
        if (query.length >= 2) {
            const searchResults = searchArticles(query)
            setResults(searchResults)
        } else {
            setResults([])
        }
    }, [query])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Update URL with search query
        window.history.pushState({}, "", `/search?q=${encodeURIComponent(query)}`)
    }

    return (
        <div className="min-h-screen bg-background">
            <NewHeader />

            <main className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
                {/* Search Header */}
                <div className="mb-16">
                    <h1 className="font-serif text-5xl lg:text-6xl text-foreground mb-8 text-center">Search Articles</h1>

                    {/* Search Input */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                        <div className="flex items-center gap-4 p-6 border-2 border-dotted border-border rounded-2xl bg-muted/30">
                            <Search className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by title, content, category, or author..."
                                className="flex-1 text-lg bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                                autoFocus
                            />
                        </div>
                    </form>
                </div>

                {/* Results */}
                <div>
                    {query.length < 2 ? (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground">Type at least 2 characters to search</p>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="text-center py-16">
                            <h3 className="font-serif text-2xl text-foreground mb-2">No results found</h3>
                            <p className="text-muted-foreground">
                                No articles match your search for "{query}". Try different keywords.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Results Count */}
                            <div className="mb-8">
                                <p className="text-sm uppercase tracking-wider text-muted-foreground">
                                    Found {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
                                </p>
                            </div>

                            {/* Results Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {results.map((article) => (
                                    <ArticleCard key={article.slug} {...article} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>

            <NewFooter />
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground">Loading search...</p>
            </div>
        }>
            <SearchContent />
        </Suspense>
    )
}
