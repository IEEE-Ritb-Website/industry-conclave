import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Define coupon codes with their discount types and values
const COUPONS = {
  'EARLY2025': {
    type: 'percentage',
    value: 10, // 10% discount
    description: '10% early bird discount'
  },
  'STUDENT50': {
    type: 'fixed',
    value: 50, // ₹50 fixed discount
    description: '₹50 student discount'
  },
  'IEEE2025': {
    type: 'percentage', 
    value: 15, // 15% discount
    description: '15% IEEE member discount'
  },
  'FLASH30': {
    type: 'percentage',
    value: 30, // 30% discount
    description: '30% flash sale discount'
  }
} as const

const couponValidationSchema = z.object({
  couponCode: z.string().min(1, 'Coupon code is required'),
  registrationType: z.enum([
    'non_ieee_professional',
    'non_ieee_students', 
    'ieee_professionals',
    'ieee_students',
    'college_students'
  ]),
  originalPrice: z.number().min(0, 'Original price must be positive')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = couponValidationSchema.parse(body)
    
    const { couponCode, registrationType, originalPrice } = validatedData
    
    // Check if coupon exists (case insensitive)
    const normalizedCouponCode = couponCode.toUpperCase().trim()
    const coupon = COUPONS[normalizedCouponCode as keyof typeof COUPONS]
    
    if (!coupon) {
      return NextResponse.json({
        valid: false,
        error: 'Invalid coupon code'
      }, { status: 400 })
    }
    
    // Calculate discounted price
    let discountedPrice: number
    
    if (coupon.type === 'percentage') {
      discountedPrice = Math.round(originalPrice * (1 - coupon.value / 100))
    } else {
      discountedPrice = Math.max(0, originalPrice - coupon.value)
    }
    
    // Ensure discounted price is not negative
    if (discountedPrice < 0) {
      discountedPrice = 0
    }
    
    return NextResponse.json({
      valid: true,
      couponCode: normalizedCouponCode,
      originalPrice,
      discountedPrice,
      discountAmount: originalPrice - discountedPrice,
      discountDescription: coupon.description,
      message: `Coupon applied: ${coupon.description}`
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        valid: false,
        error: `Validation failed: ${error.issues.map(issue => issue.message).join(', ')}`
      }, { status: 400 })
    }
    
    console.error('Coupon validation error:', error)
    return NextResponse.json({
      valid: false,
      error: 'Failed to validate coupon code'
    }, { status: 500 })
  }
}