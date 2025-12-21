import Link from "next/link"

export function Navigation() {
  return (
    <nav className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-serif text-xl tracking-tight text-foreground">
            Editorial
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Stories
            </Link>
            <Link
              href="/dashboard"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
