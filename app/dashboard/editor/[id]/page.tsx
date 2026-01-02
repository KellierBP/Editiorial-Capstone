"use client"

import { NewHeader } from "@/components/new-header"
import { NewFooter } from "@/components/new-footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { redirect, useRouter } from "next/navigation"
import { useState, use } from "react"

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export default function EditorPage({ params }: PageProps) {
    const { id } = use(params)
    const { user, isAuthenticated, isAuthor } = useAuth()
    const router = useRouter()
    const isNewPost = id === "new"

    // Redirect if not authenticated or not an author
    if (!isAuthenticated || !isAuthor) {
        redirect("/")
    }

    // Mock categories (will be replaced with API call)
    const categories = [
        "Architecture",
        "Art",
        "Design",
        "Fashion",
        "Food",
        "Photography",
        "Technology",
        "Travel",
        "Culture",
        "Lifestyle",
        "Music",
        "Science",
    ]

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        content: "",
        status: "draft" as "draft" | "published",
    })

    const [isSaving, setIsSaving] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSave = async (status: "draft" | "published") => {
        setIsSaving(true)

        // API call to save/update post
        console.log("Saving post:", { ...formData, status })

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setIsSaving(false)

        // Redirect to dashboard
        router.push("/dashboard")
    }

    return (
        <div className="min-h-screen bg-background">
            <NewHeader />

            <main className="mx-auto max-w-5xl px-6 lg:px-12 py-16 lg:py-24">
                {/* Header */}
                <div className="flex items-center justify-between mb-12 pb-8 border-b border-border">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <button className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border text-foreground hover:bg-muted transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="font-serif text-3xl text-foreground">
                                {isNewPost ? "New Article" : "Edit Article"}
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                {formData.status === "draft" ? "Draft" : "Published"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => handleSave("draft")}
                            disabled={isSaving || !formData.title || !formData.content}
                            className="h-10 px-6 rounded-full border-2 border-border text-foreground hover:bg-muted transition-colors text-sm uppercase tracking-wider font-medium bg-transparent"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isSaving ? "Saving..." : "Save Draft"}
                        </Button>
                        <Button
                            onClick={() => handleSave("published")}
                            disabled={isSaving || !formData.title || !formData.content || !formData.category}
                            className="h-10 px-6 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider font-medium"
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            {isSaving ? "Publishing..." : "Publish"}
                        </Button>
                    </div>
                </div>

                {/* Editor Form */}
                <div className="space-y-8">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm uppercase tracking-wider text-foreground font-medium mb-3">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter article title..."
                            className="w-full px-6 py-4 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors font-serif text-2xl"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm uppercase tracking-wider text-foreground font-medium mb-3">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-6 py-4 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-accent transition-colors"
                        >
                            <option value="">Select a category...</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Content */}
                    <div>
                        <label htmlFor="content" className="block text-sm uppercase tracking-wider text-foreground font-medium mb-3">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Write your article content here...

You can use markdown formatting:
- Use ## for headings
- Use > for blockquotes
- Write naturally and the content will be formatted beautifully"
                            rows={20}
                            className="w-full px-6 py-4 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors font-serif text-lg leading-relaxed resize-none"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                            Tip: Use ## for headings and {"> "}for quotes. Your content will be beautifully formatted.
                        </p>
                    </div>

                    {/* Character Count */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{formData.content.length} characters</span>
                        <span>~{Math.ceil(formData.content.split(" ").length / 200)} min read</span>
                    </div>
                </div>

                {/* Preview Section */}
                {formData.content && (
                    <div className="mt-16 pt-16 border-t border-border">
                        <h2 className="font-serif text-2xl text-foreground mb-8">Preview</h2>
                        <div className="prose prose-lg max-w-none">
                            {formData.title && (
                                <h1 className="font-serif text-4xl text-foreground mb-6">{formData.title}</h1>
                            )}
                            {formData.content.split("\n\n").map((paragraph, index) => {
                                // Handle headings
                                if (paragraph.startsWith("## ")) {
                                    return (
                                        <h2 key={index} className="font-serif text-3xl text-foreground mt-12 mb-6">
                                            {paragraph.replace("## ", "")}
                                        </h2>
                                    )
                                }
                                // Handle blockquotes
                                if (paragraph.startsWith("> ")) {
                                    return (
                                        <blockquote
                                            key={index}
                                            className="border-l-2 border-foreground pl-6 my-8 italic font-serif text-xl text-foreground"
                                        >
                                            {paragraph.replace("> ", "")}
                                        </blockquote>
                                    )
                                }
                                // Regular paragraphs
                                return (
                                    <p key={index} className="font-serif text-lg leading-relaxed text-foreground mb-6">
                                        {paragraph}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                )}
            </main>

            <NewFooter />
        </div>
    )
}
