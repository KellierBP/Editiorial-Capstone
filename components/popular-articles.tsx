import Link from "next/link"
import { ArticleCard } from "./article-card"
import { Button } from "@/components/ui/button"

interface Article {
    title: string
    excerpt: string
    author: string
    date: string
    category: string
    image: string
    slug: string
}

interface PopularArticlesProps {
    articles: Article[]
}

export function PopularArticles({ articles }: PopularArticlesProps) {
    return (
        <section className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24 border-t border-border">
            {/* Section Title */}
            <div className="mb-12">
                <h2 className="font-serif text-4xl lg:text-5xl text-foreground">Popular Articles</h2>
            </div>

            {/* Article Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {articles.map((article) => (
                    <ArticleCard key={article.slug} {...article} />
                ))}
            </div>

            {/* View All Button */}
            <div className="mt-16 text-center">
                <Link href="/articles">
                    <Button className="h-12 px-8 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider">
                        View All Articles
                    </Button>
                </Link>
            </div>
        </section>
    )
}
