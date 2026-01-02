"use client"

import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log("Form submitted:", formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <section className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24 border-t border-border">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                {/* Left Side - Contact Details */}
                <div className="space-y-8">
                    <div>
                        <h2 className="font-serif text-4xl lg:text-5xl text-foreground mb-4">Get in Touch</h2>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            Have a question or want to work together? Feel free to reach out. I'd love to hear from you.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                <Mail className="w-5 h-5 text-foreground" />
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-wider text-foreground font-medium mb-1">Email</h3>
                                <a href="mailto:hello@editorial.com" className="text-muted-foreground hover:text-accent transition-colors">
                                    hello@editorial.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                <Phone className="w-5 h-5 text-foreground" />
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-wider text-foreground font-medium mb-1">Phone</h3>
                                <a href="tel:+1234567890" className="text-muted-foreground hover:text-accent transition-colors">
                                    +1 (234) 567-890
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-foreground" />
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-wider text-foreground font-medium mb-1">Location</h3>
                                <p className="text-muted-foreground">
                                    New York, NY
                                    <br />
                                    United States
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Contact Form */}
                <div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm uppercase tracking-wider text-foreground font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-b-2 border-dotted border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm uppercase tracking-wider text-foreground font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-b-2 border-dotted border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>

                        {/* Subject */}
                        <div>
                            <label htmlFor="subject" className="block text-sm uppercase tracking-wider text-foreground font-medium mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-b-2 border-dotted border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                                placeholder="How can we help?"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm uppercase tracking-wider text-foreground font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full px-4 py-3 border-b-2 border-dotted border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                                placeholder="Your message..."
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 rounded-full bg-foreground text-background hover:bg-accent transition-colors text-sm uppercase tracking-wider"
                        >
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}
