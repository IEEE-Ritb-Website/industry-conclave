import Image from "next/image";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { Button } from "./ui/button";
import Link from "next/link";

interface SessionCardProps {
    image: string;
    speakerName: string;
    topic: string;
    shortDescription: string;
    email?: string;
    linkedin?: string;
    eventName: string;
    coordinator?: string;
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
}: SessionCardProps) {
    return (
        <HoverBorderGradient
            containerClassName="rounded-2xl w-full h-full"
            className="
                flex 
                flex-col 
                h-full 
                min-h-0
                w-full
                p-4 
                gap-3
                bg-neutral-950/70
                rounded-2xl
            "
        >
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

            {/* Topic */}
            <p className="text-blue-400 text-center font-medium">
                {topic}
            </p>

            {/* Short Description */}
            <p className="text-neutral-400 line-clamp-4 leading-relaxed min-h-0">
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

            {/* Contact Buttons */}
            <div className="flex items-center justify-center gap-3 mt-auto pt-2">
                {email && (
                    <Button
                        asChild
                    >
                        <Link href={`mailto:${email}`}>Email</Link>
                    </Button>
                )}

                {linkedin && (
                    <Button
                        asChild
                    >
                        <Link href={linkedin} target="_blank">LinkedIn</Link>
                    </Button>
                )}
            </div>
        </HoverBorderGradient>
    );
}
