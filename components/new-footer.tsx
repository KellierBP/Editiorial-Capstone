"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NewFooter() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <footer className="border-t border-border mt-24 bg-background">
            {/* Newsletter Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 border-b border-border">
                <div className="max-w-xl mx-auto text-center space-y-6">
                    <h3 className="font-serif text-3xl text-foreground">Subscribe to Newsletter</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Subscribe to get the latest posts delivered right to your email.
                    </p>
                    <form className="flex gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                        />
                        <Button className="px-6 py-3 rounded-lg bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider">
                            Subscribe
                        </Button>
                    </form>
                </div>
            </div>

            {/* Footer Columns */}
            <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1: Brand */}
                    <div className="space-y-4">
                        <div className="font-serif text-2xl tracking-tight text-foreground">Editorial</div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            An ultimate source for fresh perspectives! Explore curated content to enlighten, entertain and engage
                            global readers.
                        </p>
                    </div>

                    {/* Column 2: Categories */}
                    <div className="space-y-4">
                        <h4 className="text-sm uppercase tracking-widest text-foreground font-medium">Categories</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="/category/design" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Design
                            </Link>
                            <Link href="/category/architecture" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Architecture
                            </Link>
                            <Link href="/category/photography" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Photography
                            </Link>
                            <Link href="/category/fashion" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Fashion
                            </Link>
                            <Link href="/category/travel" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Travel
                            </Link>
                        </nav>
                    </div>

                    {/* Column 3: Social */}
                    <div className="space-y-4">
                        <h4 className="text-sm uppercase tracking-widest text-foreground font-medium">Social Network</h4>
                        <nav className="flex flex-col gap-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <Facebook className="w-4 h-4" />
                                Facebook
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <Instagram className="w-4 h-4" />
                                Instagram
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <Twitter className="w-4 h-4" />
                                Twitter
                            </a>
                        </nav>
                    </div>

                    {/* Column 4: Pages */}
                    <div className="space-y-4">
                        <h4 className="text-sm uppercase tracking-widest text-foreground font-medium">Pages</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                About
                            </Link>
                            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Contact
                            </Link>
                            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Dashboard
                            </Link>
                            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Login
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border">
                <div className="mx-auto max-w-7xl px-6 lg:px-12 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">© 2025 Editorial Magazine. All rights reserved.</p>
                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <span className="uppercase tracking-wider">Back to Top</span>
                            <ArrowUp className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
