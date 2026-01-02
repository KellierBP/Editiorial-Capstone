"use client"

import { NewHeader } from "@/components/new-header"
import { NewFooter } from "@/components/new-footer"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, Plus } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"
import { postsApi } from "@/lib/api/posts"

export default function DashboardPage() {
  const { user, isAuthenticated, isAuthor } = useAuth()
  const [activeTab, setActiveTab] = useState<"published" | "drafts">("published")
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Redirect if not authenticated or not an author
  if (!isAuthenticated || !isAuthor) {
    redirect("/")
  }

  // Fetch user's posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await postsApi.getMyPosts()

        // Filter by status based on active tab
        const filtered = response.results.filter((post: any) =>
          activeTab === "published" ? post.status === "published" : post.status === "draft"
        )
        setArticles(filtered)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [activeTab])

  const handleDelete = async (slug: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await postsApi.deletePost(slug)
        // Refresh the list
        setArticles(articles.filter(article => article.slug !== slug))
      } catch (error) {
        console.error("Error deleting post:", error)
        alert("Failed to delete post")
      }
    }
  }

  const draftCount = articles.filter(a => a.status === "draft").length
  const publishedCount = articles.filter(a => a.status === "published").length

  return (
    <div className="min-h-screen bg-background">
      <NewHeader />

      <main className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-serif text-5xl lg:text-6xl text-foreground mb-2">Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Welcome back, {user?.username}
            </p>
          </div>

          <Link href="/dashboard/editor/new">
            <Button className="h-12 px-6 rounded-full bg-foreground text-background hover:bg-accent transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-2xl border border-border">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Total Articles</p>
            <p className="font-serif text-4xl text-foreground">{articles.length}</p>
          </div>
          <div className="p-6 rounded-2xl border border-border">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Published</p>
            <p className="font-serif text-4xl text-foreground">{publishedCount}</p>
          </div>
          <div className="p-6 rounded-2xl border border-border">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Drafts</p>
            <p className="font-serif text-4xl text-foreground">{draftCount}</p>
          </div>
          <div className="p-6 rounded-2xl border border-border">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Total Views</p>
            <p className="font-serif text-4xl text-foreground">-</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("published")}
            className={`pb-4 px-2 text-sm uppercase tracking-wider font-medium transition-colors relative ${activeTab === "published"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Published ({publishedCount})
            {activeTab === "published" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("drafts")}
            className={`pb-4 px-2 text-sm uppercase tracking-wider font-medium transition-colors relative ${activeTab === "drafts"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Drafts ({draftCount})
            {activeTab === "drafts" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
            )}
          </button>
        </div>

        {/* Articles List */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading articles...</p>
          </div>
        ) : articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article.slug}
                className="p-6 rounded-2xl border border-border hover:border-accent transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs uppercase tracking-wider text-accent font-medium">
                        {article.category.name}
                      </span>
                      {activeTab === "drafts" && (
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">
                          Last edited {new Date(article.updated_at).toLocaleDateString()}
                        </span>
                      )}
                      {activeTab === "published" && (
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">
                          Published {new Date(article.created_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mb-2 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-6">
                    <Link href={`/article/${article.slug}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full hover:bg-muted"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/editor/${article.slug}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full hover:bg-muted"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleDelete(article.slug, article.title)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl">
            <h3 className="font-serif text-2xl text-foreground mb-2">
              No {activeTab} articles yet
            </h3>
            <p className="text-muted-foreground mb-6">
              {activeTab === "published"
                ? "Publish your first article to see it here."
                : "Start writing your first draft."}
            </p>
            <Link href="/dashboard/editor/new">
              <Button className="h-10 px-6 rounded-full bg-foreground text-background hover:bg-accent transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Button>
            </Link>
          </div>
        )}
      </main>

      <NewFooter />
    </div>
  )
}
