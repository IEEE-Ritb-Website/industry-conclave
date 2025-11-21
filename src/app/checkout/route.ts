// src/app/checkout/route.ts
import { Checkout } from '@dodopayments/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'

async function handleCheckoutRequest(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Checkout API request body:', body)

    const client = new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
      environment: process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode',
    })

    const checkoutSessionResponse = await client.checkoutSessions.create(body)

    console.log('Checkout session created:', checkoutSessionResponse.session_id)

    return NextResponse.json({
      checkout_url: checkoutSessionResponse.checkout_url,
      session_id: checkoutSessionResponse.session_id
    })
  } catch (error) {
    console.error('Checkout API error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

// Handle POST requests
export async function POST(request: NextRequest) {
  // Check if this is an API call (has JSON content type)
  const contentType = request.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return handleCheckoutRequest(request)
  }

  // Otherwise, use the SDK for browser requests
  return Checkout({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
    returnUrl: process.env.DODO_PAYMENTS_RETURN_URL,
    environment: process.env.DODO_PAYMENTS_ENVIRONMENT as "live_mode" | "test_mode" | undefined,
    type: "session",
  })(request)
}

export const GET = Checkout({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  returnUrl: process.env.DODO_PAYMENTS_RETURN_URL,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT as "live_mode" | "test_mode" | undefined,
  type: "static",
});