import { NewHeader } from "@/components/new-header"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"

import { ArticleGrid } from "@/components/article-grid"
import { PopularArticles } from "@/components/popular-articles"
import { ContactSection } from "@/components/contact-section"
import { NewFooter } from "@/components/new-footer"
import { postsApi } from "@/lib/api/posts"

const categories = [
  { name: "Business", slug: "business", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop" },
  { name: "Technology", slug: "technology", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop" },
  { name: "Automotive", slug: "automotive", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop" },
  { name: "Science", slug: "science", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=400&fit=crop" },
  { name: "Work Life", slug: "work-life", image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=400&fit=crop" },
  { name: "Social Issues", slug: "social-issues", image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&h=400&fit=crop" },
  { name: "Travel & Culture", slug: "travel-culture", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop" },
  { name: "Entertainment", slug: "entertainment", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop" },
  { name: "Gaming", slug: "gaming", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop" },
  { name: "Lifestyle", slug: "lifestyle", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop" },
  { name: "Hobbies", slug: "hobbies", image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=400&fit=crop" },
  { name: "Others", slug: "others", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop" },
]

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export default async function HomePage() {
  let allPosts: any[] = []

  try {
    // Fetch posts - trying to get enough for all sections
    const response = await postsApi.getAllPosts(1)
    allPosts = response.results || []

    // If needed, fetch page 2
    if (allPosts.length < 15 && response.next) {
      try {
        const response2 = await postsApi.getAllPosts(2)
        allPosts = [...allPosts, ...(response2.results || [])]
      } catch (e) {
        console.error("Failed to fetch page 2", e)
      }
    }
  } catch (error) {
    console.error("Failed to fetch posts:", error)
  }

  // Transform posts to common format
  const transformedArticles = allPosts.map(post => ({
    title: post.title,
    excerpt: post.excerpt,
    author: post.author.display_name || post.author.username,
    date: new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    category: post.category.name,
    image: post.image || "/placeholder.svg",
    slug: post.slug,
    readTime: "5 min read", // Placeholder
    sponsored: false,
  }))

  // 1. Latest Articles (First 6)
  const latestArticles = transformedArticles.slice(0, 6)

  // 2. Popular Articles (Next 6, or random fallback)
  const popularArticles = transformedArticles.length > 6
    ? transformedArticles.slice(6, 12)
    : transformedArticles.slice(0, 6)

  // 3. Hero Articles (3 Random)
  const heroArticles = shuffleArray(transformedArticles).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <NewHeader />

      <main>
        {/* Hero Section with Random Featured Articles */}
        <HeroSection featuredArticles={heroArticles} />

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="border-t border-border" />
        </div>

        {/* Category Section */}
        <CategorySection categories={categories} />

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="border-t border-border" />
        </div>

        {/* Article Grid - Latest Articles */}
        <ArticleGrid articles={latestArticles} />

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="border-t border-border" />
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="border-t border-border" />
        </div>

        {/* Popular Articles */}
        <PopularArticles articles={popularArticles} />

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="border-t border-border" />
        </div>

        {/* Contact Section */}
        <ContactSection />
      </main>

      <NewFooter />
    </div>
  )
}
