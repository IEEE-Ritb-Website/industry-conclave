import Heading from "@/components/shared/heading";
import { Card } from "@/components/ui/card";
import { CONFIG } from "@/configs/config";
import { Trophy, Users, Zap } from "lucide-react";

export default function AboutSection() {
    return (
        <section id="about" className="py-20 relative px-4 sm:px-6 lg:px-8">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 0",
                    maskImage: `
         repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
      `,
                    WebkitMaskImage: `
  repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
      `,
                    maskComposite: "intersect",
                    WebkitMaskComposite: "source-in",
                }}
            />
            <div className="max-w-6xl mx-auto">
                <Heading title='About Industry Conclave' subtitle={CONFIG.shortDescription} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    {CONFIG.features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <Card
                                key={index}
                                className="scroll-reveal p-6 bg-card border-border hover:border-accent/50 transition-all duration-300"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="flex gap-4">
                                    <div className="shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10">
                                            <Icon className="text-accent" size={24} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                                        <p className="text-muted-foreground mt-2">{feature.description}</p>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
