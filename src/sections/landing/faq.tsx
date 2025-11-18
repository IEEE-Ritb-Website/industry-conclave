"use client";

import Heading from "@/components/shared/heading";
import { Card } from "@/components/ui/card";
import { CONFIG } from "@/configs/config";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)
    return (
        <section id="faq" className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <Heading title="Frequently Asked Questions" subtitle="" />

                <div className="space-y-3 mt-6">
                    {CONFIG.faqs.map((faq, index) => (
                        <Card
                            key={index}
                            className="scroll-reveal border-border overflow-hidden"
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full p-6 flex items-center justify-between hover:bg-card/50 transition-colors text-left"
                            >
                                <h3 className="font-semibold text-foreground">{faq.question}</h3>
                                <ChevronDown
                                    size={20}
                                    className={`text-accent fshrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-6 text-muted-foreground border-t border-border pt-4">{faq.answer}</div>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
