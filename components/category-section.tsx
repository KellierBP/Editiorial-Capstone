import Link from "next/link"

interface Category {
    name: string
    slug: string
    image?: string
}

interface CategorySectionProps {
    categories: Category[]
}

export function CategorySection({ categories }: CategorySectionProps) {
    return (
        <section className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
            {/* Centered Title */}
            <div className="text-center mb-12">
                <h2 className="font-serif text-4xl lg:text-5xl text-foreground">Blog categories</h2>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className="group block"
                    >
                        <div className="relative aspect-square bg-muted rounded-2xl p-6 flex items-end overflow-hidden transition-all duration-300 hover:shadow-lg">
                            {/* Background Image - Animated on Hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent z-10" />
                                <img
                                    src={category.image || "/placeholder.svg"}
                                    alt={category.name}
                                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Category Name */}
                            <h3 className="relative z-20 text-sm font-medium text-foreground group-hover:text-background transition-colors duration-300">
                                {category.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
