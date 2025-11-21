import { NextRequest, NextResponse } from 'next/server'
import { setRegistrationPaymentCompleted, getRegistrationById } from '@/lib/mongo'
import { sendConfirmationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { registrationId } = await request.json()

    if (!registrationId) {
      return NextResponse.json(
        { error: 'Registration ID is required' },
        { status: 400 }
      )
    }

    console.log('Confirming payment for registration:', registrationId)

    // Update registration to completed
    const updateResult = await setRegistrationPaymentCompleted(registrationId)
    console.log('Update result:', updateResult)

    // Get the registration
    const registration = await getRegistrationById(registrationId)
    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      )
    }

    // Send confirmation email
    try {
      await sendConfirmationEmail(
        registration.email,
        registration.fullName,
        registration._id!.toString()
      )
      console.log('Confirmation email sent to:', registration.email)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Payment confirmed and email sent'
    })

  } catch (error) {
    console.error('Payment confirmation error:', error)
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    )
  }
}