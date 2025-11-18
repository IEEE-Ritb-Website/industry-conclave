import Heading from "@/components/shared/heading";
import { Card } from "@/components/ui/card";
import { CONFIG } from "@/configs/config";
import { Trophy, Users, Zap } from "lucide-react";

export default function AboutSection() {
    return (
        <section id="about" className="py-20 relative px-4 sm:px-6 lg:px-8">
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
