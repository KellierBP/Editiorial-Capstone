"use client"

import { NewHeader } from "@/components/new-header"
import { NewFooter } from "@/components/new-footer"
import { useAuth } from "@/contexts/AuthContext"
import { ArticleCard } from "@/components/article-card"
import { Button } from "@/components/ui/button"
import { User, Mail, Calendar, Edit } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"
import { postsApi } from "@/lib/api/posts"

export default function ProfilePage() {
    const { user, isAuthenticated, isAuthor } = useAuth()
    const [userPosts, setUserPosts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // Redirect if not authenticated
    if (!isAuthenticated) {
        redirect("/")
    }

    // Fetch user's published posts
    useEffect(() => {
        const fetchPosts = async () => {
            if (!isAuthor) {
                setLoading(false)
                return
            }

            try {
                const response = await postsApi.getMyPosts()
                // Only show published posts on profile page
                const published = response.results.filter((post: any) => post.status === "published")
                setUserPosts(published)
            } catch (error) {
                console.error("Error fetching posts:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [isAuthor])

    // Transform posts for ArticleCard
    const transformedPosts = userPosts.map(post => ({
        title: post.title,
        excerpt: post.excerpt,
        author: post.author.display_name || post.author.username,
        date: new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        category: post.category.name,
        image: post.image || "/placeholder.svg",
        slug: post.slug,
    }))

    // Format member since date
    const memberSince = user?.created_at
        ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : "December 2024"

    return (
        <div className="min-h-screen bg-background">
            <NewHeader />

            <main className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
                {/* Profile Header */}
                <div className="border-b border-border pb-12 mb-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Avatar */}
                        <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <User className="w-16 h-16 text-muted-foreground" />
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-4">{user?.username}</h1>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm">{user?.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">Member since {memberSince}</span>
                                </div>
                            </div>

                            {/* Account Type Badge */}
                            <div className="inline-block">
                                <span
                                    className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full font-medium ${isAuthor
                                        ? "bg-accent/10 text-accent"
                                        : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {isAuthor ? "Author Account" : "Reader Account"}
                                </span>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <Button className="h-10 px-6 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>
                </div>

                {/* My Posts Section (Authors Only) */}
                {isAuthor && (
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-serif text-3xl text-foreground">My Articles</h2>
                            <Link href="/dashboard">
                                <Button className="h-10 px-6 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider">
                                    Go to Dashboard
                                </Button>
                            </Link>
                        </div>

                        {loading ? (
                            <div className="text-center py-16">
                                <p className="text-muted-foreground">Loading articles...</p>
                            </div>
                        ) : transformedPosts.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {transformedPosts.map((post) => (
                                    <ArticleCard key={post.slug} {...post} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 border border-dashed border-border rounded-2xl">
                                <p className="text-muted-foreground mb-4">You haven't published any articles yet.</p>
                                <Link href="/dashboard">
                                    <Button className="h-10 px-6 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider">
                                        Create Your First Article
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Reader Message */}
                {!isAuthor && (
                    <div className="text-center py-16 border border-dashed border-border rounded-2xl">
                        <h3 className="font-serif text-2xl text-foreground mb-4">Want to become an author?</h3>
                        <p className="text-muted-foreground mb-6">
                            Upgrade your account to start publishing your own articles.
                        </p>
                        <Button className="h-10 px-6 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider">
                            Upgrade to Author
                        </Button>
                    </div>
                )}
            </main>

            <NewFooter />
        </div>
    )
}
