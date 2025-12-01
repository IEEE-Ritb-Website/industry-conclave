import { Card } from "@/components/ui/card";
import { speakersList } from "@/data/speakers-data";
import Heading from "@/components/shared/heading";
import { CONFIG } from "@/configs/config";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface SpeakerCardProps {
    image: StaticImageData | string;
    speakerName: string;
    topic: string;
    shortDescription: string;
    email?: string;
    linkedin?: string;
    eventName: string;
    track?: string;
}

function SpeakerCard({ speaker }: { speaker: SpeakerCardProps }) {
    const getTopicColor = () => {
        switch (speaker.track) {
            case "software": return "blue-400";
            case "hardware": return "green-400";
            case "general": return "purple-400";
            default: return "blue-400";
        }
    };

    return (
        <Link href={`/speakers?track=${speaker.track}`}>
            <HoverBorderGradient
                containerClassName="rounded-2xl relative p-2 w-full h-full min-h-[150px] cursor-pointer group transition-all duration-300 overflow-hidden"
            >
                {/* Speaker Image - Full Width on Hover */}
                <Image
                    src={speaker.image}
                    alt={speaker.speakerName}
                    fill
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </HoverBorderGradient>

            {/* Speaker Name - Below Image on Hover */}
            <div className="text-center mt-2">
                <h3 className="text-lg font-semibold text-white transition-all duration-300 group-hover:text-blue-400">
                    {speaker.speakerName}
                </h3>
            </div>
        </Link>
    );
}

export default function SpeakerHighlights() {
    const topSpeakers = speakersList.slice(0, 5);

    return (
        <div className="py-20 relative px-4 sm:px-6 lg:px-8">
            <Heading title="Top Speakers" subtitle={`These are our top speakers at ${CONFIG.name}`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mt-6">
                {topSpeakers.map((speaker, i) => (
                    <div key={i} className="animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                        <SpeakerCard speaker={speaker} />
                    </div>
                ))}
            </div>
        </div>
    );
}