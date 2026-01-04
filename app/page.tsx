import { NewHeader } from "@/components/new-header"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"
import { AboutSection } from "@/components/about-section"
import { ArticleGrid } from "@/components/article-grid"
import { PopularArticles } from "@/components/popular-articles"
import { ContactSection } from "@/components/contact-section"
import { NewFooter } from "@/components/new-footer"

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

const featuredArticles = [
  {
    title: "Top 10 Rendering Software for Stunning Visuals",
    excerpt: "Discover the best rendering tools for creating photorealistic images.",
    author: "Elena Morrison",
    date: "February 25, 2025",
    category: "Trading",
    image: "/minimalist-modern-interior-design.jpg",
    slug: "rendering-software",
    readTime: "10 min read",
    sponsored: true,
  },
  {
    title: "Why you should outsource design: overcoming limitations to maximize business success",
    excerpt: "Learn how outsourcing can help your business grow.",
    author: "Marcus Chen",
    date: "February 25, 2025",
    category: "Trading",
    image: "/tadao-ando-concrete-architecture.jpg",
    slug: "outsource-design",
    readTime: "10 min read",
    sponsored: true,
  },
  {
    title: "Budget Travel: Exploring the World Affordably",
    excerpt: "Tips and tricks for traveling on a budget without compromising experience.",
    author: "Sophie Laurent",
    date: "February 25, 2025",
    category: "Trading",
    image: "/analog-film-photography-camera.jpg",
    slug: "budget-travel",
    readTime: "10 min read",
    sponsored: true,
  },
]

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
      <NewHeader />

      <main>
        {/* Hero Section with Featured Articles */}
        <HeroSection featuredArticles={featuredArticles} />

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

        {/* Article Grid */}
        <ArticleGrid articles={articles} />

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="border-t border-border" />
        </div>


        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="border-t border-border" />
        </div>

        {/* Popular Articles */}
        <PopularArticles articles={articles.slice(0, 6)} />

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
