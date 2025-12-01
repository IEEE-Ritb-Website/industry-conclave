import { NextResponse } from 'next/server'
import { setConfirmationSent, findRegistrationById } from '@/lib/mongo'
import { sendConfirmationEmail } from '@/lib/email'
import { RegistrationTypes } from '@/types'

export async function POST(request: Request) {
  try {
    const { registrationId } = await request.json()

    if (!registrationId) {
      return NextResponse.json(
        { error: 'Registration ID is required' },
        { status: 400 }
      )
    }

    // Get registration details
    const registration = await findRegistrationById(registrationId)
    
    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      )
    }

    if (!registration.isPaymentCompleted) {
      return NextResponse.json(
        { error: 'Payment not completed for this registration' },
        { status: 400 }
      )
    }

    // Send confirmation email
    await sendConfirmationEmail(
      registration.email,
      registration.fullName,
      registrationId,
      registration.registrationType as RegistrationTypes
    )

    // Update confirmation status in database
    await setConfirmationSent(registrationId)

    return NextResponse.json({ 
      success: true, 
      message: 'Confirmation email sent successfully' 
    })

  } catch (error) {
    console.error('Error sending confirmation email:', error)
    return NextResponse.json(
      { error: 'Failed to send confirmation email' },
      { status: 500 }
    )
  }
}