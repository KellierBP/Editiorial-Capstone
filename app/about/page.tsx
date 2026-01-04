"use client"

import { NewHeader } from "@/components/new-header"
import { NewFooter } from "@/components/new-footer"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <NewHeader />

            <main className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
                <header className="max-w-3xl mb-16">
                    <h1 className="font-serif text-4xl lg:text-6xl text-foreground mb-6">About Editorial</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We are a digital sanctuary for thoughtful writing, curated design, and meaningful stories.
                    </p>
                </header>

                <section className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-24">
                    <div className="prose prose-lg text-muted-foreground">
                        <p className="mb-6">
                            Founded in 2024, Editorial began as a reaction against the noise of the modern internet.
                            We believe that quality content deserves a quiet, beautiful space to be consumed.
                        </p>
                        <p>
                            Our mission is to empower writers and creators to share their work without the distraction
                            of ads, pop-ups, or algorithmic interference.
                        </p>
                    </div>
                    <div className="relative h-96 lg:h-auto rounded-2xl overflow-hidden bg-muted">
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
                            alt="Office workspace"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </section>

                <section className="border-t border-border pt-16">
                    <h2 className="font-serif text-3xl text-foreground mb-8">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-medium text-foreground mb-3 text-lg">Simplicity</h3>
                            <p className="text-muted-foreground">We strip away the non-essential to focus on what matters.</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-foreground mb-3 text-lg">Quality</h3>
                            <p className="text-muted-foreground">We prioritize depth and insight over clickbait and trends.</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-foreground mb-3 text-lg">Community</h3>
                            <p className="text-muted-foreground">We foster respectful, meaningful connection between readers and writers.</p>
                        </div>
                    </div>
                </section>
            </main>

            <NewFooter />
        </div>
    )
}
