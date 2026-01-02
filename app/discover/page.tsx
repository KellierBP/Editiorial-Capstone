"use client"

import { NewHeader } from "@/components/new-header"
import { NewFooter } from "@/components/new-footer"
import { ArticleCard } from "@/components/article-card"
import { FilterModal } from "@/components/filter-modal"
import { Filter } from "lucide-react"
import { useState, useEffect } from "react"
import { postsApi } from "@/lib/api/posts"
import { categoriesApi } from "@/lib/api/categories"

export default function DiscoverPage() {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedAuthor, setSelectedAuthor] = useState("all")
    const [articles, setArticles] = useState<any[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [authors, setAuthors] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)

    // Fetch posts and categories on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                // Fetch categories
                const categoriesData = await categoriesApi.getAllCategories()
                setCategories(categoriesData.map(cat => cat.name))

                // Fetch posts based on filters
                let postsData
                if (selectedCategory !== "all") {
                    const categorySlug = categoriesData.find(cat => cat.name === selectedCategory)?.slug
                    if (categorySlug) {
                        postsData = await postsApi.getPostsByCategory(categorySlug, currentPage)
                    }
                } else if (selectedAuthor !== "all") {
                    postsData = await postsApi.getPostsByAuthor(selectedAuthor, currentPage)
                } else {
                    postsData = await postsApi.getAllPosts(currentPage)
                }

                if (postsData) {
                    setArticles(postsData.results)
                    setTotalCount(postsData.count)

                    // Extract unique authors
                    const uniqueAuthors = Array.from(new Set(postsData.results.map((post: any) => post.author.display_name || post.author.username)))
                    setAuthors(uniqueAuthors)
                }
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [selectedCategory, selectedAuthor, currentPage])

    const articlesPerPage = 18
    const totalPages = Math.ceil(totalCount / articlesPerPage)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Transform API data to match ArticleCard props
    const transformedArticles = articles.map(post => ({
        title: post.title,
        excerpt: post.excerpt,
        author: post.author.display_name || post.author.username,
        date: new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        category: post.category.name,
        image: post.image || "/placeholder.svg",
        slug: post.slug,
    }))

    return (
        <div className="min-h-screen bg-background">
            <NewHeader />

            <main className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="font-serif text-5xl lg:text-6xl text-foreground mb-4">Discover</h1>
                            <p className="text-lg text-muted-foreground">
                                Explore all articles from our community of writers
                            </p>
                        </div>

                        {/* Filter Button */}
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="flex items-center gap-2 h-12 px-6 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider font-medium"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>
                    </div>

                    {/* Active Filters */}
                    {(selectedCategory !== "all" || selectedAuthor !== "all") && (
                        <div className="flex flex-wrap gap-2">
                            {selectedCategory !== "all" && (
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium">
                                    Category: {selectedCategory}
                                    <button
                                        onClick={() => setSelectedCategory("all")}
                                        className="hover:text-accent-foreground transition-colors"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            {selectedAuthor !== "all" && (
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium">
                                    Author: {selectedAuthor}
                                    <button
                                        onClick={() => setSelectedAuthor("all")}
                                        className="hover:text-accent-foreground transition-colors"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="mb-8">
                    <p className="text-sm uppercase tracking-wider text-muted-foreground">
                        {loading ? "Loading..." : `Showing ${articles.length} of ${totalCount} ${totalCount === 1 ? "article" : "articles"}`}
                    </p>
                </div>

                {/* Articles Grid */}
                {loading ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">Loading articles...</p>
                    </div>
                ) : transformedArticles.length > 0 ? (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {transformedArticles.map((article) => (
                                <ArticleCard key={article.slug} {...article} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-16 flex items-center justify-center gap-2">
                                {/* Previous Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="h-10 px-4 rounded-full border-2 border-border text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider font-medium"
                                >
                                    Previous
                                </button>

                                {/* Page Numbers */}
                                <div className="flex gap-2">
                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-10 h-10 rounded-full transition-colors text-sm font-medium ${currentPage === page
                                                ? "bg-foreground text-background"
                                                : "border-2 border-border text-foreground hover:bg-muted"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="h-10 px-4 rounded-full border-2 border-border text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider font-medium"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16 border border-dashed border-border rounded-2xl">
                        <h3 className="font-serif text-2xl text-foreground mb-2">No articles found</h3>
                        <p className="text-muted-foreground mb-6">Try adjusting your filters to see more results.</p>
                        <button
                            onClick={() => {
                                setSelectedCategory("all")
                                setSelectedAuthor("all")
                            }}
                            className="h-10 px-6 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider font-medium"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </main>

            <NewFooter />

            {/* Filter Modal */}
            <FilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                selectedCategory={selectedCategory}
                selectedAuthor={selectedAuthor}
                onCategoryChange={setSelectedCategory}
                onAuthorChange={setSelectedAuthor}
                categories={categories}
                authors={authors}
            />
        </div>
    )
}
