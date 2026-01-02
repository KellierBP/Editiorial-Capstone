"use client"

import { NewHeader } from "@/components/new-header"
import { NewFooter } from "@/components/new-footer"
import Link from "next/link"
import { useState, useEffect } from "react"
import { categoriesApi } from "@/lib/api/categories"

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // Category images mapping
    const categoryImages: Record<string, string> = {
        architecture: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
        art: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80",
        design: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
        fashion: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        photography: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
        technology: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        travel: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
        culture: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
        lifestyle: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
        music: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
        science: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoriesApi.getAllCategories()
                setCategories(data)
            } catch (error) {
                console.error("Error fetching categories:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <NewHeader />

            <main className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="font-serif text-5xl lg:text-6xl text-foreground mb-4">Browse Categories</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore our curated collection of topics and discover stories that inspire.
                    </p>
                </div>

                {/* Categories Grid */}
                {loading ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">Loading categories...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/category/${category.slug}`}
                                className="group relative aspect-square overflow-hidden rounded-2xl bg-muted"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                                    <img
                                        src={categoryImages[category.slug] || "/placeholder.svg"}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-700 scale-110 group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                                    <h3 className="font-serif text-2xl text-foreground group-hover:text-background transition-colors duration-300">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground group-hover:text-background/80 transition-colors duration-300 mt-2">
                                        {category.posts_count} {category.posts_count === 1 ? "article" : "articles"}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <NewFooter />
        </div>
    )
}
