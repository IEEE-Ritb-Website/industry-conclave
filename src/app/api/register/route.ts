import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { registrationSchema } from '@/lib/validations'
import { createOrder } from '@/lib/razorpay'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = registrationSchema.parse(body)
    
    // Check if email already exists
    const existingRegistration = await prisma.registration.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingRegistration) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }
    
    // Determine amount based on registration type
    const getAmount = (type: string) => {
      switch (type) {
        case 'COLLEGE_STUDENT':
          return 350
        case 'IEEE_STUDENT':
          return 250
        case 'ORGANIZATION':
          return 500
        default:
          return 350
      }
    }

    const amount = getAmount(validatedData.registrationType)
    
    // Create Razorpay order first
    const order = await createOrder(amount, 'INR')
    
    // Create temporary registration record (not confirmed until payment)
    const registration = await prisma.registration.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        registrationType: validatedData.registrationType,
        collegeName: 'collegeName' in validatedData ? validatedData.collegeName : null,
        organizationName: 'organizationName' in validatedData ? validatedData.organizationName : null,
        ieeeMemberId: 'ieeeMemberId' in validatedData ? validatedData.ieeeMemberId : null,
        attendingWorkshop: validatedData.attendingWorkshop,
        isPaymentCompleted: false,
      }
    })
    
    // Create payment record
    await prisma.payment.create({
      data: {
        registrationId: registration.id,
        amount: amount,
        currency: 'INR',
        razorpayOrderId: (order as any).id,
        status: 'PENDING'
      }
    })
    
    return NextResponse.json({
      success: true,
      registrationId: registration.id,
      orderId: (order as any).id,
      amount: (order as any).amount,
      currency: (order as any).currency
    })
    
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}