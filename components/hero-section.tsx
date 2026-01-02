import Link from "next/link"

interface FeaturedArticle {
    title: string
    excerpt: string
    author: string
    date: string
    category: string
    image: string
    slug: string
    readTime?: string
    sponsored?: boolean
}

interface HeroSectionProps {
    featuredArticles: FeaturedArticle[]
}

export function HeroSection({ featuredArticles }: HeroSectionProps) {
    // Ensure we have exactly 3 articles for the layout
    const [leftArticle, centerArticle, rightArticle] = featuredArticles.slice(0, 3)

    return (
        <section className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
            {/* Centered Headline */}
            <div className="text-center mb-16">
                <h1 className="font-serif text-5xl lg:text-7xl text-foreground leading-tight">
                    Explore world
                    <br />
                    latest news
                </h1>
            </div>

            {/* Three Column Layout: 25% / 50% / 25% */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Article - 25% */}
                {leftArticle && (
                    <div className="lg:col-span-3">
                        <Link href={`/article/${leftArticle.slug}`} className="group block h-full">
                            <article className="h-full flex flex-col">
                                {/* Image */}
                                <div className="relative overflow-hidden rounded-2xl bg-muted" style={{ height: "400px" }}>
                                    <img
                                        src={leftArticle.image || "/placeholder.svg"}
                                        alt={leftArticle.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Category Tag */}
                                    <div className="absolute top-4 left-4">
                                        <span className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-md bg-background/90 backdrop-blur-sm text-foreground font-medium">
                                            {leftArticle.category}
                                        </span>
                                    </div>
                                    {/* Sponsored Badge */}
                                    {leftArticle.sponsored && (
                                        <div className="absolute bottom-4 left-4">
                                            <span className="text-xs px-3 py-1.5 rounded-md bg-foreground/90 backdrop-blur-sm text-background font-medium flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                                                </svg>
                                                Sponsored
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="mt-4 space-y-2 flex-1 flex flex-col">
                                    {/* Metadata */}
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{leftArticle.date}</span>
                                        <span>•</span>
                                        <span>{leftArticle.readTime || "10 min read"}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-serif text-lg leading-tight text-foreground group-hover:text-accent transition-colors flex-1">
                                        {leftArticle.title}
                                    </h3>

                                    {/* Read More Link */}
                                    <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                                        <span>Read more</span>
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    </div>
                )}

                {/* Center Article - 50% */}
                {centerArticle && (
                    <div className="lg:col-span-6">
                        <Link href={`/article/${centerArticle.slug}`} className="group block h-full">
                            <article className="h-full flex flex-col">
                                {/* Image */}
                                <div className="relative overflow-hidden rounded-2xl bg-muted" style={{ height: "400px" }}>
                                    <img
                                        src={centerArticle.image || "/placeholder.svg"}
                                        alt={centerArticle.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Category Tag */}
                                    <div className="absolute top-4 left-4">
                                        <span className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-md bg-background/90 backdrop-blur-sm text-foreground font-medium">
                                            {centerArticle.category}
                                        </span>
                                    </div>
                                    {/* Sponsored Badge */}
                                    {centerArticle.sponsored && (
                                        <div className="absolute bottom-4 left-4">
                                            <span className="text-xs px-3 py-1.5 rounded-md bg-foreground/90 backdrop-blur-sm text-background font-medium flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                                                </svg>
                                                Sponsored
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="mt-4 space-y-2 flex-1 flex flex-col">
                                    {/* Metadata */}
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{centerArticle.date}</span>
                                        <span>•</span>
                                        <span>{centerArticle.readTime || "10 min read"}</span>
                                    </div>

                                    {/* Title - Same size as others */}
                                    <h3 className="font-serif text-lg leading-tight text-foreground group-hover:text-accent transition-colors flex-1">
                                        {centerArticle.title}
                                    </h3>

                                    {/* Read More Link */}
                                    <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                                        <span>Read more</span>
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    </div>
                )}

                {/* Right Article - 25% */}
                {rightArticle && (
                    <div className="lg:col-span-3">
                        <Link href={`/article/${rightArticle.slug}`} className="group block h-full">
                            <article className="h-full flex flex-col">
                                {/* Image */}
                                <div className="relative overflow-hidden rounded-2xl bg-muted" style={{ height: "400px" }}>
                                    <img
                                        src={rightArticle.image || "/placeholder.svg"}
                                        alt={rightArticle.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Category Tag */}
                                    <div className="absolute top-4 left-4">
                                        <span className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-md bg-background/90 backdrop-blur-sm text-foreground font-medium">
                                            {rightArticle.category}
                                        </span>
                                    </div>
                                    {/* Sponsored Badge */}
                                    {rightArticle.sponsored && (
                                        <div className="absolute bottom-4 left-4">
                                            <span className="text-xs px-3 py-1.5 rounded-md bg-foreground/90 backdrop-blur-sm text-background font-medium flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                                                </svg>
                                                Sponsored
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="mt-4 space-y-2 flex-1 flex flex-col">
                                    {/* Metadata */}
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{rightArticle.date}</span>
                                        <span>•</span>
                                        <span>{rightArticle.readTime || "10 min read"}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-serif text-lg leading-tight text-foreground group-hover:text-accent transition-colors flex-1">
                                        {rightArticle.title}
                                    </h3>

                                    {/* Read More Link */}
                                    <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                                        <span>Read more</span>
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
