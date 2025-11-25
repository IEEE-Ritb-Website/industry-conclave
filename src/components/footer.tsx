import { CONFIG } from "@/configs/config"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="border-t border-border bg-card/30 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center mb-4">
                            <span className="text-primary-foreground font-bold text-xs">IC</span>
                        </div>
                        <h3 className="font-semibold mb-2">{CONFIG.name}</h3>
                        <p className="text-sm text-muted-foreground">{CONFIG.shortDescription}</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#about" className="hover:text-foreground transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#agenda" className="hover:text-foreground transition-colors">
                                    Agenda
                                </Link>
                            </li>
                            <li>
                                <Link href="#timeline" className="hover:text-foreground transition-colors">
                                    Timeline
                                </Link>
                            </li>
                            <li>
                                <Link href="#faq" className="hover:text-foreground transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/conduct" className="hover:text-foreground transition-colors">
                                    Code of Conduct
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-foreground transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Sponsorship
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-semibold mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            {CONFIG.profile.socials.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.url}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={social.label}
                                    target="_blank"
                                >
                                    <social.icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>&copy; 2025 {CONFIG.name}. All rights reserved.</p>
                    <p>Made with care by the ieee ritb community</p>
                </div>
            </div>
        </footer>
    )
}