import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Article Header */}
        <article className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
          <header className="space-y-8 mb-16">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Design</div>
            <h1 className="font-serif text-5xl lg:text-7xl leading-tight text-balance text-foreground">
              The Future of Minimalism in Contemporary Design
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
              <span className="text-foreground">Elena Morrison</span>
              <span>·</span>
              <span>January 15, 2025</span>
              <span>·</span>
              <span>8 min read</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-[16/9] overflow-hidden bg-muted mb-16">
            <img
              src="/minimalist-modern-interior-design.jpg"
              alt="Minimalist interior design"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="font-serif text-xl leading-relaxed text-foreground mb-8">
              In an era of constant stimulation and digital noise, the principles of minimalism have never been more
              relevant. This exploration examines how contemporary designers are reinterpreting restraint, simplicity,
              and purpose to create spaces and objects that resonate with clarity and intention.
            </p>

            <h2 className="font-serif text-3xl text-foreground mt-16 mb-6">The Evolution of Less</h2>

            <p className="font-serif text-lg leading-relaxed text-foreground mb-6">
              Minimalism emerged not as a rejection of beauty, but as a refinement of it. From the Bauhaus movement to
              the Japanese concept of "Ma" — the appreciation of negative space — designers have long understood that
              what we remove is as important as what we include. Today's practitioners build upon this foundation,
              creating work that speaks through absence rather than abundance.
            </p>

            <p className="font-serif text-lg leading-relaxed text-foreground mb-6">
              The contemporary interpretation extends beyond mere aesthetic choice. It represents a philosophical stance
              on consumption, attention, and the role of design in daily life. Every line, every surface, every
              carefully considered detail serves a purpose or creates meaning through its relationship to space.
            </p>

            <h2 className="font-serif text-3xl text-foreground mt-16 mb-6">Material Honesty</h2>

            <p className="font-serif text-lg leading-relaxed text-foreground mb-6">
              Modern minimalism celebrates materials in their truest form. Concrete reveals its texture, wood shows its
              grain, metal accepts its patina. This honest approach creates intimacy between object and observer,
              inviting touch and contemplation. The surface becomes a record of time, use, and care — qualities that
              connect us to the physical world.
            </p>

            <p className="font-serif text-lg leading-relaxed text-foreground mb-6">
              Leading architects like Tadao Ando demonstrate how limited materials — primarily concrete and light — can
              create profound spatial experiences. His work proves that restriction breeds creativity, and that mastery
              comes not from variety but from depth of understanding.
            </p>

            <blockquote className="border-l-2 border-foreground pl-6 my-12 italic font-serif text-xl text-foreground">
              "Simplicity is not the goal. It is the by-product of a good idea and modest expectations."
              <footer className="text-base not-italic text-muted-foreground mt-4">— Paul Rand</footer>
            </blockquote>

            <h2 className="font-serif text-3xl text-foreground mt-16 mb-6">The Power of Restraint</h2>

            <p className="font-serif text-lg leading-relaxed text-foreground mb-6">
              In graphic design, typography, and digital interfaces, minimalism manifests as careful hierarchy and
              generous white space. Each element receives room to breathe, allowing the viewer's eye to move naturally
              through the composition. This restraint doesn't diminish impact — it amplifies it.
            </p>

            <p className="font-serif text-lg leading-relaxed text-foreground mb-6">
              The digital realm particularly benefits from this approach. As screens dominate our attention, designers
              who understand restraint create experiences that feel calm rather than chaotic, focused rather than
              overwhelming. They recognize that the most sophisticated interface is often invisible.
            </p>

            <h2 className="font-serif text-3xl text-foreground mt-16 mb-6">Looking Forward</h2>

            <p className="font-serif text-lg leading-relaxed text-foreground mb-6">
              As we move deeper into the 21st century, minimalism continues to evolve. It intersects with
              sustainability, with digital technology, with changing cultural values. Yet its core principle remains: to
              design with intention, to remove the unnecessary, to honor both material and space.
            </p>

            <p className="font-serif text-lg leading-relaxed text-foreground mb-6">
              The future of minimalism lies not in its definition but in its application. Each generation reinterprets
              simplicity through its own lens, finding new ways to express the timeless appeal of restraint. In doing
              so, they remind us that true luxury isn't abundance — it's having exactly what you need, beautifully
              realized.
            </p>
          </div>

          {/* Author Bio */}
          <div className="border-t border-border mt-16 pt-12">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-muted flex-shrink-0" />
              <div className="space-y-2">
                <div className="font-serif text-xl text-foreground">Elena Morrison</div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Elena is a design writer and curator based in Copenhagen. Her work focuses on the intersection of
                  minimalism, sustainability, and contemporary culture.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
            <h2 className="font-serif text-3xl text-foreground mb-12">Related Stories</h2>
            <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
              {[
                {
                  title: "Architecture as Poetry",
                  category: "Architecture",
                  image: "/modern-architecture-cityscape.png",
                },
                {
                  title: "The Revival of Analog Photography",
                  category: "Photography",
                  image: "/classic-film-camera.png",
                },
                {
                  title: "Slow Fashion Movement",
                  category: "Fashion",
                  image: "/sustainable-fashion-collage.png",
                },
              ].map((article, i) => (
                <Link key={i} href="#" className="group">
                  <article className="space-y-4">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">{article.category}</div>
                      <h3 className="font-serif text-xl text-foreground group-hover:text-secondary transition-colors">
                        {article.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border">
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
