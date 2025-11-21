import SessionCard from "@/components/session-card";
import Heading from "@/components/shared/heading";
import { prasantMisra, drAnjaniPriyadarshini, vyshakTm, rameshNaiduLaveti, sandeshJayarama, ayanS } from "@/assets/speakers";

export default function SpeakersPage() {
    const speakers = [
        {
            image: prasantMisra,
            speakerName: "Dr. Prasant Misra",
            topic: "Decision Making in Electric Vehicles & the Future of Smart Mobility",
            shortDescription:
                "Senior Scientist @ TCS Research and Visiting Faculty @ IISc. ACM Distinguished Speaker, TR35 India, Marie Curie Fellow. Expert in Optimization, Smart Mobility, IoT, and EV Systems.",
            linkedin: "https://www.linkedin.com/in/prasantmisra/",
            eventName: "EVs (Keynote)"
        },
        {
            image: drAnjaniPriyadarshini,
            speakerName: "Dr. Anjani Priyadarshini",
            topic: "Quantum AI: Computing Beyond Classical Limits",
            shortDescription:
                "Quantum Technologies Lead at AWS India with a PhD in High Energy Physics from IISc. Expert in computational mathematics, theoretical physics, and quantum ecosystems.",
            linkedin:
                "https://www.linkedin.com/in/dr-anjani-priyadarsini?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            eventName: "QuantumAI"
        },
        {
            image: "/assets/VimalBastin",
            speakerName: "Vimal Bastin Edwin Joseph",
            topic: "Keynote (Topic TBD)",
            shortDescription:
                "Senior engineering leader and keynote speaker with experience across large-scale systems, innovation, and emerging technologies.",
            linkedin:
                "https://www.linkedin.com/in/vimal-bastin-edwin-joseph-336a5291/",
            eventName: "Keynote"
        },
        {
            image: vyshakTm,
            speakerName: "Vyshak T M",
            topic:
                "The Convergent Chain: Building IoT-Driven, API-Powered Supply Chain Intelligence",
            shortDescription:
                "IoT & API Developer and Supply Chain Analyst. Specializes in building intelligent, data-driven logistics systems and connected hardware APIs.",
            linkedin: "https://www.linkedin.com/in/vyshaktm180903/",
            eventName: "IoT & AI"
        },
        {
            image: rameshNaiduLaveti,
            speakerName: "Ramesh Naidu Laveti",
            topic:
                "Trustworthy and Secure AI: Building Safe Systems for the Future",
            shortDescription:
                "Associate Director/Scientist-F @ C-DAC. Expert in AI for Health, Security, HPC analytics, and hybrid ML systems with focus on robust & ethical AI.",
            linkedin: "https://www.linkedin.com/in/rameshnl/",
            eventName: "Secure AI Systems"
        },
        {
            image: "/assets/speakers/kunal-saxena.jpg",
            speakerName: "Dr. Kunal Saxena",
            topic:
                "Data-Driven Digital Marketing: Strategies for the AI-Powered Era",
            shortDescription:
                "Global Digital Marketing Leader with 17+ years experience. Works with Google on AI & Maps. Speaker at NASA, Harvard, MIT, IITs, and IIMs.",
            linkedin:
                "https://in.linkedin.com/in/dr-kunal-saxena-975527106?utm_source=share&utm_medium=member_mweb&utm_campaign=share_via&utm_content=profile",
            eventName: "Data Driven Digital Marketing"
        },
        {
            image: sandeshJayarama,
            speakerName: "Sandesh Jayarama",
            topic: "Entrepreneurship & New Business Strategy",
            shortDescription:
                "SVP – New Business Initiatives & Strategy at Perfios. Former McKinsey consultant with deep experience in fintech, digital banking & enterprise architecture.",
            linkedin:
                "https://www.linkedin.com/in/sandeshj?utm_source=share_via&utm_content=profile&utm_medium=member_android",
            eventName: "Entrepreneurship"
        },
        {
            image: ayanS,
            speakerName: "Ayan S.R.",
            topic: "ROS2 & Intelligent Robotics",
            shortDescription:
                "Founder of Katidhan, Shark Tank India S3. Builds scalable sustainable robotics & IoT systems. Innovation strategist across design, engineering & business.",
            linkedin: "https://www.linkedin.com/in/ayansr/",
            eventName: "ROS2"
        },
        {
            image: "/assets/hrishikesh-haritas.jpg",
            speakerName: "Hrishikesh Haritas",
            topic: "Explainable AI & Federated Learning",
            shortDescription:
                "Research Associate at IISc working on Explainable AI, Federated Learning & GNNs. BE in AI & ML with strong research background in transparent & privacy-preserving AI systems.",
            linkedin: "",
            eventName: "AI Research"
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
                        <div key={`session-${index}`} className={``}>
                            <SessionCard {...session} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}