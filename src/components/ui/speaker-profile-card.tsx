"use client";

import Image from "next/image";
import { HoverBorderGradient } from "./hover-border-gradient";
import { Button } from "./button";
import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";
import { Speaker } from "@/types";

interface SpeakerProfileCardProps {
    speaker: Speaker;
}

export default function SpeakerProfileCard({ speaker }: SpeakerProfileCardProps) {
    return (
        <HoverBorderGradient
            containerClassName="rounded-2xl w-full h-full relative"
            className="flex flex-col h-full min-h-0 w-full p-6 gap-3 bg-neutral-950/70 rounded-2xl"
        >
            {/* Track Label - Top Right */}
            {speaker.track && (
                <div className="absolute top-3 right-3 z-10">
                    <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {speaker.track}
                    </div>
                </div>
            )}

            {/* Speaker Image */}
            <div className="w-full flex justify-center mb-4">
                <Image
                    src={speaker.image}
                    alt={speaker.speakerName}
                    width={200}
                    height={200}
                    className="h-[200px] w-[200px] rounded-full object-cover shadow-lg border border-neutral-700"
                />
            </div>

            {/* Speaker Name */}
            <h3 className="text-2xl font-bold text-white text-center mb-2">
                {speaker.speakerName}
            </h3>

            {/* Position */}
            {speaker.position && (
                <p className="text-neutral-300 text-center mb-3">
                    <span className="font-semibold text-white">{speaker.position}</span>
                </p>
            )}

            {/* Short Description */}
            <div className="text-neutral-300 mb-4 leading-relaxed">
                <p className="line-clamp-6">
                    {speaker.shortDescription}
                </p>
            </div>

            {/* Event Name */}
            {speaker.eventName && (
                <p className="text-xs text-neutral-400 text-center mb-2">
                    <span className="font-semibold text-neutral-300">Event:</span>{" "}
                    {speaker.eventName}
                </p>
            )}

            {/* Topic */}
            {speaker.topic && (
                <p className={`font-medium leading-tight text-center mb-4 ${
                    speaker.track === 'keynote' ? 'text-yellow-400' :
                    speaker.track === 'software' ? 'text-blue-400' :
                    speaker.track === 'hardware' ? 'text-green-400' :
                    'text-purple-400'
                }`}>
                    {speaker.topic}
                </p>
            )}

            {/* Contact Information */}
            <div className="flex items-center justify-center gap-4 mt-auto">
                {speaker.email && (
                    <Button
                        asChild
                        size="sm"
                        className="text-white"
                    >
                        <a href={`mailto:${speaker.email}`} className="flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            {speaker.email}
                        </a>
                    </Button>
                )}
                
                {speaker.linkedin && (
                    <Button
                        asChild
                        size="sm"
                        className="text-white"
                    >
                        <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            LinkedIn
                        </a>
                    </Button>
                )}
            </div>

            {/* Additional Details */}
            {speaker.coordinator && (
                <p className="text-xs text-neutral-400 text-center mb-1">
                    <span className="font-semibold text-neutral-300">Coordinator:</span>{" "}
                    {speaker.coordinator}
                </p>
            )}

            {speaker.venue && (
                <p className="text-xs text-neutral-400 text-center mb-1">
                    <span className="font-semibold text-neutral-300">Venue:</span>{" "}
                    {speaker.venue}
                </p>
            )}
        </HoverBorderGradient>
    );
}