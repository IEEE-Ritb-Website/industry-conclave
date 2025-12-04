'use client'

import Heading from '@/components/shared/heading'

export default function RegisterPage() {
  return (
    <div className="py-24 relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <Heading title='Registrations Closed' subtitle="Thank you for your interest in our event" />
        
        <div className="mt-12 p-8 bg-gray-900 rounded-lg border border-gray-800">
          <h2 className="text-3xl font-bold text-white mb-4">
            Registration for this event has now closed
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            We appreciate your interest in joining us. Unfortunately, we are no longer accepting new registrations for this event.
          </p>
          <p className="text-gray-400">
            If you have any questions or need assistance, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  )
}