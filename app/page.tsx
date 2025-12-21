import { Navigation } from "@/components/navigation"
import Link from "next/link"

const featuredArticle = {
  title: "The Future of Minimalism in Contemporary Design",
  excerpt: "An exploration of how simplicity continues to shape our visual landscape and redefine modern aesthetics.",
  author: "Elena Morrison",
  date: "January 15, 2025",
  category: "Design",
  image: "/minimalist-modern-interior-design.jpg",
  slug: "future-of-minimalism",
}

const articles = [
  {
    title: "Architecture as Poetry: The Work of Tadao Ando",
    excerpt: "Discovering the profound simplicity and spiritual depth in concrete and light.",
    author: "Marcus Chen",
    date: "January 12, 2025",
    category: "Architecture",
    image: "/tadao-ando-concrete-architecture.jpg",
    slug: "tadao-ando-architecture",
  },
  {
    title: "The Revival of Analog Photography",
    excerpt: "Why artists are returning to film in the digital age and what it means for visual storytelling.",
    author: "Sophie Laurent",
    date: "January 10, 2025",
    category: "Photography",
    image: "/analog-film-photography-camera.jpg",
    slug: "analog-photography-revival",
  },
  {
    title: "Slow Fashion: A Conversation with Sustainability",
    excerpt: "Leading designers discuss the movement toward conscious consumption and timeless style.",
    author: "Isabella Rossi",
    date: "January 8, 2025",
    category: "Fashion",
    image: "/sustainable-minimalist-fashion.jpg",
    slug: "slow-fashion-sustainability",
  },
  {
    title: "The Art of the Pause: Finding Silence in Sound",
    excerpt: "Modern composers explore the power of restraint and the beauty of empty space.",
    author: "Daniel Park",
    date: "January 5, 2025",
    category: "Music",
    image: "/minimalist-music-composer-piano.jpg",
    slug: "art-of-pause-music",
  },
  {
    title: "Ceramic Masters: The Language of Clay",
    excerpt: "Contemporary ceramicists reimagine ancient traditions with a modern sensibility.",
    author: "Yuki Tanaka",
    date: "January 3, 2025",
    category: "Craft",
    image: "/ceramic-pottery-minimal-handmade.jpg",
    slug: "ceramic-masters",
  },
  {
    title: "Nordic Interiors: Light and Space",
    excerpt: "How Scandinavian design principles create warmth through simplicity.",
    author: "Astrid Larsen",
    date: "December 30, 2024",
    category: "Interior",
    image: "/nordic-scandinavian-interior-design.jpg",
    slug: "nordic-interiors",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Featured Article */}
        <article className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
          <Link href={`/article/${featuredArticle.slug}`} className="group block">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-6">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {featuredArticle.category}
                  </div>
                  <h1 className="font-serif text-4xl lg:text-6xl leading-tight text-balance text-foreground group-hover:text-secondary transition-colors">
                    {featuredArticle.title}
                  </h1>
                  <p className="text-lg leading-relaxed text-muted-foreground max-w-xl">{featuredArticle.excerpt}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground pt-4">
                    <span>{featuredArticle.author}</span>
                    <span>·</span>
                    <span>{featuredArticle.date}</span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={featuredArticle.image || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </Link>
        </article>

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="border-t border-border" />
        </div>

        {/* Article Grid */}
        <section className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {articles.map((article) => (
              <Link key={article.slug} href={`/article/${article.slug}`} className="group">
                <article className="space-y-4">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{article.category}</div>
                    <h2 className="font-serif text-2xl leading-tight text-balance text-foreground group-hover:text-secondary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                      <span>{article.author}</span>
                      <span>·</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

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
      </main>
    </div>
  )
}
