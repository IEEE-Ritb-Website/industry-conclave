"use client";

import { Suspense, useEffect, useState } from 'react'
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

  // Validate registration immediately if ID exists
  useEffect(() => {
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
    <div className="min-h-screen py-24 px-4 h-full flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            {isConfirming ? (
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            ) : confirmationError ? (
              <div className="w-10 h-10 text-4xl text-red-600">⚠️</div>
            ) : (
              // <CheckCircle className="w-10 h-10 text-green-600" />
              <AlertCircleIcon className='w-10 h-10 text-yellow-400' />
            )}
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {isConfirming ? 'Confirming Payment...' : confirmationError ? 'Confirmation Issue' : 'Registration Under Review!'}
          </h1>
          {!isConfirming && !confirmationError && (
            <>
              <p className="text-lg text-yellow-600 font-medium">
                📧 Your registration is under review and our team will send you a confirmation email within 48 hours.
              </p>
            </>
          )}
          {confirmationError && (
            <p className="text-lg text-red-600 font-medium">
              {confirmationError}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}