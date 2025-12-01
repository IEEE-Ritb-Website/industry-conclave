"use client";

import { Suspense, useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { AlertCircleIcon, Loader2 } from 'lucide-react';

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    }>
      <SuccessPageInner />
    </Suspense>
  )
}

function SuccessPageInner() {
  const searchParams = useSearchParams()
  const registrationId = searchParams.get('registrationId')
  const [isConfirming, setIsConfirming] = useState(false)
  const [confirmationError, setConfirmationError] = useState<string | null>(null)
  const [registrationNotFound, setRegistrationNotFound] = useState(false)
  const [registration, setRegistration] = useState<any>(null)
  const [isValidating, setIsValidating] = useState(true)
  const hasValidated = useRef(false)

  // Validate registration immediately if ID exists
  useEffect(() => {
    // Prevent multiple validations in development mode
    if (hasValidated.current) return
    hasValidated.current = true

    const validateRegistration = async () => {
      if (!registrationId) {
        setRegistrationNotFound(true)
        setIsValidating(false)
        return
      }

      try {
        const response = await fetch(`/api/validate-registration?registrationId=${registrationId}`)
        const result = await response.json()

        if (!result.success) {
          setRegistrationNotFound(true)
          setIsValidating(false)
          return
        }

        // Registration is valid, set the registration data
        setRegistration(result.registration)
        setRegistrationNotFound(false)
        setIsValidating(false)
      } catch (error) {
        console.error('Error validating registration:', error)
        setRegistrationNotFound(true)
        setIsValidating(false)
      }
    }

    if (registrationId) {
      validateRegistration()
    } else {
      setRegistrationNotFound(true)
      setIsValidating(false)
    }
  }, [registrationId])
  // Show loading state while validating
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center h-full py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
            <h1 className="text-4xl font-bold text-gray-50 mb-2">Validating Registration...</h1>
            <p className="text-gray-100 text-lg">Please wait while we verify your registration details.</p>
          </div>
        </div>
      </div>
    )
  }

  // Show 404 if registration not found
  if (registrationNotFound && !isValidating) {
    // Redirect to root route instead of showing 404
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
    return null
  }

  return (
    <div className="min-h-screen py-24 px-6 flex flex-col items-center justify-center bg-transparent">
      <div className="max-w-3xl mx-auto text-center space-y-14">

        {/* Icon */}
        <div className="w-24 h-24 rounded-3xl bg-yellow-500/10 backdrop-blur-md flex items-center justify-center mx-auto">
          {isConfirming ? (
            <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
          ) : (
            <AlertCircleIcon className="w-12 h-12 text-yellow-300" />
          )}
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-white">
            We’ve got you — your registration is now under review.
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed max-w-xl mx-auto">
            We’re doing a quick <span className="text-yellow-300 font-medium">manual verification</span>
            {" "}to ensure we bring together the <span className="text-white font-medium">right participants</span>
            {" "}for this event.
          </p>
        </div>

        {/* Info section */}
        <div className="space-y-5 max-w-xl mx-auto text-gray-300 leading-relaxed">

          <p className="text-base">
            You don’t need to do anything — we’ll send you a
            <span className="text-yellow-200 font-medium"> confirmation email within 48 hours</span>.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed">
            This review helps us maintain a meaningful and high-quality experience for all attendees.
            Thank you for your patience — we appreciate you.
          </p>
        </div>

        {confirmationError && (
          <p className="text-lg text-red-500">
            {confirmationError}
          </p>
        )}
      </div>
    </div>
  )
}