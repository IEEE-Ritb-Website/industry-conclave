import Heading from "@/components/shared/heading"
import { Card } from "@/components/ui/card"
import { Cpu, CircuitBoard, Sparkles, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function TracksSection() {
    const tracks = [
        {
            title: "Software Track",
            description:
                "Talks, workshops, and demos focused on software engineering, AI/ML, cloud, dev tooling, and modern application development.",
            icon: Cpu,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            hoverBg: "hover:bg-gradient-to-br hover:from-blue-500/5 hover:to-blue-600/10",
            glareColor: "from-blue-400/20 to-transparent",
            trackKey: "software"
        },
        {
            title: "Hardware Track",
            description:
                "Sessions covering robotics, embedded systems, IoT, EV tech, silicon innovations, and next-gen hardware engineering.",
            icon: CircuitBoard,
            color: "text-green-400",
            bg: "bg-green-500/10",
            hoverBg: "hover:bg-gradient-to-br hover:from-green-500/5 hover:to-green-600/10",
            glareColor: "from-green-400/20 to-transparent",
            trackKey: "hardware"
        },
        {
            title: "General Track",
            description:
                "Panels, fireside chats, networking, leadership discussions, and cross-domain conversations accessible to all attendees.",
            icon: Sparkles,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            hoverBg: "hover:bg-gradient-to-br hover:from-purple-500/5 hover:to-purple-600/10",
            glareColor: "from-purple-400/20 to-transparent",
            trackKey: "general"
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
                        return (
                            <Link href={`/speakers?track=${track.trackKey}`} key={`track-${index}`}>
                                <Card
                                    className={`p-6 bg-background border-border relative overflow-hidden
                                    transition-all duration-300 group rounded-2xl cursor-pointer
                                    h-full flex flex-col justify-between
                                    hover:shadow-2xl hover:scale-105`}
                                >
                                    {/* Glare Effect Overlay */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className={`absolute inset-0 bg-linear-to-br ${track.hoverBg}`} />
                                        <div className={`absolute top-0 left-1/4 w-32 h-32 bg-linear-to-br ${track.glareColor} transform -translate-x-1/2 -translate-y-1/2 rotate-45 blur-xl`} />
                                    </div>
                                    
                                    {/* Chevron Icon */}
                                    <ChevronRight 
                                        className="absolute top-4 right-4 w-5 h-5 text-muted-foreground/0 group-hover:text-muted-foreground transition-all duration-300 group-hover:translate-x-1" 
                                    />

                                    <div className="relative z-10">
                                        <div
                                            className={`w-12 h-12 rounded-xl ${track.bg} flex items-center justify-center mb-4
                                            group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                                        >
                                            <track.icon className={`w-6 h-6 ${track.color}`} />
                                        </div>

                                        <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                                            {track.title}
                                        </h3>

                                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                                            {track.description}
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
