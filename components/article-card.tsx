"use client"

import Link from "next/link"

interface ArticleCardProps {
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  image: string
  slug: string
}

export function ArticleCard({ title, excerpt, author, date, category, image, slug }: ArticleCardProps) {
  return (
    <article className="space-y-4">
      {/* Image - Clickable */}
      <Link href={`/article/${slug}`} className="block">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted group">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="space-y-3">
        {/* Category Tag */}
        <div className="inline-block">
          <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
            {category}
          </span>
        </div>

        {/* Title - Clickable */}
        <Link href={`/article/${slug}`}>
          <h3 className="font-serif text-2xl leading-tight text-balance text-foreground hover:text-accent transition-colors">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {excerpt}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
          <Link
            href={`/author/${encodeURIComponent(author)}`}
            className="text-foreground font-medium hover:text-accent transition-colors"
          >
            {author}
          </Link>
          <span>·</span>
          <span>{date}</span>
        </div>
      </div>
    </article>
  )
}
