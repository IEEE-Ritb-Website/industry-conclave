import { NextResponse } from 'next/server'
import { findRegistrationById, setRegistrationCheckInStatus } from '@/lib/mongo'

export async function POST(request: Request) {
  try {
    const { registrationId, action } = await request.json()

    if (!registrationId || !action) {
      return NextResponse.json(
        { error: 'Registration ID and action are required' },
        { status: 400 }
      )
    }

    // Validate action
    const validActions = ['checkedIn', 'takenLunch', 'hadTea']
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }

    // Check if registration exists
    const registration = await findRegistrationById(registrationId)
    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      )
    }

    // Update the check-in status
    const result = await setRegistrationCheckInStatus(registrationId, action)

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: 'Failed to update check-in status' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update check-in status:', error)
    return NextResponse.json(
      { error: 'Failed to update check-in status' },
      { status: 500 }
    )
  }
}