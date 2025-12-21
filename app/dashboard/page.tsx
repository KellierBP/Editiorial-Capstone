import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const draftArticles = [
  {
    title: "The Language of Minimalist Architecture",
    category: "Architecture",
    lastEdited: "2 hours ago",
    status: "Draft",
  },
  {
    title: "Exploring Light in Contemporary Photography",
    category: "Photography",
    lastEdited: "1 day ago",
    status: "Draft",
  },
  {
    title: "Sustainable Materials in Modern Design",
    category: "Design",
    lastEdited: "3 days ago",
    status: "Draft",
  },
]

const publishedArticles = [
  {
    title: "The Future of Minimalism in Contemporary Design",
    category: "Design",
    publishedDate: "January 15, 2025",
    views: "2,431",
    status: "Published",
  },
  {
    title: "Form Follows Function: A Modern Perspective",
    category: "Architecture",
    publishedDate: "January 10, 2025",
    views: "1,892",
    status: "Published",
  },
  {
    title: "The Beauty of Restraint in Visual Design",
    category: "Design",
    publishedDate: "January 5, 2025",
    views: "3,124",
    status: "Published",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 pb-8 border-b border-border">
          <div>
            <h1 className="font-serif text-5xl text-foreground mb-4">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your articles and editorial content</p>
          </div>
          <Button className="h-11 px-8 bg-foreground text-background hover:bg-secondary transition-colors text-sm uppercase tracking-wider">
            New Article
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Total Views</div>
            <div className="font-serif text-4xl text-foreground">12,847</div>
          </div>
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Published</div>
            <div className="font-serif text-4xl text-foreground">24</div>
          </div>
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Drafts</div>
            <div className="font-serif text-4xl text-foreground">8</div>
          </div>
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Followers</div>
            <div className="font-serif text-4xl text-foreground">1,243</div>
          </div>
        </div>

        {/* Drafts Section */}
        <section className="mb-16">
          <h2 className="font-serif text-3xl text-foreground mb-8">Drafts</h2>
          <div className="space-y-px border-t border-border">
            {draftArticles.map((article, i) => (
              <Link
                key={i}
                href="#"
                className="flex items-center justify-between py-6 border-b border-border hover:bg-muted/30 transition-colors px-4 -mx-4"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{article.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-xs text-muted-foreground">{article.lastEdited}</span>
                  </div>
                  <h3 className="font-serif text-xl text-foreground">{article.title}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-widest text-accent">{article.status}</span>
                  <svg
                    className="w-5 h-5 text-muted-foreground"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Published Section */}
        <section>
          <h2 className="font-serif text-3xl text-foreground mb-8">Published Articles</h2>
          <div className="space-y-px border-t border-border">
            {publishedArticles.map((article, i) => (
              <Link
                key={i}
                href="#"
                className="flex items-center justify-between py-6 border-b border-border hover:bg-muted/30 transition-colors px-4 -mx-4"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{article.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                    <span className="text-xs text-muted-foreground">{article.publishedDate}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                    <span className="text-xs text-muted-foreground">{article.views} views</span>
                  </div>
                  <h3 className="font-serif text-xl text-foreground">{article.title}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{article.status}</span>
                  <svg
                    className="w-5 h-5 text-muted-foreground"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-serif text-xl tracking-tight text-foreground">Editorial</div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <span>© 2025 Editorial Magazine</span>
              <span>·</span>
              <Link href="#" className="hover:text-foreground transition-colors">
                About
              </Link>
              <span>·</span>
              <Link href="#" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
