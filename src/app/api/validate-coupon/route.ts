import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { validateCouponCode } from '@/lib/mongo'
import { RegistrationTypes } from '@/types'

const couponValidationSchema = z.object({
  couponCode: z.string().min(1, 'Coupon code is required'),
  registrationType: z.enum(Object.values(RegistrationTypes)),
  originalPrice: z.number().min(0, 'Original price must be positive'),
  referralOrg: z.string().optional(),
  email: z.string().optional().refine((val) => !val || val === '' || z.string().email().safeParse(val).success, {
    message: "Invalid email address"
  })
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = couponValidationSchema.parse(body)
    
    const { couponCode, registrationType, originalPrice, referralOrg, email } = validatedData
    
    // Validate coupon code against database
    const validation = await validateCouponCode(couponCode, registrationType, referralOrg, email)
    
    if (!validation.valid) {
      return NextResponse.json({
        valid: false,
        error: validation.error
      }, { status: 400 })
    }
    
    // Calculate discounted price using decimal discount
    const discount = validation.discount!
    const discountedPrice = Math.round(originalPrice * (1 - discount))
    
    // Ensure discounted price is not negative
    const finalDiscountedPrice = Math.max(0, discountedPrice)
    
    return NextResponse.json({
      valid: true,
      couponCode: couponCode.toUpperCase(),
      originalPrice,
      discountedPrice: finalDiscountedPrice,
      discountAmount: originalPrice - finalDiscountedPrice,
      discountPercentage: Math.round(discount * 100),
      message: `Coupon applied: ${Math.round(discount * 100)}% discount`
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