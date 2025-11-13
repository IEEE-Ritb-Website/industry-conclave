import { Button } from "@/components/ui/button";
import PixelBlast from "@/components/ui/reactbits/pixel-blast";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { CONFIG } from "@/configs/config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CSSProperties } from "react";

export default function HeroSection() {
    const textSizeStyle: CSSProperties = {
        fontSize: "clamp(3.25rem, 10vw, 8rem)",
        lineHeight: 1,
        fontWeight: 800,
        fontFamily: "'Inter', 'Helvetica', sans-serif",
        userSelect: "none",
        whiteSpace: "nowrap",
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center">
            <PixelBlast
                variant="circle"
                pixelSize={6}
                color="#B19EEF"
                patternScale={3}
                patternDensity={1.2}
                pixelSizeJitter={0.5}
                enableRipples
                rippleSpeed={0.4}
                rippleThickness={0.12}
                rippleIntensityScale={1.5}
                liquid
                liquidStrength={0.12}
                liquidRadius={1.2}
                liquidWobbleSpeed={5}
                speed={0.6}
                edgeFade={0.25}
                transparent
            />
            <div className="h-160 flex flex-col items-center justify-center">
                <div className="inline-block mb-4 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full backdrop-opacity-80 backdrop-filter backdrop-blur-sm">
                    <span className="text-accent text-sm font-medium">{CONFIG.eventDetails.dates} • {CONFIG.eventDetails.location}</span>
                </div>
                <div className="text-3xl md:text-7xl mb-4 font-semibold">INDUSTRY</div>
                <TextHoverEffect text="CONCLAVE" variant="solid" />
                <div className="flex gap-4 my-2">
                    <Button asChild>
                        <Link href={"/register"} className="flex gap-2">Register now<ArrowRight /></Link>
                    </Button>
                    <Button variant={"outline"} asChild>
                        <Link href={"/register"}>View Schedule</Link>
                    </Button>
                </div>
                <div className="w-full max-w-md flex flex-col md:flex-row gap-6 items-center justify-between pt-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-accent">500+</div>
                        <div className="text-md text-muted-foreground">Attendees</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-accent">10+</div>
                        <div className="text-md text-muted-foreground">Speakers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-accent">2</div>
                        <div className="text-md text-muted-foreground">Days</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
