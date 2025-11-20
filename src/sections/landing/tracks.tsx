import Heading from "@/components/shared/heading"
import { Card } from "@/components/ui/card"
import { Cpu, CircuitBoard, Sparkles } from "lucide-react"

export default function TracksSection() {
    const tracks = [
        {
            title: "Software Track",
            description:
                "Talks, workshops, and demos focused on software engineering, AI/ML, cloud, dev tooling, and modern application development.",
            icon: Cpu,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            title: "Hardware Track",
            description:
                "Sessions covering robotics, embedded systems, IoT, EV tech, silicon innovations, and next-gen hardware engineering.",
            icon: CircuitBoard,
            color: "text-green-400",
            bg: "bg-green-500/10",
        },
        {
            title: "General Track",
            description:
                "Panels, fireside chats, networking, leadership discussions, and cross-domain conversations accessible to all attendees.",
            icon: Sparkles,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
        },
    ]

    return (
        <section id="tracks" className="relative py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <Heading
                    title="Conference Tracks"
                    subtitle="Three curated tracks designed to bring diverse experiences to all attendees"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {tracks.map((track, index) => {
                        const Icon = track.icon
                        return (
                            <Card
                                key={index}
                                className="p-6 bg-background border-border hover:border-accent/40 
                                transition-all duration-300 group rounded-2xl cursor-pointer"
                            >
                                <div
                                    className={`w-12 h-12 rounded-xl ${track.bg} flex items-center justify-center mb-4
                                    group-hover:scale-110 transition-transform`}
                                >
                                    <Icon className={`w-6 h-6 ${track.color}`} />
                                </div>

                                <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                                    {track.title}
                                </h3>

                                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                                    {track.description}
                                </p>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
