import { NextRequest, NextResponse } from 'next/server'
import { findRegistrationByEmail, createRegistration } from '@/lib/mongo'
import { registrationSchema } from '@/lib/validations'
import { RegistrationPricing, PaymentProductId } from '@/types'
import { z } from 'zod'
import DodoPayments from 'dodopayments'

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError)
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    // console.log('Registration request body:', body)

    // Validate input
    let validatedData;
    try {
      validatedData = registrationSchema.parse(body)
    } catch (validationError) {
      console.error('Validation error:', validationError)
      if (validationError instanceof z.ZodError) {
        const errorMessages = validationError.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`)
        return NextResponse.json(
          { error: `Validation failed: ${errorMessages.join(', ')}` },
          { status: 400 }
        )
      }
      return NextResponse.json(
        { error: 'Validation failed' },
        { status: 400 }
      )
    }

    // Check if email already exists (prevent duplicate registrations)
    try {
      const existingRegistration = await findRegistrationByEmail(validatedData.email)
      if (existingRegistration) {
        return NextResponse.json(
          { error: 'This email is already registered. Please check your email for payment instructions or contact support if you need help.' },
          { status: 400 }
        )
      }
    } catch (dbError) {
      console.error('Database error checking existing registration:', dbError)
      return NextResponse.json(
        { error: 'Database connection error. Please try again later.' },
        { status: 500 }
      )
    }

    // Get amount from pricing configuration
    const amount = RegistrationPricing[validatedData.registrationType]
    if (!amount) {
      return NextResponse.json(
        { error: 'Invalid registration type' },
        { status: 400 }
      )
    }

    // Create registration in database
    let registration;
    try {
      registration = await createRegistration({
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        registrationType: validatedData.registrationType,
        attendingWorkshop: validatedData.attendingWorkshop,
        collegeName: 'collegeName' in validatedData ? validatedData.collegeName : undefined,
        organizationName: 'organizationName' in validatedData ? validatedData.organizationName : undefined,
        ieeeMemberId: 'ieeeMemberId' in validatedData ? validatedData.ieeeMemberId : undefined,
        isPaymentCompleted: false,
      })
    } catch (dbError) {
      console.error('Database error creating registration:', dbError)
      return NextResponse.json(
        { error: 'Failed to create registration. Please try again later.' },
        { status: 500 }
      )
    }

    const registrationId = registration._id!.toString()

    // Create checkout session using Dodo Payments SDK
    try {
      console.log('Creating checkout session for product:', PaymentProductId[validatedData.registrationType])

      const client = new DodoPayments({
        bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
        environment: process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode',
      })

      const checkoutSessionResponse = await client.checkoutSessions.create({
        product_cart: [{
          product_id: PaymentProductId[validatedData.registrationType],
          quantity: 1
        }],
        customer: {
          email: validatedData.email,
          name: validatedData.fullName,
        },
        billing_address: {
          country: 'IN',
        },
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?registrationId=${registrationId}`,
        billing_currency: 'INR'
      })

      console.log('Checkout session created:', checkoutSessionResponse.session_id)

      // The SDK response should include the checkout_url
      if (!checkoutSessionResponse.checkout_url) {
        console.error('No checkout_url in SDK response:', checkoutSessionResponse)
        return NextResponse.json(
          { error: 'Invalid checkout session response' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        checkout_url: checkoutSessionResponse.checkout_url,
        registrationId: registrationId,
        amount: amount,
        currency: 'INR'
      })

    } catch (checkoutError) {
      console.error('Checkout session creation error:', checkoutError)
      return NextResponse.json(
        { error: 'Failed to create payment session. Please try again.' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Unexpected registration error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}