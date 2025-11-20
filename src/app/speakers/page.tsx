import SessionCard from "@/components/session-card";
import Heading from "@/components/shared/heading";
import { prasantMisra, drAnjaniPriyadarshini, vyshakTm, rameshNaiduLaveti, sandeshJayarama, ayanS } from "@/assets/speakers";

export default function SpeakersPage() {
    const speakers = [
        {
            "image": prasantMisra,
            "speakerName": "Dr. Prasant Misra",
            "topic": "Decision Making in Electric Vehicles & the Future of Smart Mobility",
            "shortDescription": "Senior Scientist at TCS Research and Visiting Faculty at IISc Bangalore with 18+ years of experience in Optimization, Smart Mobility, IoT, and EV Systems.",
            "linkedin": "",
            "eventName": "EVs (Keynote)"
        },
        {
            "image": drAnjaniPriyadarshini,
            "speakerName": "Dr. Anjani Priyadarshini",
            "topic": "Quantum AI: Computing Beyond Classical Limits",
            "shortDescription": "Quantum Computing Lead at AWS India and PhD in High Energy Physics from IISc. Expert in computational mathematics, quantum systems, and policy frameworks.",
            "linkedin": "https://www.linkedin.com/in/dr-anjani-priyadarsini",
            "eventName": "Quantum AI"
        },
        {
            "image": "/assets/VimalBastin",
            "speakerName": "Vimal Bastin Edwin Joseph",
            "topic": "Keynote (TBA)",
            "shortDescription": "Industry expert and technology leader delivering insights into emerging systems and innovation-driven tech ecosystems.",
            "linkedin": "https://www.linkedin.com/in/vimal-bastin-edwin-joseph-336a5291/",
            "eventName": "Emerging Tech Keynote"
        },
        {
            "image": vyshakTm,
            "speakerName": "Vyshak T M",
            "topic": "The Convergent Chain: Building IoT-Driven, API-Powered Supply Chain Intelligence",
            "shortDescription": "IoT & Supply Chain specialist focused on sensor data, API architectures, and intelligent decision systems for hardware logistics.",
            "linkedin": "https://www.linkedin.com/in/vyshaktm180903/",
            "eventName": "IoT & AI"
        },
        {
            "image": rameshNaiduLaveti,
            "speakerName": "Ramesh Naidu Laveti",
            "topic": "Trustworthy and Secure AI: Building Safe Systems for the Future",
            "shortDescription": "Expert in Secure & Trustworthy AI frameworks with a focus on adversarial robustness, fairness, governance, and safe deployment of large-scale AI.",
            "linkedin": "https://www.linkedin.com/in/rameshnl/",
            "eventName": "Secure AI Systems"
        },
        {
            "image": "/assets/speakers/kunal-saxena.jpg",
            "speakerName": "Dr. Kunal Saxena",
            "topic": "Data-Driven Digital Marketing: Strategies for the AI-Powered Era",
            "shortDescription": "Digital Marketing Expert with 17 years of experience. Works with Google on AI & Maps. Global speaker, PhD holder, polyglot (30+ languages).",
            "linkedin": "https://in.linkedin.com/in/dr-kunal-saxena-975527106",
            "eventName": "Data Driven Digital Marketing"
        },
        {
            "image": sandeshJayarama,
            "speakerName": "Sandesh Jayarama",
            "topic": "Entrepreneurship & New Business Strategies",
            "shortDescription": "SVP – New Business Initiatives & Strategy at Perfios. Expert in scaling fintech systems and building high-growth digital ecosystems.",
            "linkedin": "https://www.linkedin.com/in/sandeshj",
            "eventName": "Entrepreneurship"
        },
        {
            "image": ayanS,
            "speakerName": "Ayan S.R.",
            "topic": "ROS2 and Intelligent Robotics",
            "shortDescription": "Roboticist, entrepreneur, innovator & Shark Tank India S3 founder of Katidhan. Specializes in autonomous systems and ROS2 robotics.",
            "linkedin": "https://www.linkedin.com/in/ayansr/",
            "eventName": "ROS2 & Robotics"
        }
    ];

    return (
        <div className="py-24 relative px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Heading
                    title='Speakers'
                    subtitle="Know who are our speakers at IEEE CIS Industry Conclave"
                />

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6"
                >
                    {speakers.map((session: any, index: number) => (
                        <div key={`session-${index}`} className={`${[0, 3].includes(index) && "md:col-span-2"} ${index === 3 && "md:row-span-2"}`}>
                            <SessionCard {...session} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}