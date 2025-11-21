import { NextRequest, NextResponse } from 'next/server'
import { updatePaymentStatus, setRegistrationPaymentCompleted, getRegistrationById } from '@/lib/mongo'
import { paymentVerificationSchema } from '@/lib/validations'
import { verifyPayment } from '@/lib/razorpay'
import { sendConfirmationEmail } from '@/lib/email'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Validate input
    const validatedData = paymentVerificationSchema.parse(body)

    // Verify payment signature
    const isValidSignature = verifyPayment(
      validatedData.razorpay_order_id,
      validatedData.razorpay_payment_id,
      validatedData.razorpay_signature
    )

    if (!isValidSignature) {
      return NextResponse.json(
        { error: 'Payment verification failed. Please contact support if amount was deducted from your account.' },
        { status: 400 }
      )
    }

    // Update payment record
    const paymentUpdate = await updatePaymentStatus(
      validatedData.registrationId,
      validatedData.razorpay_order_id,
      validatedData.razorpay_payment_id,
      validatedData.razorpay_signature
    )

    // Mark registration as complete after successful payment
    await setRegistrationPaymentCompleted(validatedData.registrationId)

    // Get registration details for email (if available)
    const registration = await getRegistrationById(validatedData.registrationId)

    if (registration) {
      sendConfirmationEmail(
        registration.email,
        registration.fullName,
        registration._id?.toString() ?? validatedData.registrationId
      ).catch((emailError) => {
        console.error('Email sending failed (non-critical):', emailError)
      })
    }

    const success = (paymentUpdate?.modifiedCount ?? paymentUpdate?.matchedCount ?? 0) > 0

    if (!success) {
      return NextResponse.json(
        { error: 'Payment record not found. Please contact support if amount was deducted.' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully'
    })

  } catch (error) {
    console.error('Payment verification error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid payment data received. Please contact support.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}
