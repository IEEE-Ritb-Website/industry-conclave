import Heading from "@/components/shared/heading";
import { Card } from "@/components/ui/card";
import { CONFIG } from "@/configs/config";
import { Building, Users, Utensils, Gift, BookOpen, Handshake } from "lucide-react";

export default function AboutSection() {
    const features = [
        {
            icon: Building,
            title: "Industry Connection",
            subtitle: "Bridge the gap between academia and industry.",
            description: "Learn directly from professionals building the technologies of tomorrow. From AI and robotics to cloud, hardware, and emerging tech — gain real insights into how the industry works, what skills are in demand, and how you can prepare for the future.",
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20"
        },
        {
            icon: Users,
            title: "Community",
            subtitle: "Connect with innovators across the nation.",
            description: "Meet students, developers, researchers, IEEE members, and tech enthusiasts from various domains. Share ideas, collaborate, and become part of a vibrant technical community that inspires growth and creativity.",
            color: "text-green-500",
            bgColor: "bg-green-500/10",
            borderColor: "border-green-500/20"
        },
        {
            icon: Utensils,
            title: "Hospitality",
            subtitle: "Relax, recharge, and network over a curated lunch experience.",
            description: "Enjoy a thoughtfully arranged lunch designed to help participants connect informally, share perspectives, and engage with peers, speakers, and industry professionals in a welcoming environment.",
            color: "text-orange-500",
            bgColor: "bg-orange-500/10",
            borderColor: "border-orange-500/20"
        },
        {
            icon: Gift,
            title: "Goodies & Merchandise",
            subtitle: "Take home exclusive IEEE-branded merchandise.",
            description: "Every participant receives specially designed IEEE goodies — a token of appreciation and a lasting memory from the conclave. Celebrate your involvement with souvenirs that reflect innovation, learning, and community.",
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
            borderColor: "border-purple-500/20"
        },
        {
            icon: BookOpen,
            title: "Learning",
            subtitle: "Workshops. Keynotes. Expert Panels. Real Skills.",
            description: "Whether you're into software, hardware, or interdisciplinary tech, there's something transformative waiting for you.",
            color: "text-cyan-500",
            bgColor: "bg-cyan-500/10",
            borderColor: "border-cyan-500/20"
        },
        {
            icon: Handshake,
            title: "Collaboration",
            subtitle: "Spark innovation and build meaningful relationships.",
            description: "Collaborate with like-minded peers, mentors, and experts. Exchange ideas, work on concepts, discover opportunities, and explore how technology can solve real-world problems.",
            color: "text-pink-500",
            bgColor: "bg-pink-500/10",
            borderColor: "border-pink-500/20"
        }
    ];

    return (
        <section id="about" className="py-20 relative px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <Heading
                    title='About Industry Conclave'
                    subtitle="Gain Real-World Insights. Learn from Leaders. Build Your Network. Unlock Your Future."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <Card
                                key={index}
                                className={`scroll-reveal p-6 bg-card ${feature.borderColor} border hover:${feature.borderColor} hover:shadow-lg transition-all duration-300`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="flex gap-4">
                                    <div className="shrink-0">
                                        <div className={`flex items-center justify-center h-12 w-12 rounded-lg ${feature.bgColor}`}>
                                            <Icon className={feature.color} size={24} />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                                        <p className={`${feature.color} italic font-medium mt-1`}>{feature.subtitle}</p>
                                        <p className="text-muted-foreground mt-2 whitespace-pre-line leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>

                <p className="text-center text-muted-foreground max-w-4xl mx-auto mt-10 leading-relaxed">
                    {CONFIG.longDescription}
                </p>
            </div>
        </section>
    )
}
