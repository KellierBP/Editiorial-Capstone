"use client"

import { NewHeader } from "@/components/new-header"
import { NewFooter } from "@/components/new-footer"
import { ArticleCard } from "@/components/article-card"
import { use } from "react"

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export default function CategoryPage({ params }: PageProps) {
    const { slug } = use(params)
    const decodedSlug = decodeURIComponent(slug)

    // Capitalize category name for display
    const categoryName = decodedSlug.charAt(0).toUpperCase() + decodedSlug.slice(1)

    // Mock category posts (will be replaced with API call)
    const categoryPosts = [
        {
            title: "Architecture as Poetry: The Work of Tadao Ando",
            excerpt: "Discovering the profound simplicity and spiritual depth in concrete and light.",
            author: "Sarah Chen",
            date: "Dec 15, 2024",
            category: categoryName,
            image: "/tadao-ando-concrete-architecture.jpg",
            slug: "tadao-ando-architecture",
        },
        {
            title: "Minimalist Spaces: Form Follows Function",
            excerpt: "Exploring the beauty of simplicity in modern architectural design.",
            author: "Marcus Webb",
            date: "Dec 12, 2024",
            category: categoryName,
            image: "/placeholder.svg",
            slug: "minimalist-spaces",
        },
        {
            title: "Urban Planning for the Future",
            excerpt: "How cities are adapting to climate change and population growth.",
            author: "Elena Rodriguez",
            date: "Dec 10, 2024",
            category: categoryName,
            image: "/placeholder.svg",
            slug: "urban-planning-future",
        },
    ]

    return (
        <div className="min-h-screen bg-background">
            <NewHeader />

            <main className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
                {/* Category Header */}
                <div className="border-b border-border pb-12 mb-12">
                    <h1 className="font-serif text-5xl lg:text-6xl text-foreground mb-4">{categoryName}</h1>
                    <p className="text-lg text-muted-foreground">
                        {categoryPosts.length} {categoryPosts.length === 1 ? "article" : "articles"} in this category
                    </p>
                </div>

                {/* Articles */}
                {categoryPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categoryPosts.map((post) => (
                            <ArticleCard key={post.slug} {...post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 border border-dashed border-border rounded-2xl">
                        <h3 className="font-serif text-2xl text-foreground mb-2">No articles in this category</h3>
                        <p className="text-muted-foreground">Check back soon for new content.</p>
                    </div>
                )}
            </main>

            <NewFooter />
        </div>
    )
}
