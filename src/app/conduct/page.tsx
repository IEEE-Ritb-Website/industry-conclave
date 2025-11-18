'use client'

import Heading from '@/components/shared/heading'
import { CONFIG } from '@/configs/config'
import { Heart, Users, Shield, AlertTriangle, MessageSquare, Ban } from 'lucide-react'

const conductSections = [
    {
        icon: Heart,
        title: 'Be Respectful',
        description: 'Treat everyone with dignity, kindness, and professionalism',
        guidelines: [
            'Respect diverse backgrounds and perspectives',
            'Use welcoming and inclusive language',
            'Accept constructive criticism gracefully',
            'Focus on what\'s best for the community',
            'Show empathy towards fellow attendees',
            'Value different opinions and experiences'
        ]
    },
    {
        icon: Users,
        title: 'Foster Inclusivity',
        description: 'Create a welcoming environment for all participants',
        guidelines: [
            'Welcome attendees regardless of experience level',
            'Encourage questions and active participation',
            'Make space for underrepresented voices',
            'Use gender-neutral and inclusive language',
            'Be mindful of cultural differences',
            'Support first-time attendees and students'
        ]
    },
    {
        icon: MessageSquare,
        title: 'Professional Communication',
        description: 'Maintain professional and constructive dialogue',
        guidelines: [
            'Engage in thoughtful discussions and debates',
            'Provide constructive feedback respectfully',
            'Avoid personal attacks or inflammatory language',
            'Listen actively before responding',
            'Keep conversations relevant to the event',
            'Report concerns to organizers promptly'
        ]
    },
    {
        icon: Ban,
        title: 'Unacceptable Behavior',
        description: 'Actions that violate our community standards',
        guidelines: [
            'Harassment, intimidation, or discrimination',
            'Offensive comments related to identity or beliefs',
            'Unwelcome sexual attention or advances',
            'Deliberate disruption of sessions or workshops',
            'Photography or recording without consent',
            'Advocating for or encouraging harmful behavior'
        ]
    },
    {
        icon: Shield,
        title: 'Safety & Security',
        description: 'Ensuring a safe environment for all participants',
        guidelines: [
            'Follow venue safety protocols and guidelines',
            'Wear your event badge at all times',
            'Report suspicious activity to security',
            'Respect personal space and boundaries',
            'Emergency exits clearly marked and accessible',
            'Medical support available throughout the event'
        ]
    },
    {
        icon: AlertTriangle,
        title: 'Reporting & Enforcement',
        description: 'How we handle violations and ensure accountability',
        guidelines: [
            'Report incidents to organizers immediately',
            'Confidential reporting channels available',
            'All reports taken seriously and investigated',
            'Violations may result in removal from event',
            'No refunds for expelled attendees',
            'Serious violations reported to IEEE and authorities'
        ]
    }
]

export default function CodeOfConductPage() {
    return (
        <div className="py-12 relative px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Heading
                    title='Code of Conduct'
                    subtitle="Building a respectful and inclusive community at IEEE CIS Industry Conclave"
                />

                <div className="mt-8 mb-12 p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <h3 className="text-lg font-bold mb-3 text-green-900 dark:text-green-100">Our Commitment</h3>
                    <p className="text-green-800 dark:text-green-200 mb-3">
                        IEEE CIS Industry Conclave is dedicated to providing a harassment-free, inclusive, and professional
                        experience for all participants, regardless of age, gender, gender identity and expression, sexual
                        orientation, disability, physical appearance, body size, race, ethnicity, religion, or technology choices.
                    </p>
                    <p className="text-green-800 dark:text-green-200">
                        We expect all attendees, speakers, sponsors, volunteers, and organizers to uphold these values
                        throughout the event and in all event-related spaces, both online and offline.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {conductSections.map((section, index) => {
                        const Icon = section.icon
                        return (
                            <div
                                key={index}
                                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 rounded-lg bg-primary/10">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                                        <p className="text-sm text-muted-foreground">{section.description}</p>
                                    </div>
                                </div>
                                <ul className="space-y-2 ml-16">
                                    {section.guidelines.map((guideline, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <span className="text-primary mt-1">•</span>
                                            <span>{guideline}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <h3 className="text-lg font-bold mb-3 text-yellow-900 dark:text-yellow-100">Need Help?</h3>
                        <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                            If you experience or witness a Code of Conduct violation, please contact:
                        </p>
                        <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
                            <li>• <strong>Email:</strong> {CONFIG.profile.email}</li>
                            <li>• <strong>In Person:</strong> Visit the registration desk</li>
                            <li>• <strong>Response Time:</strong> Within 1 hour during event</li>
                        </ul>
                    </div>

                    <div className="p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <h3 className="text-lg font-bold mb-3 text-blue-900 dark:text-blue-100">Anonymous Reporting</h3>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                            We provide a confidential reporting system for those who prefer anonymity:
                        </p>
                        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                            <li>• Anonymous online form available 24/7</li>
                            <li>• Drop boxes at registration and help desks</li>
                            <li>• Third-party mediators for sensitive matters</li>
                            <li>• All reports handled with strict confidentiality</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 text-center p-6 border border-border rounded-lg">
                    <h3 className="text-xl font-bold mb-3">By Participating, You Agree</h3>
                    <p className="text-muted-foreground mb-4 max-w-3xl mx-auto">
                        All attendees are expected to comply with this Code of Conduct at all event venues, online platforms,
                        and event-related social activities. Organizers reserve the right to take appropriate action, including
                        expulsion from the event without refund, for anyone violating these policies.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        This Code of Conduct is adapted from the{' '}
                        <a href="https://www.contributor-covenant.org/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            Contributor Covenant
                        </a>
                        {' '}and IEEE Code of Ethics.
                    </p>
                </div>
            </div>
        </div>
    )
}