import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function AboutSection() {
    return (
        <section className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24 border-t border-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Column: 35% - Title and Description */}
                <div className="lg:col-span-4 space-y-6">
                    <h2 className="font-serif text-5xl lg:text-6xl text-foreground leading-tight">About Me</h2>
                    <p className="text-base leading-relaxed text-muted-foreground">
                        I'm specialize in turning complex problems into elegant solutions. My approach blends creativity with
                        strategic thinking to deliver designs that not only look great but work seamlessly. Ready to start your
                        next project?
                    </p>
                </div>

                {/* Middle Column: 30% - Stats Tile */}
                <div className="lg:col-span-4">
                    <div className="bg-muted rounded-2xl p-8 flex flex-col justify-between" style={{ height: "700px" }}>
                        {/* Top: Icon and Stat */}
                        <div className="space-y-6">
                            <div className="w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center">
                                <Globe className="w-6 h-6 text-foreground" />
                            </div>
                            <div className="space-y-2">
                                <div className="font-serif text-6xl text-foreground">320%</div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Average increase in client engagement in the first 6 months
                                </p>
                            </div>
                        </div>

                        {/* Bottom: Portrait Image */}
                        <div className="aspect-[3/4] overflow-hidden rounded-xl bg-background">
                            <img
                                src="/placeholder.svg"
                                alt="Portrait"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: 35% - Image and Paragraphs */}
                <div className="lg:col-span-4 flex flex-col justify-between" style={{ minHeight: "700px" }}>
                    {/* Image */}
                    <div className="overflow-hidden rounded-2xl bg-muted" style={{ height: "250px" }}>
                        <img
                            src="/placeholder.svg"
                            alt="About"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Paragraphs with Icons - Aligned to bottom */}
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0 text-sm font-medium">
                                01
                            </div>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                With 4+ years of experience, I specialize in creating intuitive, user-focused designs that solve
                                real-world problems and deliver seamless digital experiences.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0 text-sm font-medium">
                                02
                            </div>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                I thrive on working closely with clients, blending creativity with strategy to bring their vision to
                                life through thoughtful, impactful design solutions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
