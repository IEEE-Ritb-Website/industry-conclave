import { NextRequest, NextResponse } from 'next/server'
import { findRegistrationByEmail, createRegistration, createPayment } from '@/lib/mongo'
import { registrationSchema } from '@/lib/validations'
import { createOrder } from '@/lib/razorpay'
import { RegistrationTypes, RegistrationPricing } from '@/types'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Validate input
    const validatedData = registrationSchema.parse(body)

    // Check if email already exists
    const existingRegistration = await findRegistrationByEmail(validatedData.email)
    if (existingRegistration) {
      return NextResponse.json(
        { error: 'This email is already registered. Please use a different email.' },
        { status: 400 }
      )
    }

    // Get amount from pricing configuration (server-side only)
    const amount = RegistrationPricing[validatedData.registrationType as RegistrationTypes]

    if (!amount) {
      return NextResponse.json(
        { error: 'Invalid registration type' },
        { status: 400 }
      )
    }

    // Create Razorpay order first
    const order = await createOrder(amount, 'INR')

    // Create registration document
    const registrationInput: any = {
      fullName: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      registrationType: validatedData.registrationType,
      attendingWorkshop: validatedData.attendingWorkshop
    }
    if ('collegeName' in validatedData) registrationInput.collegeName = validatedData.collegeName
    if ('organizationName' in validatedData) registrationInput.organizationName = validatedData.organizationName
    if ('ieeeMemberId' in validatedData) registrationInput.ieeeMemberId = validatedData.ieeeMemberId

    const registration = await createRegistration(registrationInput)

    // Create payment record
    await createPayment(
      registration._id!.toString(),
      amount,
      'INR',
      (order as any).id
    )

    return NextResponse.json({
      success: true,
      registrationId: registration._id!.toString(),
      orderId: (order as any).id,
      amount: (order as any).amount,
      currency: (order as any).currency
    })

  } catch (error) {
    console.error('Registration error:', error)

    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`)
      return NextResponse.json(
        { error: `Please check your input: ${errorMessages.join(', ')}` },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
