import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md space-y-12">
          <div className="text-center space-y-4">
            <h1 className="font-serif text-5xl text-foreground">Sign In</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">Access your editorial dashboard</p>
          </div>

          <form className="space-y-6">
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
                placeholder="Enter your password"
                className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-foreground text-background hover:bg-secondary transition-colors text-sm uppercase tracking-wider"
            >
              Sign In
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest">
              <span className="bg-background px-4 text-muted-foreground">Or</span>
            </div>
          </div>

          <div className="text-center space-y-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-foreground hover:text-secondary transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
