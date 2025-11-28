import { NextRequest, NextResponse } from 'next/server'
import { findRegistrationByEmail, createRegistration } from '@/lib/mongo'
import { registrationSchema } from '@/lib/validations'
import { DiscountedRegistraionPricing } from '@/types'
import { z } from 'zod'
import { sendVerificationPendingEmail } from '@/lib/email'

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

    // Get amount from pricing configuration or use final amount from coupon
    let amount: number
    if (validatedData.finalAmount && validatedData.finalAmount > 0) {
      amount = validatedData.finalAmount
    } else {
      amount = DiscountedRegistraionPricing[validatedData.registrationType]
    }
    
    if (!amount) {
      return NextResponse.json(
        { error: 'Invalid registration type or amount' },
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
        howDidYouHearAboutUs: validatedData.howDidYouHearAboutUs,
        paymentScreenshot: validatedData.paymentScreenshot,
        couponCode: validatedData.couponCode,
        finalAmount: amount,
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

    // Send verification pending email with all details
    try {
      await sendVerificationPendingEmail(
        validatedData.email,
        validatedData.fullName,
        registrationId,
        validatedData.registrationType,
        {
          phone: validatedData.phone,
          collegeName: 'collegeName' in validatedData ? validatedData.collegeName : undefined,
          organizationName: 'organizationName' in validatedData ? validatedData.organizationName : undefined,
          ieeeMemberId: 'ieeeMemberId' in validatedData ? validatedData.ieeeMemberId : undefined,
          attendingWorkshop: validatedData.attendingWorkshop,
          howDidYouHearAboutUs: validatedData.howDidYouHearAboutUs,
          couponCode: validatedData.couponCode,
          finalAmount: amount
        }
      )
    } catch (emailError) {
      console.error('Failed to send verification pending email:', emailError)
      // Continue with registration even if email fails
    }

    // Return success response for manual payment
    return NextResponse.json({
      success: true,
      registrationId: registrationId,
      amount: amount,
      currency: 'INR',
      message: 'Registration successful. Please complete payment and upload screenshot.'
    })

  } catch (error) {
    console.error('Unexpected registration error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}