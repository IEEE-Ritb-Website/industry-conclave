'use client'

import Heading from '@/components/shared/heading'
import { CONFIG } from '@/configs/config'
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react'

const privacySections = [
    {
        icon: Database,
        title: 'Information We Collect',
        description: 'Personal data including name, email, institution, and payment details',
        details: [
            'Full name and contact information',
            'Educational institution and student ID',
            'IEEE membership details (if applicable)',
            'Payment and transaction information',
            'Event preferences and dietary requirements',
            'Communication history with organizers'
        ]
    },
    {
        icon: Lock,
        title: 'How We Use Your Data',
        description: 'Your information helps us deliver an exceptional event experience',
        details: [
            'Process registrations and payments',
            'Send event updates and important announcements',
            'Manage workshop and session registrations',
            'Provide certificates and event materials',
            'Improve future events based on feedback',
            'Maintain attendee database for IEEE records'
        ]
    },
    {
        icon: Shield,
        title: 'Data Protection',
        description: 'Industry-standard security measures to protect your information',
        details: [
            'Encrypted data transmission and storage',
            'Secure payment gateway integration',
            'Limited access to authorized personnel only',
            'Regular security audits and updates',
            'Compliance with data protection regulations',
            'Secure backup and recovery systems'
        ]
    },
    {
        icon: Eye,
        title: 'Information Sharing',
        description: 'We only share data with trusted partners when necessary',
        details: [
            'IEEE CIS chapter for membership verification',
            'Payment processors for transaction handling',
            'Event sponsors (only anonymized statistics)',
            'Venue partners for logistics coordination',
            'Certificate providers for credential issuance',
            'We never sell your personal information'
        ]
    },
    {
        icon: UserCheck,
        title: 'Your Rights',
        description: 'You have full control over your personal information',
        details: [
            'Access your stored personal data anytime',
            'Request corrections to inaccurate information',
            'Delete your account and associated data',
            'Opt-out of promotional communications',
            'Withdraw consent for data processing',
            'Export your data in a portable format'
        ]
    },
    {
        icon: Mail,
        title: 'Contact & Updates',
        description: 'Stay informed about privacy policy changes',
        details: [
            `Email us at ${CONFIG.profile.email}`,
            'Policy updates will be communicated via email',
            'Last updated: January 2025',
            'Review changes before each event',
            'Questions answered within 48 hours',
            'Annual privacy policy review and updates'
        ]
    }
]

export default function PrivacyPolicyPage() {
    return (
        <div className="py-12 relative px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Heading
                    title='Privacy Policy'
                    subtitle="Your privacy and data security are our top priorities at IEEE CIS Industry Conclave"
                />

                <div className="mt-8 mb-12 p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                        <strong>Effective Date:</strong> January 1, 2025 |
                        <strong className="ml-4">Last Updated:</strong> January 1, 2025
                    </p>
                    <p className="mt-2 text-blue-800 dark:text-blue-200">
                        This Privacy Policy explains how IEEE CIS Industry Conclave collects, uses, and protects your personal information
                        when you register for and attend our event.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {privacySections.map((section, index) => {
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
                                    {section.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <span className="text-primary mt-1">•</span>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-12 p-6 bg-muted rounded-lg">
                    <h3 className="text-lg font-bold mb-3">Cookie Policy</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        We use essential cookies to ensure the website functions properly. Analytics cookies help us understand
                        how visitors interact with our site to improve the experience.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        You can manage cookie preferences in your browser settings. Disabling certain cookies may affect site functionality.
                    </p>
                </div>

                <div className="mt-12 text-center p-6 border border-border rounded-lg">
                    <h3 className="text-xl font-bold mb-3">Questions About Our Privacy Policy?</h3>
                    <p className="text-muted-foreground mb-4">
                        We're committed to transparency and protecting your privacy. If you have any concerns or questions,
                        please don't hesitate to reach out.
                    </p>
                    <a
                        href={`mailto:${CONFIG.profile.email}`}
                        className="text-primary hover:underline font-medium"
                    >
                        {CONFIG.profile.email}
                    </a>
                </div>
            </div>
        </div>
    )
}