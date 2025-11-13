import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { paymentVerificationSchema } from '@/lib/validations'
import { verifyPayment } from '@/lib/razorpay'
import { sendConfirmationEmail } from '@/lib/sendgrid'
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
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }
    
    // Update payment record
    const payment = await prisma.payment.updateMany({
      where: {
        registrationId: validatedData.registrationId,
        razorpayOrderId: validatedData.razorpay_order_id,
      },
      data: {
        razorpayPaymentId: validatedData.razorpay_payment_id,
        razorpaySignature: validatedData.razorpay_signature,
        status: 'SUCCESS'
      }
    })

    // Mark registration as complete only after successful payment
    await prisma.registration.update({
      where: { id: validatedData.registrationId },
      data: { isPaymentCompleted: true }
    })
    
    if (payment.count === 0) {
      return NextResponse.json(
        { error: 'Payment record not found' },
        { status: 404 }
      )
    }
    
    // Get registration details for email
    const registration = await prisma.registration.findUnique({
      where: { id: validatedData.registrationId }
    })
    
if (registration) {
      // Send confirmation email (non-blocking)
      sendConfirmationEmail(
        registration.email,
        registration.fullName,
        registration.id
      ).catch((emailError) => {
        console.error('Email sending failed (non-critical):', emailError)
        // Don't fail the payment if email fails
      })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully'
    })
    
  } catch (error) {
    console.error('Payment verification error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}