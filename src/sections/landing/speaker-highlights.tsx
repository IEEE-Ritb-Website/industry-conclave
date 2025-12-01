"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import Heading from "@/components/shared/heading";
import { CONFIG } from "@/configs/config";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useRouter } from "next/navigation";
import { speakersList } from "@/data/speakers-data";

export default function SpeakerHighlights() {
    const topSpeakers = speakersList.slice(0, 5);
    const router = useRouter();

    return (
        <div className="py-20 relative px-4 sm:px-6 lg:px-8">
            <Heading title="Top Speakers" subtitle={`These are our top Speakers at ${CONFIG.name}`} />
            <div className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 
        gap-4 sm:gap-6 max-w-6xl mx-auto mt-6
      ">
                {topSpeakers.map((speaker, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                        <Card
                            className="
                bg-white/10 backdrop-blur-xl border-white/20 
                p-4 rounded-2xl text-center shadow-lg 
                hover:shadow-xl hover:bg-white/20 
                transition-all duration-300 cursor-pointer h-full
                group
              "
                        >
                            <div className="relative w-20 h-20 sm:w-24 sm:h-28 mx-auto mb-4">
                                <Image
                                    src={speaker.image}
                                    alt={speaker.speakerName}
                                    fill
                                    className="object-cover rounded-full border-2 border-white/30 
                             group-hover:border-white/60 transition"
                                />
                            </div>

                            <h3 className="text-lg font-semibold text-white">
                                {speaker.speakerName}
                            </h3>

                            <p className="text-sm text-white/70 mt-1 leading-tight">
                                {speaker.topic}
                            </p>
                        </Card>
                    </motion.div>
                ))}
            </div>
            <div className="flex items-center justify-center mt-6">
                <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                    onClick={() => router.push("/speakers")}
                >
                    Explore Speakers
                </HoverBorderGradient>
            </div>
        </div>
    );
}