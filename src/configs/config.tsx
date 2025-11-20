import { Github, Linkedin, Instagram, Link, Facebook, BookOpen, Users, Building, Handshake } from "lucide-react";

export const CONFIG = {
    name: 'Industry Conclave',
    shortDescription: 'Gain Industry Insights and Network with Professionals at Industry Conclave 2025',
    eventDetails: {
        dates: "5-6 December 2025",
        location: 'MSRIT, Bengaluru',
        coordinators: [
            {
                name: 'Priyanshu Bhojwani',
                phone: '+91 00000 00000',
            },
            {
                name: 'Navya Ullas Rai',
                phone: '+91 00000 00000',
            },
        ]
    },
    logo: "",   // TODO: to be set
    profile: {
        image: 'https://res.cloudinary.com/ddrv7lqrg/image/upload/v1760040051/ieee-logo-square_lzpsoz.jpg',
        email: 'ieeeritb@gmail.com',
        socials: [
            {
                name: "Instagram",
                url: "https://www.instagram.com/ieeeritb",
                icon: Instagram,
                label: "@ieeeritb",
            },
            {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/ieee-ritb/",
                icon: Linkedin,
                label: "ieee-ritb",
            },
            {
                name: "Facebook",
                url: "https://www.facebook.com/ieeeritb",
                icon: Facebook,
                label: "ieeeritb",
            },
            {
                name: 'Github',
                icon: Github,
                url: 'https://github.com/ieee-ritb',
                label: 'ieee-ritb'
            },
            {
                name: "Website",
                url: "https://ieee.ritb.in",
                icon: Link,
                label: "ieee.ritb.in",
            },
        ]
    },
    sponsors: [
        { name: "TechCorp", tier: "Platinum" },
        { name: "InnovateLabs", tier: "Gold" },
        { name: "DevHub", tier: "Gold" },
        { name: "CloudSync", tier: "Silver" },
        { name: "OpenStack", tier: "Silver" },
        { name: "CodeFlow", tier: "Silver" },
    ],
    agenda: [
        {
            title: "Technical Workshops",
            description: "Hands-on learning sessions covering modern tools, frameworks, and emerging technologies.",
        },
        {
            title: "Expert Tech Talks",
            description: "Industry leaders and practitioners share insights, best practices, and real-world engineering learnings.",
        },
        {
            title: "Panel Discussions",
            description: "Engaging multi-speaker conversations exploring challenges, innovations, and future directions in tech.",
        },
        {
            title: "Product & Demo Showcase",
            description: "Live demos of tools, platforms, and projects built by developers, startups, and communities.",
        },
        {
            title: "Founder & Developer Fireside Chats",
            description: "Informal conversations with innovators discussing their journeys, failures, breakthroughs, and lessons.",
        },
        {
            title: "Networking Session",
            description: "Connect with developers, founders, students, and industry professionals to exchange ideas and opportunities.",
        },
    ],
    features: [
        {
            icon: Building,
            title: "Industry Connection",
            description: "Bridge the gap between academia and industry",
        },
        {
            icon: Users,
            title: "Community",
            description: "Connect with professionals and students across the nation",
        },
        {
            icon: BookOpen,
            title: "Learning",
            description: "Technical workshops, keynotes, and expert panel discussions",
        },
        {
            icon: Handshake,
            title: "Collaboration",
            description: "Foster innovation and build meaningful connections",
        },
    ],
    faqs: [
        {
            question: "When and where is the IEEE CIS Industry Conclave 2025?",
            answer:
                "The IEEE CIS Industry Conclave 2025 will be held on December 5–6, 2025, at Ramaiah Institute of Technology, Bangalore.",
        },
        {
            question: "How do I register for the conclave?",
            answer:
                'You can register through our official website by clicking the "Register Now" button.',
        },
        {
            question: "What is included in the registration?",
            answer:
                "Your registration grants access to the full conclave experience, including: Access to all technical sessions, hands-on workshops, official event merchandise, certificate of participation, meals during the event, and the IEEE networking session.",
        },
        {
            question: "Can I submit a proposal for the conclave?",
            answer:
                "Yes — we are currently accepting only sponsorship and stall proposals for the event. Organizations, startups, and companies can apply through the Sponsorship & Exhibition Portal on our website.",
        },
        {
            question: "What is your refund policy?",
            answer:
                "All ticket purchases are non-refundable.",
        },
        {
            question: "Who can attend the conclave?",
            answer:
                "The event is open to students, professionals, researchers, tech enthusiasts, startups, and companies interested in AI, ML, Cloud, Robotics, IoT, VLSI, and emerging technologies.",
        },
    ],
    timeline: {
        day1: [
            {
                time: "09:00 AM",
                title: "Registration & Breakfast",
                description: "Welcome to Industry Conclave 2025",
            },
            {
                time: "10:00 AM",
                title: "Opening Keynote",
                description: "Keynote address by industry leaders",
            },
            {
                time: "11:30 AM",
                title: "Parallel Tracks Begin",
                description: "Choose from multiple technical sessions",
            },
            {
                time: "01:00 PM",
                title: "Lunch Break",
                description: "Network with fellow developers",
            },
            {
                time: "02:00 PM",
                title: "Workshops & Sessions",
                description: "Deep dive into FOSS technologies",
            },
            {
                time: "06:00 PM",
                title: "Networking Dinner",
                description: "Connect with the community",
            },
        ],
        day2: [
            {
                time: "09:00 AM",
                title: "Day 2 Registration",
                description: "Welcome back to Industry Conclave",
            },
            {
                time: "10:00 AM",
                title: "Advanced Workshops",
                description: "Deep technical sessions and hands-on labs",
            },
            {
                time: "12:30 PM",
                title: "Lightning Talks",
                description: "Quick insights from community members",
            },
            {
                time: "01:30 PM",
                title: "Lunch Break",
                description: "Casual networking and discussions",
            },
            {
                time: "03:00 PM",
                title: "Panel Discussions",
                description: "Industry experts discuss open source trends",
            },
            {
                time: "05:00 PM",
                title: "Closing Ceremony",
                description: "Wrap up and announcements",
            },
        ],
    },
}