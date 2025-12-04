import Image from "next/image";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { Button } from "./ui/button";
import Link from "next/link";
import TrackLabel from "./ui/track-label-badge";
import { PinIcon } from "lucide-react";

interface SessionCardProps {
    image: string;
    speakerName: string;
    topic: string;
    shortDescription: string;
    email?: string;
    linkedin?: string;
    eventName: string;
    coordinator?: string;
    track?: "software" | "hardware" | "general" | "keynote";
}

export default function SessionCard({
    image,
    speakerName,
    topic,
    shortDescription,
    email,
    linkedin,
    eventName,
    coordinator,
    track,
}: SessionCardProps) {
    const getTopicColor = () => {
        switch (track) {
            case "software": return "blue-400";
            case "hardware": return "green-400";
            case "general": return "purple-400";
            case "keynote": return "yellow-400";
            default: return "blue-400";
        }
    };

    return (
        <HoverBorderGradient
            containerClassName="rounded-2xl w-full h-full relative"
            className={`
                flex 
                flex-col 
                h-full 
                min-h-0
                w-full
                p-6 
                gap-3
                bg-neutral-950/70
                rounded-2xl
            `}
        >
            {/* Track Label - Top Right */}
            {track && (
                <div className="absolute top-3 right-3 z-10">
                    <TrackLabel track={track} />
                </div>
            )}

            {/* Topic - Enhanced with Track Color and Talk Icon */}
            <PinIcon size={20} className={`text-${getTopicColor()}`} />

            {/* Speaker Image */}
            <div className="w-full flex justify-center">
                <Image
                    src={image}
                    alt={speakerName}
                    width={180}
                    height={180}
                    className="h-[180px] w-[180px] rounded-full object-cover shadow-lg border border-neutral-700"
                />
            </div>

            {/* Speaker Name */}
            <h3 className="text-lg font-semibold text-white text-center">
                {speakerName}
            </h3>

            {/* Short Description */}
            <p className="text-neutral-400 line-clamp-4 leading-relaxed min-h-0 grow">
                {shortDescription}
            </p>

            {/* Event Name */}
            <p className="text-xs text-neutral-400">
                <span className="font-semibold text-neutral-300">Event:</span>{" "}
                {eventName}
            </p>

            {/* Coordinator */}
            {coordinator && (
                <p className="text-xs text-neutral-400">
                    <span className="font-semibold text-neutral-300">Coordinator:</span>{" "}
                    {coordinator}
                </p>
            )}


            <p className={`font-medium leading-tight text-${getTopicColor()}`}>
                {topic}
            </p>

            {/* Contact Buttons */}
            <div className="flex items-center justify-center gap-3 mt-auto pt-2">
                {email && (
                    <Button
                        asChild
                        size="sm"
                    >
                        <Link href={`mailto:${email}`}>Email</Link>
                    </Button>
                )}

                {linkedin && (
                    <Button
                        asChild
                        size="sm"
                    >
                        <Link href={linkedin} target="_blank">LinkedIn</Link>
                    </Button>
                )}
            </div>
        </HoverBorderGradient>
    );
}
