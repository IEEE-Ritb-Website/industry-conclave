"use client";

import Heading from "@/components/shared/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineSection() {
    const data = {
        day1: [
            {
                title: "09:30 AM",
                content: (
                    <div>
                        <h3 className="text-2xl md:text-4xl font-bold dark:text-neutral-100 mb-8">5 December 2025</h3>
                        <p className="mb-5 text-neutral-400">
                            <strong>Inauguration & Keynote Speeches</strong>
                        </p>
                        {/* <p className="mb-5 text-neutral-400">
                            Speakers: Prashant Mishra, Dr. Anjani <br />
                            Venue: ESB Seminar Hall 1
                        </p> */}
                    </div>
                ),
            },
            {
                title: "11:30 AM",
                content: (
                    <div>
                        <p className="mb-5 text-2xl text-neutral-400">
                            <strong>Tea Break</strong> (11:30 AM – 12:00 PM)
                        </p>
                    </div>
                ),
            },
            {
                title: "12:00 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Parallel Sessions</strong>
                        </p>

                        {/* <ul className="text-neutral-400 space-y-3">
                            <li>
                                <strong>Software Track:</strong> Ramesh Naidu <br />
                                Venue: DES Hi-Tech Seminar Hall
                            </li>
                            <li>
                                <strong>General Track:</strong> Placement Coordinator Talk <br />
                                Venue: ESB Seminar Hall 2
                            </li>
                            <li>
                                <strong>Hardware Track:</strong> Siddanth S. Iyer <br />
                                Time: 12:00 PM – 1:00 PM
                            </li>
                        </ul> */}
                    </div>
                ),
            },
            {
                title: "01:00 PM",
                content: (
                    <div>
                        <p className="text-xl md:text-3xl mb-5 text-neutral-400">
                            <strong>Lunch Break</strong> (1:00 PM – 2:00 PM)
                        </p>
                    </div>
                ),
            },
            {
                title: "02:00 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Afternoon Sessions</strong>
                        </p>

                        {/* <ul className="text-neutral-400 space-y-3">
                            <li>
                                <strong>Software Track:</strong> Sourav <br />
                                Venue: ESB Seminar Hall 1
                            </li>
                            <li>
                                <strong>General Track:</strong> Entrepreneurship Talk <br />
                                Venue: ESB Seminar Hall 2
                            </li>
                            <li>
                                <strong>Hardware Track:</strong> ROS2 Talk <br />
                                Time: 2–3 PM, Venue: DES
                            </li>
                            <li>
                                <strong>General Activity:</strong> Tech Detective <br />
                                Time: 2–5 PM, Venue: CSE-AIML Lab ESB
                            </li>
                        </ul> */}
                    </div>
                ),
            },
            {
                title: "03:00 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Evening Session</strong>
                        </p>

                        {/* <ul className="text-neutral-400 space-y-3">
                            <li>
                                <strong>General:</strong> BFSI – Prasad Chitta (Venue: DES)
                            </li>
                            <li>
                                <strong>Software:</strong> Data in Digital Marketing
                            </li>
                            <li>
                                <strong>Hardware:</strong> IoT Talk
                            </li>
                        </ul> */}
                    </div>
                ),
            },
            {
                title: "04:00 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Ending Session</strong>
                        </p>

                        {/* <ul className="text-neutral-400 space-y-3">
                            <li>
                                <strong>Software:</strong> Hrishikesh
                            </li>
                            <li>
                                <strong>Hardware:</strong> Hardware Session
                            </li>
                            <li>
                                <strong>General:</strong> Gaurav Pathak
                            </li>
                        </ul> */}
                    </div>
                ),
            },
        ],

        day2: [
            {
                title: "10:00 AM",
                content: (
                    <div>
                        <h3 className="text-2xl md:text-4xl font-bold dark:text-neutral-100 mb-8">6 December 2025</h3>

                        {/* <ul className="text-neutral-400 space-y-3">
                            <li>
                                <strong>Software Track:</strong> Cyber Security <br />
                                Venue: ESB Seminar Hall 1
                            </li>
                            <li>
                                <strong>General:</strong> AI Debate <br />
                                Time: 10 AM – 12 PM, Venue: ESB Seminar Hall 2
                            </li>
                            <li>
                                <strong>Hardware:</strong> SoC Talk <br />
                                Venue: DES Seminar Hall
                            </li>
                        </ul> */}
                    </div>
                ),
            },

            {
                title: "11:00 AM",
                content: (
                    <div>
                        <p className="mb-5 text-2xl text-neutral-400">
                            <strong>Tea Break</strong> (11:00 AM – 11:30 AM)
                        </p>
                    </div>
                ),
            },

            {
                title: "11:30 AM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Midday Sessions</strong>
                        </p>

                        {/* <ul className="text-neutral-400 space-y-3">
                            <li>
                                <strong>Software:</strong> Gen AI – HCL Tech <br />
                                Venue: ESB Seminar Hall 1
                            </li>
                            <li>
                                <strong>Hardware:</strong> Session TBA <br />
                                Venue: ESB Seminar Hall 2
                            </li>
                            <li>
                                <strong>General:</strong> Session TBA <br />
                                Venue: DES Seminar Hall
                            </li>
                        </ul> */}
                    </div>
                ),
            },

            {
                title: "12:30 PM",
                content: (
                    <div>
                        <p className="text-xl md:text-3xl mb-5 text-neutral-400">
                            <strong>Lunch Break</strong> (12:30 PM – 1:30 PM)
                        </p>
                    </div>
                ),
            },

            {
                title: "01:30 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Afternoon Workshops & Sessions</strong>
                        </p>

                        {/* <ul className="text-neutral-400 space-y-3">
                            <li>
                                <strong>Software:</strong> API Session <br />
                                Venue: ESB Seminar Hall 2
                            </li>
                            <li>
                                <strong>Hardware:</strong> Session TBA <br />
                                Venue: ESB Seminar Hall 1
                            </li>
                            <li>
                                <strong>General:</strong> General Session <br />
                                Venue: DES Seminar Hall
                            </li>
                            <li>
                                <strong>Software Workshop:</strong> AI Agent Workshop <br />
                                Time: 1:30–3:30 PM, Venue: LHC Seminar Hall 1
                            </li>
                            <li>
                                <strong>General Workshop:</strong> AI in Healthcare Workshop <br />
                                Time: 1:30–3:30 PM, Venue: ISE Lab 1 & 2
                            </li>
                        </ul> */}
                    </div>
                ),
            },

            {
                title: "02:30 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Software Track:</strong> AIML Talk <br />
                            {/* Venue: ESB Seminar Hall 1 */}
                        </p>
                        {/* <p className="mb-5 text-neutral-400">
                            <strong>Hardware Session:</strong> TBA
                        </p> */}
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
                        {/* <p className="mb-5 text-neutral-400">
                            Venue: ESB Seminar Hall 1 <br />
                            Track: General
                        </p> */}
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
