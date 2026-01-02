"use client"

import { NewHeader } from "@/components/new-header"
import { NewFooter } from "@/components/new-footer"
import { ArticleCard } from "@/components/article-card"
import { User } from "lucide-react"
import { use } from "react"

interface PageProps {
    params: Promise<{
        username: string
    }>
}

export default function AuthorPage({ params }: PageProps) {
    const { username } = use(params)
    const decodedUsername = decodeURIComponent(username)

    // Mock author posts (will be replaced with API call)
    const authorPosts = [
        {
            title: "Architecture as Poetry: The Work of Tadao Ando",
            excerpt: "Discovering the profound simplicity and spiritual depth in concrete and light.",
            author: decodedUsername,
            date: "Dec 15, 2024",
            category: "Architecture",
            image: "/tadao-ando-concrete-architecture.jpg",
            slug: "tadao-ando-architecture",
        },
        {
            title: "The Revival of Analog Photography",
            excerpt: "Why artists are returning to film in the digital age.",
            author: decodedUsername,
            date: "Dec 12, 2024",
            category: "Photography",
            image: "/analog-film-photography-camera.jpg",
            slug: "analog-photography-revival",
        },
        {
            title: "Slow Fashion: A Conversation with Sustainability",
            excerpt: "Leading designers discuss conscious consumption and timeless style.",
            author: decodedUsername,
            date: "Dec 10, 2024",
            category: "Fashion",
            image: "/sustainable-minimalist-fashion.jpg",
            slug: "slow-fashion-sustainability",
        },
    ]

    return (
        <div className="min-h-screen bg-background">
            <NewHeader />

            <main className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
                {/* Author Header */}
                <div className="border-b border-border pb-12 mb-12">
                    <div className="flex items-center gap-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <User className="w-12 h-12 text-muted-foreground" />
                        </div>

                        {/* Author Info */}
                        <div>
                            <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-2">{decodedUsername}</h1>
                            <p className="text-muted-foreground">
                                {authorPosts.length} {authorPosts.length === 1 ? "article" : "articles"} published
                            </p>
                        </div>
                    </div>
                </div>

                {/* Articles */}
                {authorPosts.length > 0 ? (
                    <div>
                        <h2 className="font-serif text-3xl text-foreground mb-8">Articles by {decodedUsername}</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {authorPosts.map((post) => (
                                <ArticleCard key={post.slug} {...post} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16 border border-dashed border-border rounded-2xl">
                        <h3 className="font-serif text-2xl text-foreground mb-2">No articles yet</h3>
                        <p className="text-muted-foreground">{decodedUsername} hasn't published any articles.</p>
                    </div>
                )}
            </main>

            <NewFooter />
        </div>
    )
}
