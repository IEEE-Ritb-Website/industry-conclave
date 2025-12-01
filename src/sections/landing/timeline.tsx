"use client";

import Heading from "@/components/shared/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timeline } from "@/components/ui/timeline";
import SpeakerProfile from "@/components/ui/speaker-profile";
import TrackLabel from "@/components/ui/track-label";
import { MapPin, Clock, Trophy } from "lucide-react";
import * as speakerImages from "@/assets/speakers";

export default function TimelineSection() {
    const data = {
        day1: [
            {
                title: "09:30 AM",
                content: (
                    <div>
                        <h3 className="text-2xl md:text-4xl font-bold dark:text-neutral-100 mb-8">
                            5 December 2025
                        </h3>

                        <p className="mb-5 text-neutral-400">
                            <strong>Keynote Speeches</strong> (9:30 AM – 11:30 AM)
                        </p>

                        <ul className="space-y-6">
                            <li>
                                <SpeakerProfile
                                    name="Dr. Prasant Misra"
                                    imageSrc={speakerImages.prasantMisra}
                                />
                                <p className="text-neutral-300">
                                    Decision Making in Electric Vehicles & The Future of Smart Mobility
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-neutral-400">
                                    <MapPin size={16} />
                                    <span>ESB Seminar Hall-I</span>
                                </div>
                            </li>

                            <li>
                                <SpeakerProfile
                                    name="Vimal Bastin Edwin Joseph"
                                    imageSrc={speakerImages.vimalBastin}
                                />
                                <p className="text-neutral-300">
                                    RANtelligence: AI-Powered Radio Access Network – Opportunities & Challenges
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-neutral-400">
                                    <MapPin size={16} />
                                    <span>ESB Seminar Hall-I</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                ),
            },
            {
                title: "12:00 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Parallel Sessions</strong> (12:00 PM – 1:00 PM)
                        </p>

                        <ul className="space-y-6 text-neutral-400">

                            {/* SOFTWARE */}
                            <li>
                                <TrackLabel className="mb-4" track="Software" />
                                <SpeakerProfile
                                    name="Ramesh Naidu Laveti"
                                    imageSrc={speakerImages.rameshNaiduLaveti}
                                />
                                <p className="text-neutral-300">
                                    Trustworthy and Secure AI: Building Safe Systems for the Future
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <MapPin size={16} />
                                    <span>DES Hi-Tech Seminar Hall</span>
                                </div>
                            </li>

                            {/* HARDWARE */}
                            <li>
                                <TrackLabel className="mb-4" track="Hardware" />
                                <SpeakerProfile
                                    name="Dr. Anjani Priyadarshini"
                                    imageSrc={speakerImages.drAnjaniPriyadarshini}
                                />
                                <p className="text-neutral-300">Quantum AI: Computing Beyond Limits</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <MapPin size={16} />
                                    <span>Venue TBA</span>
                                </div>
                            </li>

                            {/* GENERAL */}
                            <li>
                                <TrackLabel className="mb-4" track="General" />
                                <SpeakerProfile
                                    name="Sreenivasa Ramanujam Kanduri"
                                    imageSrc={speakerImages.sreenivasaRamanujamJ}
                                />
                                <p className="text-neutral-300">Industry Expectation from Young Engineers</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <MapPin size={16} />
                                    <span>ESB Seminar Hall 2</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                ),
            },

            {
                title: "01:00 PM",
                content: (
                    <p className="text-xl md:text-3xl text-neutral-400">
                        <strong>Lunch Break</strong> (1:00 PM – 2:00 PM)
                    </p>
                ),
            },

            {
                title: "02:00 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Afternoon Sessions</strong> (2:00 PM – 3:00 PM)
                        </p>

                        <ul className="space-y-6">

                            {/* SOFTWARE */}
                            <li>
                                <TrackLabel className="mb-4" track="Software" />
                                <SpeakerProfile name="Sourav K" imageSrc="/api/placeholder/40/40" />
                                <p className="text-neutral-300">
                                    The Tech Behind Real-Time Multiplayer Gameplay
                                </p>
                                <div className="flex items-center gap-2 mt-1 text-neutral-400">
                                    <MapPin size={16} />
                                    <span>ESB Seminar Hall 1</span>
                                </div>
                            </li>

                            {/* HARDWARE */}
                            <li>
                                <TrackLabel className="mb-4" track="Hardware" />
                                <SpeakerProfile
                                    name="Ayan S R"
                                    imageSrc={speakerImages.ayanS}
                                />
                                <p className="text-neutral-300">ROS2 & Intelligent Robotics</p>
                                <div className="flex items-center gap-2 mt-1 text-neutral-400">
                                    <MapPin size={16} />
                                    <span>DES Hi-Tech Seminar Hall</span>
                                </div>
                            </li>

                            {/* GENERAL */}
                            <li>
                                <TrackLabel className="mb-4" track="General" />
                                <SpeakerProfile
                                    name="Sandesh Jayarama"
                                    imageSrc={speakerImages.sandeshJayarama}
                                />
                                <p className="text-neutral-300">Identifying Opportunities in Entrepreneurship</p>
                                <div className="flex items-center gap-2 mt-1 text-neutral-400">
                                    <MapPin size={16} />
                                    <span>DES Hi-Tech Seminar Hall</span>
                                </div>
                            </li>

                            {/* ORBITER */}
                            <li>
                                <TrackLabel className="mb-4" track="General" />
                                <div className="flex items-center gap-2 mb-2">
                                    <Trophy size={16} className="text-yellow-500" />
                                    <span className="text-yellow-500 font-semibold">Orbiter Odyssey Challenge</span>
                                </div>
                                <p className="text-neutral-300">Technical Challenge</p>
                                <div className="flex items-center gap-2 text-neutral-400 mt-1">
                                    <Clock size={16} />
                                    <span>2:00 PM – 5:00 PM</span>
                                </div>
                                <div className="flex items-center gap-2 text-neutral-400 mt-1">
                                    <Trophy size={16} />
                                    <span>Prize Pool: ₹10K</span>
                                </div>
                                <div className="flex items-center gap-2 text-neutral-400 mt-1">
                                    <MapPin size={16} />
                                    <span>CSE-AIML Lab ESB</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                ),
            },

            {
                title: "03:00 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Evening Sessions</strong> (3:00 PM – 4:00 PM)
                        </p>

                        <ul className="space-y-6">

                            {/* SOFTWARE */}
                            <li>
                                <TrackLabel className="mb-4" track="Software" />
                                <SpeakerProfile
                                    name="Dr. Kunal Saxena"
                                    imageSrc={speakerImages.drKunalSaxena}
                                />
                                <p className="text-neutral-300">
                                    Data-Driven Digital Marketing: Strategies for the AI-Powered Era
                                </p>
                                <div className="flex items-center gap-2 text-neutral-400 mt-1">
                                    <MapPin size={16} />
                                    <span>Venue TBA</span>
                                </div>
                            </li>

                            {/* HARDWARE */}
                            <li>
                                <TrackLabel className="mb-4" track="Hardware" />
                                <SpeakerProfile
                                    name="Vyshak TM"
                                    imageSrc={speakerImages.vyshakTm}
                                />
                                <p className="text-neutral-300">
                                    The Convergent Chain: Building IoT-Driven, API-Powered Supply Chain Intelligence
                                </p>
                                <div className="flex items-center gap-2 mt-1 text-neutral-400">
                                    <MapPin size={16} />
                                    <span>Venue TBA</span>
                                </div>
                            </li>

                            {/* GENERAL */}
                            <li>
                                <TrackLabel className="mb-4" track="General" />
                                <SpeakerProfile
                                    name="Prasad Chitta"
                                    imageSrc={speakerImages.prasadChitt}
                                />
                                <p className="text-neutral-300">
                                    BFSI Industry Perspective of Responsible AI
                                </p>
                                <div className="flex items-center gap-2 mt-1 text-neutral-400">
                                    <MapPin size={16} />
                                    <span>DES Hi-Tech Seminar Hall</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                ),
            },
        ],
        day2: [
            {
                title: "10:00 AM",
                content: (
                    <div>
                        <h3 className="text-2xl md:text-4xl font-bold dark:text-neutral-100 mb-8">
                            6 December 2025
                        </h3>

                        <p className="mb-5 text-neutral-400">
                            <strong>Parallel Sessions</strong>
                        </p>

                        <ul className="space-y-6 text-neutral-400">

                            {/* SOFTWARE */}
                            <li>
                                <TrackLabel className="mb-4" track="Software" />
                                <SpeakerProfile
                                    name="Dr. Jayaprakash Govindaraj"
                                    imageSrc={speakerImages.drJayaprakash}
                                />
                                <p className="text-neutral-300">
                                    Cybersecurity & AI: Defending the Digital Future
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Clock size={16} />
                                    <span>10:00 AM – 11:00 AM</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <MapPin size={16} />
                                    <span>ESB Seminar Hall 1</span>
                                </div>
                            </li>

                            {/* HARDWARE */}
                            <li>
                                <TrackLabel className="mb-4" track="Hardware" />
                                <SpeakerProfile
                                    name="Shashank N"
                                    imageSrc={speakerImages.shashankN}
                                />
                                <p className="text-neutral-300">
                                    Inside the Silicon: Modern VLSI & SoC Architecture
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Clock size={16} />
                                    <span>10:00 AM – 11:00 AM</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <MapPin size={16} />
                                    <span>ESB Seminar Hall 1</span>
                                </div>
                            </li>

                            {/* GENERAL */}
                            <li>
                                <TrackLabel className="mb-4" track="General" />
                                <div className="flex items-center gap-2 mb-2">
                                    <Trophy size={16} className="text-yellow-500" />
                                    <span className="text-yellow-500 font-semibold">The Great AI Debate</span>
                                </div>
                                <p className="text-neutral-300">Student Debate Competition</p>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>10:00 AM – 12:00 PM</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Trophy size={16} />
                                    <span>Prize Pool: ₹10K</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>Venue TBA</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                ),
            },

            {
                title: "11:30 AM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Midday Sessions</strong> (11:30 AM – 12:30 PM)
                        </p>

                        <ul className="space-y-6 text-neutral-400">

                            {/* SOFTWARE */}
                            <li>
                                <TrackLabel className="mb-4" track="Software" />
                                <SpeakerProfile
                                    name="Anish Kumar"
                                    imageSrc={speakerImages.anishKumar}
                                />
                                <p className="text-neutral-300">
                                    Generative AI: Architecting the Next Wave of Intelligent Systems
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <MapPin size={16} />
                                    <span>ESB Seminar Hall 1</span>
                                </div>
                            </li>

                            {/* HARDWARE */}
                            <li>
                                <TrackLabel className="mb-4" track="Hardware" />
                                <SpeakerProfile
                                    name="Dr. Swetha Amit"
                                    imageSrc={speakerImages.drSwetha}
                                />
                                <p className="text-neutral-300">
                                    Bio Wearables and Antennas
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <MapPin size={16} />
                                    <span>Venue TBA</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                ),
            },

            {
                title: "01:00 PM",
                content: (
                    <p className="text-xl md:text-3xl mb-5 text-neutral-400">
                        <strong>Lunch Break</strong> (1:00 PM – 2:00 PM)
                    </p>
                ),
            },

            {
                title: "01:30 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Workshops & Parallel Sessions</strong>
                        </p>

                        <ul className="space-y-6">

                            {/* SOFTWARE */}
                            <li>
                                <TrackLabel className="mb-4" track="Software" />
                                <SpeakerProfile
                                    name="Anish De"
                                    imageSrc={speakerImages.anishDe}
                                />
                                <p className="text-neutral-300">
                                    Algorithms to Alpha: Coding Excellence, Google Engineering & 7-Figure Trading
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Clock size={16} />
                                    <span>1:30 PM – 2:30 PM</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <MapPin size={16} />
                                    <span>ESB Seminar Hall 1</span>
                                </div>
                            </li>

                            {/* AGENTIC WORKSHOP */}
                            <li>
                                <TrackLabel className="mb-4" track="Workshop" />
                                <SpeakerProfile
                                    name="Rajath Kumar K S"
                                    imageSrc={speakerImages.rajathKumarS}
                                />
                                <p className="text-neutral-300">
                                    Building Intelligent AI Agents: From Concepts to Deployment with N8N
                                </p>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>1:30 PM – 3:30 PM</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>LHC Seminar Hall 1</span>
                                </div>
                            </li>

                            {/* HEALTHCARE WORKSHOP */}
                            <li>
                                <TrackLabel className="mb-4" track="Workshop" />
                                <SpeakerProfile
                                    name="Monica Shityalkar"
                                    imageSrc={speakerImages.monicaShityalkar}
                                />
                                <p className="text-neutral-300">
                                    AI in Healthcare: Predictive Modeling & Diagnostics (Hands-On Lab)
                                </p>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>1:30 PM – 3:30 PM</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>ESB Seminar Hall 1</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                ),
            },

            {
                title: "02:30 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Afternoon Sessions</strong> (2:30 PM – 3:30 PM)
                        </p>

                        <ul className="space-y-6">

                            {/* SOFTWARE */}
                            <li>
                                <TrackLabel className="mb-4" track="Software" />
                                <SpeakerProfile
                                    name="Akshay Joshi"
                                    imageSrc={speakerImages.akshayJoshi}
                                />
                                <p className="text-neutral-300">
                                    The MLOps Manager: Scaling Data Science from Algorithms to Enterprise Value
                                </p>
                                <div className="flex items-center gap-2 mt-1 text-neutral-400">
                                    <MapPin size={16} />
                                    <span>ESB Seminar Hall 1</span>
                                </div>
                            </li>

                            {/* GENERAL */}
                            <li>
                                <TrackLabel className="mb-4" track="General" />
                                <SpeakerProfile
                                    name="Rakshit Prabhakar"
                                    imageSrc={speakerImages.rakshitPrabhakar}
                                />
                                <p className="text-neutral-300">
                                    Hack the Future: Introduction & Career Guide to Cybersecurity
                                </p>
                                <div className="flex items-center gap-2 text-neutral-400 mt-1">
                                    <MapPin size={16} />
                                    <span>Venue TBA</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                ),
            },

            {
                title: "03:30 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Panel Discussion</strong> (3:30 PM – 5:00 PM)
                        </p>
                        <SpeakerProfile
                            name="Nitesh Kumar"
                            imageSrc={speakerImages.niteshPrasad}
                        />
                        <p className="text-neutral-300">Young Engineers & Emerging Tech Panel</p>
                        <div className="flex items-center gap-2 mt-1 text-neutral-400">
                            <MapPin size={16} />
                            <span>Venue TBA</span>
                        </div>
                    </div>
                ),
            },
        ],
    };

    return (
        <div id="timeline" className="relative pt-24 w-full flex flex-col justify-center items-center overflow-clip">
            <Heading title={"Timeline"} subtitle="" />
            <Tabs defaultValue="day1" className="w-full mt-2 flex items-center justify-center">
                <TabsList>
                    <TabsTrigger className="text-lg p-2" value="day1">Day 1</TabsTrigger>
                    <TabsTrigger className="text-lg p-2" value="day2">Day 2</TabsTrigger>
                </TabsList>
                <TabsContent value="day1" className="w-full">
                    <Timeline data={data.day1} />
                </TabsContent>
                <TabsContent value="day2" className="w-full">
                    <Timeline data={data.day2} />
                </TabsContent>
            </Tabs>
            {/* Radial Gradient Background */}
            <div
                className="absolute inset-0 -z-1 opacity-55"
                style={{
                    background: "radial-gradient(125% 125% at 50% 10%, transparent 40%, #6366f1 100%)",
                }}
            />
        </div>
    )
}
