import { NextRequest, NextResponse } from 'next/server'
import { getRegistrationById } from '@/lib/mongo'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const registrationId = searchParams.get('registrationId')

  if (!registrationId) {
    return NextResponse.json(
      { error: 'Registration ID is required' },
      { status: 400 }
    )
  }

  try {
    const registration = await getRegistrationById(registrationId)
    
    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      registration: {
        id: registration._id?.toString(),
        fullName: registration.fullName,
        email: registration.email,
        registrationType: registration.registrationType,
        isPaymentCompleted: registration.isPaymentCompleted,
        finalAmount: registration.finalAmount,
        couponCode: registration.couponCode,
        referralOrg: registration.referralOrg,
        collegeName: registration.collegeName,
        organizationName: registration.organizationName,
        ieeeMemberId: registration.ieeeMemberId,
        attendingWorkshop: registration.attendingWorkshop,
        createdAt: registration.createdAt
      }
    })
  } catch (error) {
    console.error('Error validating registration:', error)
    return NextResponse.json(
      { error: 'Failed to validate registration' },
      { status: 500 }
    )
  }
}