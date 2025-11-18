"use client";

import Heading from "@/components/shared/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineSection() {
    const data = {
        day1: [
            {
                title: "09:00 AM",
                content: (
                    <div>
                        <h3 className="text-xl dark:text-neutral-100 mb-8">5 December 2025</h3>
                        <p className="mb-5 text-neutral-400">
                            <strong>Registration & Breakfast</strong>
                        </p>
                        <p className="mb-5 text-neutral-400">
                            Welcome to Industry Conclave 2025
                        </p>
                    </div>
                ),
            },
            {
                title: "10:00 AM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Opening Keynote</strong>
                        </p>
                        <p className="mb-5 text-neutral-400">
                            Keynote address by industry leaders
                        </p>
                    </div>
                ),
            },
            {
                title: "11:30 AM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Parallel Tracks Begin</strong>
                        </p>
                        <p className="mb-5 text-neutral-400">
                            Choose from multiple technical sessions
                        </p>
                    </div>
                ),
            },
            {
                title: "01:00 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Lunch Break</strong>
                        </p>
                        <p className="mb-5 text-neutral-400">
                            Network with fellow developers
                        </p>
                    </div>
                ),
            },
            {
                title: "02:00 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Workshops & Sessions</strong>
                        </p>
                        <p className="mb-5 text-neutral-400">
                            Deep dive into FOSS technologies
                        </p>
                    </div>
                ),
            },
            {
                title: "06:00 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Networking Dinner</strong>
                        </p>
                        <p className="mb-5 text-neutral-400">
                            Connect with the community
                        </p>
                    </div>
                ),
            },
        ],
        day2: [
            {
                title: "09:00 AM",
                content: (
                    <div>
                        <h3 className="text-xl dark:text-neutral-100 mb-8">6 December 2025</h3>
                        <p className="mb-5 text-neutral-400">
                            <strong>Registration & Breakfast</strong>
                        </p>
                        <p className="mb-5 text-neutral-400">
                            Welcome to Industry Conclave 2025
                        </p>
                    </div>
                ),
            },
            {
                title: "10:00 AM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Opening Keynote</strong>
                        </p>
                        <p className="mb-5 text-neutral-400">
                            Keynote address by industry leaders
                        </p>
                    </div>
                ),
            },
            {
                title: "11:30 AM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Parallel Tracks Begin</strong>
                        </p>
                        <p className="mb-5 text-neutral-400">
                            Choose from multiple technical sessions
                        </p>
                    </div>
                ),
            },
            {
                title: "01:00 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Lunch Break</strong>
                        </p>
                        <p className="mb-5 text-neutral-400">
                            Network with fellow developers
                        </p>
                    </div>
                ),
            },
            {
                title: "02:00 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Workshops & Sessions</strong>
                        </p>
                        <p className="mb-5 text-neutral-400">
                            Deep dive into FOSS technologies
                        </p>
                    </div>
                ),
            },
            {
                title: "06:00 PM",
                content: (
                    <div>
                        <p className="mb-5 text-neutral-400">
                            <strong>Networking Dinner</strong>
                        </p>
                        <p className="mb-5 text-neutral-400">
                            Connect with the community
                        </p>
                    </div>
                ),
            },
        ],
    };


    return (
        <div id="timeline" className="relative pt-24 w-full flex flex-col justify-center items-center overflow-clip">
            <Heading title="Timeline" subtitle="" />
            <Tabs defaultValue="day1" className="w-full mt-2 flex items-center justify-center">
                <TabsList>
                    <TabsTrigger value="day1">Day 1</TabsTrigger>
                    <TabsTrigger value="day2">Day 2</TabsTrigger>
                </TabsList>
                <TabsContent value="day1" className="w-full">
                    <Timeline data={data.day1} />
                </TabsContent>
                <TabsContent value="day2" className="w-full">
                    <Timeline data={data.day2} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
