import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md space-y-12">
          <div className="text-center space-y-4">
            <h1 className="font-serif text-5xl text-foreground">Create Account</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">Join our editorial community</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs uppercase tracking-widest text-muted-foreground">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-muted-foreground">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-xs uppercase tracking-widest text-muted-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirm" className="block text-xs uppercase tracking-widest text-muted-foreground">
                Confirm Password
              </label>
              <input
                id="confirm"
                type="password"
                placeholder="Confirm your password"
                className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-foreground text-background hover:bg-secondary transition-colors text-sm uppercase tracking-wider mt-8"
            >
              Create Account
            </Button>
          </form>

          <div className="text-center space-y-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-foreground hover:text-secondary transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
