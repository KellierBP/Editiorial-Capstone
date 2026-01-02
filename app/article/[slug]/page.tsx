"use client"

import { NewHeader } from "@/components/new-header"
import { NewFooter } from "@/components/new-footer"
import { ArticleCard } from "@/components/article-card"
import { Facebook, Twitter, Linkedin, Link as LinkIcon, Mail } from "lucide-react"
import Link from "next/link"
import { use, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ArticlePage({ params }: PageProps) {
  const { slug } = use(params)
  const { user, isAuthenticated } = useAuth()
  const [newComment, setNewComment] = useState("")
  const [mockComments, setMockComments] = useState([
    {
      id: "1",
      author: "Marcus Webb",
      content: "Fascinating perspective on minimalism. The connection between restraint and impact really resonates with my own work in photography.",
      date: "2 days ago",
    },
    {
      id: "2",
      author: "Elena Rodriguez",
      content: "This article beautifully captures the essence of what makes minimalist design timeless. Thank you for sharing!",
      date: "1 day ago",
    },
  ])

  // Mock article data (will be replaced with API call)
  const article = {
    title: "Architecture as Poetry: The Work of Tadao Ando",
    slug: "tadao-ando-architecture",
    content: `In an era of constant stimulation and digital noise, the principles of minimalism have never been more relevant. This exploration examines how contemporary designers are reinterpreting restraint, simplicity, and purpose to create spaces and objects that resonate with clarity and intention.

## The Evolution of Less

Minimalism emerged not as a rejection of beauty, but as a refinement of it. From the Bauhaus movement to the Japanese concept of "Ma" — the appreciation of negative space — designers have long understood that what we remove is as important as what we include. Today's practitioners build upon this foundation, creating work that speaks through absence rather than abundance.

The contemporary interpretation extends beyond mere aesthetic choice. It represents a philosophical stance on consumption, attention, and the role of design in daily life. Every line, every surface, every carefully considered detail serves a purpose or creates meaning through its relationship to space.

## Material Honesty

Modern minimalism celebrates materials in their truest form. Concrete reveals its texture, wood shows its grain, metal accepts its patina. This honest approach creates intimacy between object and observer, inviting touch and contemplation. The surface becomes a record of time, use, and care — qualities that connect us to the physical world.

Leading architects like Tadao Ando demonstrate how limited materials — primarily concrete and light — can create profound spatial experiences. His work proves that restriction breeds creativity, and that mastery comes not from variety but from depth of understanding.

> "Simplicity is not the goal. It is the by-product of a good idea and modest expectations." — Paul Rand

## The Power of Restraint

In graphic design, typography, and digital interfaces, minimalism manifests as careful hierarchy and generous white space. Each element receives room to breathe, allowing the viewer's eye to move naturally through the composition. This restraint doesn't diminish impact — it amplifies it.

The digital realm particularly benefits from this approach. As screens dominate our attention, designers who understand restraint create experiences that feel calm rather than chaotic, focused rather than overwhelming. They recognize that the most sophisticated interface is often invisible.`,
    excerpt: "Discovering the profound simplicity and spiritual depth in concrete and light.",
    author: "Sarah Chen",
    authorBio: "Sarah is an architecture writer and critic based in Tokyo. Her work focuses on the intersection of traditional Japanese aesthetics and contemporary design.",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    category: "Architecture",
    image: "/tadao-ando-concrete-architecture.jpg",
  }

  // Related articles
  const relatedArticles = [
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
    {
      title: "Minimalist Spaces: Form Follows Function",
      excerpt: "Exploring the beauty of simplicity in modern architectural design.",
      author: "Sarah Chen",
      date: "Dec 8, 2024",
      category: "Architecture",
      image: "/placeholder.svg",
      slug: "minimalist-spaces",
    },
  ]

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = article.title

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: Date.now().toString(),
      author: user?.username || "Anonymous",
      content: newComment,
      date: "Just now",
    }

    setMockComments([comment, ...mockComments])
    setNewComment("")
  }

  const handleDeleteComment = (commentId: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      setMockComments(mockComments.filter((c) => c.id !== commentId))
    }
  }

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`,
    }

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl)
      alert("Link copied to clipboard!")
    } else {
      window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <NewHeader />

      <main>
        {/* Hero Image */}
        <div className="w-full h-[60vh] lg:h-[70vh] relative overflow-hidden bg-muted">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        {/* Article Content */}
        <article className="mx-auto max-w-3xl px-6 -mt-32 relative z-10">
          {/* Header */}
          <header className="bg-background rounded-2xl p-8 lg:p-12 shadow-2xl mb-16">
            <div className="inline-block mb-4">
              <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
                {article.category}
              </span>
            </div>
            <h1 className="font-serif text-4xl lg:text-6xl leading-tight text-balance text-foreground mb-6">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{article.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
              <Link
                href={`/author/${encodeURIComponent(article.author)}`}
                className="text-foreground font-medium hover:text-accent transition-colors"
              >
                {article.author}
              </Link>
              <span>·</span>
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none mb-16">
            {article.content.split("\n\n").map((paragraph, index) => {
              // Handle headings
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="font-serif text-3xl text-foreground mt-16 mb-6">
                    {paragraph.replace("## ", "")}
                  </h2>
                )
              }
              // Handle blockquotes
              if (paragraph.startsWith("> ")) {
                const quote = paragraph.replace("> ", "").split(" — ")
                return (
                  <blockquote
                    key={index}
                    className="border-l-2 border-foreground pl-6 my-12 italic font-serif text-xl text-foreground"
                  >
                    {quote[0]}
                    {quote[1] && (
                      <footer className="text-base not-italic text-muted-foreground mt-4">— {quote[1]}</footer>
                    )}
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

          {/* Social Share */}
          <div className="border-t border-b border-border py-8 mb-16">
            <h3 className="text-sm uppercase tracking-wider text-foreground font-medium mb-4">Share this article</h3>
            <div className="flex gap-3">
              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-border text-foreground hover:bg-muted transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-border text-foreground hover:bg-muted transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-border text-foreground hover:bg-muted transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare("email")}
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-border text-foreground hover:bg-muted transition-colors"
                aria-label="Share via Email"
              >
                <Mail className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-border text-foreground hover:bg-muted transition-colors"
                aria-label="Copy link"
              >
                <LinkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Author Bio */}
          <div className="border-t border-border pt-12 mb-16">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-muted flex-shrink-0" />
              <div className="space-y-2">
                <Link
                  href={`/author/${encodeURIComponent(article.author)}`}
                  className="font-serif text-xl text-foreground hover:text-accent transition-colors inline-block"
                >
                  {article.author}
                </Link>
                <p className="text-sm leading-relaxed text-muted-foreground">{article.authorBio}</p>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-border pt-12 mb-16">
            <h3 className="font-serif text-2xl text-foreground mb-8">
              Comments ({mockComments.length})
            </h3>

            {/* Add Comment Form */}
            {isAuthenticated ? (
              <div className="mb-12 p-6 rounded-lg border-2 border-border bg-muted/30">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none mb-3"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="h-10 px-6 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-12 p-6 rounded-lg border-2 border-dashed border-border text-center">
                <p className="text-muted-foreground mb-4">Sign in to leave a comment</p>
                <button
                  onClick={() => {
                    // This would trigger the sign in modal
                    console.log("Open sign in modal")
                  }}
                  className="h-10 px-6 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider font-medium"
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {mockComments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/author/${encodeURIComponent(comment.author)}`}
                          className="font-medium text-foreground hover:text-accent transition-colors"
                        >
                          {comment.author}
                        </Link>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                      </div>
                      {isAuthenticated && user?.username === comment.author && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-xs text-muted-foreground hover:text-red-500 transition-colors uppercase tracking-wider"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">{comment.content}</p>
                  </div>
                </div>
              ))}

              {mockComments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
            <h2 className="font-serif text-3xl text-foreground mb-12">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.slug} {...relatedArticle} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  )
}
