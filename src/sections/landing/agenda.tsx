import Heading from "@/components/shared/heading"
import { Card } from "@/components/ui/card"
import { CONFIG } from "@/configs/config"

export default function AgendaSection() {
    return (
        <section id="agenda" className="relative py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <Heading title="Agenda" subtitle="Diverse topics and sessions across two days" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {CONFIG.agenda.map((item, index) => (
                        <Card
                            key={index}
                            className="scroll-reveal p-6 bg-background border-border hover:border-accent/50 transition-all duration-300 group cursor-pointer"
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-start gap-3">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/40 transition-colors">
                                    <span className="text-accent text-sm font-bold">{index + 1}</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}