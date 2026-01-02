"use client"

import { X, Filter } from "lucide-react"
import { useEffect } from "react"

interface FilterModalProps {
    isOpen: boolean
    onClose: () => void
    selectedCategory: string
    selectedAuthor: string
    onCategoryChange: (category: string) => void
    onAuthorChange: (author: string) => void
    categories: string[]
    authors: string[]
}

export function FilterModal({
    isOpen,
    onClose,
    selectedCategory,
    selectedAuthor,
    onCategoryChange,
    onAuthorChange,
    categories,
    authors,
}: FilterModalProps) {
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

    const handleClearFilters = () => {
        onCategoryChange("all")
        onAuthorChange("all")
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-foreground/80 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Filter className="w-5 h-5 text-foreground" />
                            <h2 className="font-serif text-2xl text-foreground">Filter Articles</h2>
                        </div>
                        <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Category Filter */}
                    <div>
                        <label className="block text-sm uppercase tracking-wider text-foreground font-medium mb-3">
                            Category
                        </label>
                        <div className="space-y-2">
                            <button
                                onClick={() => onCategoryChange("all")}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedCategory === "all"
                                        ? "bg-accent/20 text-accent font-medium"
                                        : "bg-muted/50 text-foreground hover:bg-muted"
                                    }`}
                            >
                                All Categories
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => onCategoryChange(category)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedCategory === category
                                            ? "bg-accent/20 text-accent font-medium"
                                            : "bg-muted/50 text-foreground hover:bg-muted"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Author Filter */}
                    <div>
                        <label className="block text-sm uppercase tracking-wider text-foreground font-medium mb-3">
                            Author
                        </label>
                        <div className="space-y-2">
                            <button
                                onClick={() => onAuthorChange("all")}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedAuthor === "all"
                                        ? "bg-accent/20 text-accent font-medium"
                                        : "bg-muted/50 text-foreground hover:bg-muted"
                                    }`}
                            >
                                All Authors
                            </button>
                            {authors.map((author) => (
                                <button
                                    key={author}
                                    onClick={() => onAuthorChange(author)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedAuthor === author
                                            ? "bg-accent/20 text-accent font-medium"
                                            : "bg-muted/50 text-foreground hover:bg-muted"
                                        }`}
                                >
                                    {author}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border flex gap-3">
                    <button
                        onClick={handleClearFilters}
                        className="flex-1 h-12 rounded-full border-2 border-border text-foreground hover:bg-muted transition-colors text-sm uppercase tracking-wider font-medium"
                    >
                        Clear Filters
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 h-12 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider font-medium"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}
