"use client";

import SpeakerProfileCard from "@/components/ui/speaker-profile-card";
import Heading from "@/components/shared/heading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, CircuitBoard, Sparkles, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { speakersList } from "@/data/speakers-data";

export default function SpeakersContent() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState("all");

    const tracks = [
        { id: "all", name: "All Speakers", icon: Users, color: "from-violet-500/20 to-violet-600/20" },
        { id: "keynote", name: "Keynote", icon: Sparkles, color: "from-yellow-500/20 to-yellow-600/20" },
        { id: "software", name: "Software Track", icon: Cpu, color: "from-blue-500/20 to-blue-600/20" },
        { id: "hardware", name: "Hardware Track", icon: CircuitBoard, color: "from-green-500/20 to-green-600/20" },
        { id: "general", name: "General Track", icon: Sparkles, color: "from-purple-500/20 to-purple-600/20" }
    ];

    // Set initial tab based on URL params and update URL when tab changes
    useEffect(() => {
        const trackParam = searchParams.get('track');
        if (trackParam && ['keynote', 'software', 'hardware', 'general'].includes(trackParam)) {
            setActiveTab(trackParam);
        }
    }, [searchParams]);

    // Update URL when tab changes
    useEffect(() => {
        const url = new URL(window.location.href);
        if (activeTab !== 'all') {
            url.searchParams.set('track', activeTab);
            window.history.replaceState(null, '', url.toString());
        } else {
            url.searchParams.delete('track');
            window.history.replaceState(null, '', url.toString());
        }
    }, [activeTab]);

    const filteredSpeakers = activeTab === "all"
        ? speakersList
        : speakersList.filter(speaker => speaker.track === activeTab);

    return (
        <div className="py-24 relative px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <Heading
                    title='Speakers'
                    subtitle="Know who are our speakers at IEEE CIS Industry Conclave"
                />

                {/* Enhanced Track Filter Tabs */}
                <div className="mt-8 mb-8">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="flex flex-wrap sm:flex-nowrap h-auto w-full bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl gap-1">
                            {tracks.map((track) => {
                                const Icon = track.icon;
                                return (
                                    <TabsTrigger
                                        key={track.id}
                                        value={track.id}
                                        className={`
                                            relative flex items-center gap-2 p-1 rounded-lg
                                            transition-all duration-300 ease-out hover:shadow-lg
                                            data-[state=active]:bg-gradient-to-r ${track.color}
                                            data-[state=active]:text-white
                                            data-[state=inactive]:hover:bg-gradient-to-r ${track.color}
                                            data-[state=inactive]:hover:text-white
                                            group py-4
                                            whitespace-nowrap
                                        `}
                                    >
                                        <div className="relative z-10 flex items-center gap-2">
                                            <Icon size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                                            <span className="hidden md:inline font-medium text-sm">{track.name}</span>
                                            <span className="md:hidden font-medium text-sm">{track.name.split(' ')[0]}</span>
                                        </div>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </Tabs>
                </div>

                {/* Enhanced Speaker Count */}
                <div className="mb-6 text-muted-foreground flex items-center gap-2">
                    {activeTab === "all"
                        ? `Showing all ${speakersList.length} speakers`
                        : `Showing ${filteredSpeakers.length} speakers in ${tracks.find(t => t.id === activeTab)?.name}`
                    }
                </div>

                {/* Speakers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSpeakers.map((speaker: any, index: number) => (
                        <div key={`speaker-${index}`} className="animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                            <SpeakerProfileCard speaker={speaker} />
                        </div>
                    ))}
                </div>

                {/* Enhanced No Speakers Found */}
                {filteredSpeakers.length === 0 && (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/20 rounded-full">
                            <Sparkles size={16} className="text-muted-foreground" />
                            <p className="text-muted-foreground">No speakers found in this track.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}