"use client"

import { NewHeader } from "@/components/new-header"
import { NewFooter } from "@/components/new-footer"
import { ArticleCard } from "@/components/article-card"
import { Facebook, Twitter, Linkedin, Link as LinkIcon, Mail } from "lucide-react"
import Link from "next/link"
import { use, useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { postsApi } from "@/lib/api/posts"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ArticlePage({ params }: PageProps) {
  const { slug } = use(params)
  const { user, isAuthenticated } = useAuth()
  const [article, setArticle] = useState<any>(null)
  const [relatedArticles, setRelatedArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<any[]>([]) // In a real app, fetch comments separately or nested

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        const data = await postsApi.getPostBySlug(slug)
        setArticle({
          ...data,
          // Ensure image has a fallback
          image: data.image || "/placeholder.svg",
          // Format date
          date: new Date(data.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          // Map author if needed (API returns object)
          authorName: typeof data.author === 'object' ? (data.author.username) : data.author,
          categoryName: typeof data.category === 'object' ? (data.category.name) : data.category,
        })

        // Fetch related articles (mock logic: fetch all and filter, or add specific endpoint)
        // For now, we'll just fetch recent posts as "related"
        const recentPosts = await postsApi.getAllPosts(1)
        setRelatedArticles(recentPosts.results
          .filter(p => p.slug !== slug)
          .slice(0, 3)
          .map(p => ({
            title: p.title,
            excerpt: p.excerpt,
            author: typeof p.author === 'object' ? p.author.username : p.author,
            date: new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            category: typeof p.category === 'object' ? p.category.name : p.category,
            image: p.image || "/placeholder.svg",
            slug: p.slug,
          }))
        )

      } catch (err) {
        console.error("Failed to fetch article:", err)
        setError("Article not found")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchArticle()
    }
  }, [slug])


  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = article?.title || ""

  const handleAddComment = () => {
    // Implement comment API call here
    alert("Comment feature coming soon!")
    setNewComment("")
  }

  const handleDeleteComment = (commentId: string) => {
    // Implement delete API call here
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
      // @ts-ignore
      window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <NewHeader />
        <p className="text-xl text-muted-foreground">Loading article...</p>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <NewHeader />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-serif mb-4">Article Not Found</h1>
          <Link href="/discover" className="text-accent hover:underline">Return to Discover</Link>
        </div>
        <NewFooter />
      </div>
    )
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
                {article.categoryName}
              </span>
            </div>
            <h1 className="font-serif text-4xl lg:text-6xl leading-tight text-balance text-foreground mb-6">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{article.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
              <Link
                href={`/author/${encodeURIComponent(article.authorName)}`}
                className="text-foreground font-medium hover:text-accent transition-colors"
              >
                {article.authorName}
              </Link>
              <span>·</span>
              <span>{article.date}</span>
              {/* <span>·</span>
              <span>{article.readTime || "5 min read"}</span> */}
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none mb-16">
            {article.content.split("\n\n").map((paragraph: string, index: number) => {
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

          {/* Author Bio (Placeholder for now as API might not return bio) */}
          <div className="border-t border-border pt-12 mb-16">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-muted flex-shrink-0" />
              <div className="space-y-2">
                <Link
                  href={`/author/${encodeURIComponent(article.authorName)}`}
                  className="font-serif text-xl text-foreground hover:text-accent transition-colors inline-block"
                >
                  {article.authorName}
                </Link>
                <p className="text-sm leading-relaxed text-muted-foreground">Author at Editorial</p>
              </div>
            </div>
          </div>

          {/* Comments Section (Placeholder) */}
          <div className="border-t border-border pt-12 mb-16">
            <h3 className="font-serif text-2xl text-foreground mb-8">
              Comments (0)
            </h3>
            <div className="text-center py-8 text-muted-foreground">
              <p>Comments are disabled for this preview.</p>
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
