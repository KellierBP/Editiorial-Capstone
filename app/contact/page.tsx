"use client"

import { NewHeader } from "@/components/new-header"
import { NewFooter } from "@/components/new-footer"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            <NewHeader />

            <main className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* Contact Info */}
                    <div>
                        <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-6">Get in Touch</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                            Have a story to tell or a question about our platform? We'd love to hear from you.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-foreground" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground text-lg mb-1">Email</h3>
                                    <p className="text-muted-foreground">hello@editorial.com</p>
                                    <p className="text-muted-foreground">press@editorial.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-foreground" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground text-lg mb-1">Office</h3>
                                    <p className="text-muted-foreground">123 Design District</p>
                                    <p className="text-muted-foreground">New York, NY 10013</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-foreground" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground text-lg mb-1">Phone</h3>
                                    <p className="text-muted-foreground">+1 (555) 000-0000</p>
                                    <p className="text-sm text-muted-foreground mt-1">(Mon-Fri, 9am-6pm EST)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-muted/30 p-8 rounded-2xl border border-border">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm uppercase tracking-wider text-foreground font-medium mb-3">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-accent transition-colors"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm uppercase tracking-wider text-foreground font-medium mb-3">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-accent transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm uppercase tracking-wider text-foreground font-medium mb-3">
                                    Subject
                                </label>
                                <select
                                    id="subject"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-accent transition-colors"
                                >
                                    <option value="">Select a topic...</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="support">Support</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="press">Press</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm uppercase tracking-wider text-foreground font-medium mb-3">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full h-12 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider font-medium"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <NewFooter />
        </div>
    )
}
