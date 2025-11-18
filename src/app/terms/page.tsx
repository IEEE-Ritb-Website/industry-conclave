'use client'

import Heading from '@/components/shared/heading'
import { CONFIG } from '@/configs/config'
import { FileText, ShieldCheck, CreditCard, UserCheck, Lock, AlertTriangle } from 'lucide-react'

const termsSections = [
    {
        icon: FileText,
        title: 'Acceptance of Terms',
        description: 'By using our platform, you agree to abide by all policies outlined below.',
        guidelines: [
            'These Terms govern your access and use of our website and services',
            'You must read and accept these Terms before using the platform',
            'Use of the platform signifies agreement to all policies',
            'If you disagree with any part of the Terms, discontinue use immediately',
            'We may update these Terms periodically',
            'Continued use after updates indicates acceptance'
        ]
    },
    {
        icon: UserCheck,
        title: 'User Responsibilities',
        description: 'Every user must act responsibly and comply with platform rules.',
        guidelines: [
            'Provide accurate and up-to-date information during registration',
            'Ensure account security and confidentiality',
            'Do not misuse or exploit the platform',
            'Avoid activities that may disrupt platform functionality',
            'Comply with local laws while using the service',
            'Report suspicious or unauthorized activity promptly'
        ]
    },
    {
        icon: ShieldCheck,
        title: 'Intellectual Property',
        description: 'All content and materials are protected under applicable IP laws.',
        guidelines: [
            'All trademarks, logos, and content belong to their respective owners',
            'You may not copy, distribute, or modify platform materials',
            'Unauthorized use of content is strictly prohibited',
            'Users may not claim ownership of platform-generated content',
            'Content may only be used as permitted by these Terms',
            'Requests for permissions should be directed to our support team'
        ]
    },
    {
        icon: CreditCard,
        title: 'Payments & Billing',
        description: 'Details regarding purchases, subscriptions, and refunds.',
        guidelines: [
            'All payments must be completed using approved methods',
            'Pricing may change with prior notice',
            'Refunds are subject to platform-specific refund policies',
            'Unauthorized transactions should be reported immediately',
            'Invoices and receipts will be sent via email',
            'Failed payments may lead to service interruptions'
        ]
    },
    {
        icon: Lock,
        title: 'Privacy & Data Usage',
        description: 'How we collect, use, and safeguard your personal information.',
        guidelines: [
            'We collect only necessary user data',
            'Your information is processed according to our Privacy Policy',
            'We do not sell or rent personal data',
            'Data is stored securely with modern encryption practices',
            'You may request deletion of your personal data',
            'Cookies may be used to improve user experience'
        ]
    },
    {
        icon: AlertTriangle,
        title: 'Limitation of Liability',
        description: 'Our responsibilities and limitations regarding service usage.',
        guidelines: [
            'Platform is provided “as is” without warranties',
            'We are not liable for service outages or interruptions',
            'Users are responsible for their own actions and uploaded content',
            'We are not liable for third-party service integrations',
            'Damages arising from misuse are solely user responsibility',
            'Some limitations may not apply based on jurisdiction'
        ]
    }
]

export default function TermsOfServicePage() {
    return (
        <div className="py-12 relative px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Heading
                    title='Terms of Service'
                    subtitle="Your rights, responsibilities, and conditions for using our platform"
                />

                <div className="mt-8 mb-12 p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <h3 className="text-lg font-bold mb-3 text-green-900 dark:text-green-100">Agreement Overview</h3>
                    <p className="text-green-800 dark:text-green-200 mb-3">
                        By accessing or using our platform, you agree to comply with all Terms outlined here.
                        These Terms apply to all users, including visitors, account holders, and anyone interacting
                        with our services or products.
                    </p>
                    <p className="text-green-800 dark:text-green-200">
                        Failure to follow these Terms may result in suspension, restricted access, or permanent
                        termination of your account.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {termsSections.map((section, index) => {
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
                        <h3 className="text-lg font-bold mb-3 text-yellow-900 dark:text-yellow-100">Support & Questions</h3>
                        <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                            If you have any questions or concerns about these Terms, contact:
                        </p>
                        <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
                            <li>• <strong>Email:</strong> {CONFIG.profile.email}</li>
                            <li>• <strong>Support Hours:</strong> Monday–Friday, 10 AM – 6 PM</li>
                            <li>• <strong>Response Time:</strong> Within 48 hours</li>
                        </ul>
                    </div>

                    <div className="p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <h3 className="text-lg font-bold mb-3 text-blue-900 dark:text-blue-100">Policy Updates</h3>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                            We may update these Terms from time to time:
                        </p>
                        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                            <li>• Users will be notified of major changes via email</li>
                            <li>• Updated Terms take effect immediately upon posting</li>
                            <li>• Continued use implies acceptance of revised Terms</li>
                            <li>• You are responsible for reviewing Terms periodically</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 text-center p-6 border border-border rounded-lg">
                    <h3 className="text-xl font-bold mb-3">By Using Our Platform, You Agree</h3>
                    <p className="text-muted-foreground mb-4 max-w-3xl mx-auto">
                        Your access and use of our services confirm that you have read, understood,
                        and agreed to these Terms of Service. Violations may result in account limitations,
                        removal, or legal action where applicable.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        For more details, review our{' '}
                        <a href="/privacy-policy" className="text-primary hover:underline">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}
