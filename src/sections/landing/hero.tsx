import { Button } from "@/components/ui/button";
import BlurText from "@/components/ui/reactbits/blur-text";
import PixelBlast from "@/components/ui/reactbits/pixel-blast";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { CONFIG } from "@/configs/config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Fixed positioning for background */}
            <div className="absolute inset-0 w-full h-full">
                <PixelBlast
                    variant="triangle"
                    transparent
                    autoPauseOffscreen
                    className="w-full h-full opacity-80"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 md:pt-10">
                <div className="inline-block mb-4 px-4 py-2 bg-purple-500/30 border border-purple-600/30 text-purple-400 font-semibold rounded-full backdrop-opacity-80 backdrop-filter backdrop-blur-sm">
                    <span className="text-sm font-medium">
                        {CONFIG.eventDetails.dates} • {CONFIG.eventDetails.location}
                    </span>
                </div>

                <div className="mb-6 flex flex-col items-center justify-center">
                    <div className="text-xl font-semibold text-center">
                        IEEE CIS
                    </div>
                    <TextHoverEffect text="INDUSTRY" />
                    <TextHoverEffect text="CONCLAVE" />
                    <BlurText text="2025" />
                    <p className="text-md font-light text-center">
                    Deploying the future, today 🚀
                    </p>
                </div>



                <div className="flex flex-col sm:flex-row gap-4 my-4 w-full max-w-md justify-center">
                    <Button asChild className="w-full sm:w-auto">
                        <Link href={"/register"} className="flex gap-2 items-center justify-center">
                            Register now
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                    <Button variant={"outline"} asChild className="w-full sm:w-auto">
                        <Link href={"/register"}>View Schedule</Link>
                    </Button>
                </div>

                <div className="w-full max-w-md flex flex-col sm:flex-row gap-6 sm:gap-8 items-center justify-between pt-8">
                    <div className="text-center">
                        <div className="text-3xl sm:text-4xl font-bold text-accent">500+</div>
                        <div className="text-sm sm:text-md text-muted-foreground">Attendees</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl sm:text-4xl font-bold text-accent">10+</div>
                        <div className="text-sm sm:text-md text-muted-foreground">Speakers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl sm:text-4xl font-bold text-accent">2</div>
                        <div className="text-sm sm:text-md text-muted-foreground">Days</div>
                    </div>
                </div>
            </div>
        </section>
    );
}