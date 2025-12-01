"use client";

import SessionCard from "@/components/session-card";
import Heading from "@/components/shared/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Linkedin, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { speakersList } from "@/data/speakers-data";
import Image from "next/image";

interface SpeakerProfileProps {
    params: {
        id: string;
    };
}

export default function SpeakerProfilePage({ params }: SpeakerProfileProps) {
    const speaker = speakersList.find(s => s.speakerName.toLowerCase().replace(/\s+/g, '').replace(/\s+/g, '-').replace(/[^a-zA-Z0-9]/g, '') === params.id);

    if (!speaker) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
            <div className="relative px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <div className="mb-8">
                        <Button asChild variant="outline">
                            <Link href="/speakers" className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7 7-7 7" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9l9 9 18" />
                                </svg>
                                <span>Back to Speakers</span>
                            </Link>
                        </Button>
                    </div>

                    {/* Speaker Profile Card */}
                    <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
                        {/* Glassy Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
                        
                        <div className="relative z-10">
                            {/* Header Section */}
                            <div className="flex flex-col md:flex-row gap-8 mb-8">
                                {/* Speaker Image - Square with Glassy Effect */}
                                <div className="relative w-48 h-48 mx-auto md:mx-0 md:w-48 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-1 shadow-2xl group-hover:scale-105 transition-all duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                                    <Image
                                        src={speaker.image}
                                        alt={speaker.speakerName}
                                        fill
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>

                                {/* Speaker Info */}
                                <div className="flex-1 md:ml-8">
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                        {speaker.speakerName}
                                    </h1>
                                    
                                    <p className="text-xl md:text-2xl font-semibold text-blue-600 mb-4">
                                        {speaker.topic}
                                    </p>

                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {speaker.shortDescription}
                                    </p>

                                    {/* Contact Buttons with Logos */}
                                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                        {speaker.email && (
                                            <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-2 border-blue-400/50 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <div className="relative z-10 flex items-center gap-2">
                                                    <Mail className="w-4 h-4" />
                                                    <span>Email</span>
                                                </div>
                                            </Button>
                                        )}

                                        {speaker.linkedin && (
                                            <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white border-2 border-blue-600/50 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <div className="relative z-10 flex items-center gap-2">
                                                    <Linkedin className="w-4 h-4" />
                                                    <span>LinkedIn</span>
                                                </div>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}