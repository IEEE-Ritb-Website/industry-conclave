# Coupon Code System Implementation Summary

## Updated Schema

### CouponCode Interface
```typescript
export interface CouponCode {
    couponCode: string
    referralType: string[] // Organization names (e.g., ["iisc", "msrit"]) - empty means applicable to everyone
    maxLimit: number // Maximum uses per coupon code
    maxNumber?: number // Maximum registrations for this organization (if referralType exists)
    discount: number // decimal value of discount (e.g., 0.1 for 10%)
}
```

### RegistrationDoc Interface
```typescript
type RegistrationDoc = {
  // ... existing fields ...
  couponCode?: string
  referralOrg?: string // Store the organization used for this registration
  finalAmount?: number
  // ... other fields
}
```

## Key Features Implemented

### 1. Organization-Based Coupons
- `referralType` now contains organization names (e.g., "iisc", "msrit", "ieee_bangalore")
- Empty `referralType` array means coupon is available to everyone
- `maxNumber` limits total registrations for organization-specific coupons

### 2. URL Parameters Support
- `coupon` parameter: Coupon code to auto-apply
- `referral` parameter: Organization name for validation

### 3. Validation Logic
- Checks if coupon exists
- Validates organization match (if coupon is organization-specific)
- Enforces `maxNumber` limit for organization coupons
- Enforces `maxLimit` for overall coupon usage
- Provides clear error messages

### 4. Test Coupon Codes
```javascript
const testCouponCodes = [
  {
    couponCode: 'EARLY2025',
    referralType: [], // Available to everyone
    maxLimit: 100,
    discount: 0.1 // 10% discount
  },
  {
    couponCode: 'IISC2025',
    referralType: ['iisc'], // Only for IISC organization
    maxLimit: 50,
    maxNumber: 25, // Maximum 25 registrations for IISC
    discount: 0.25 // 25% discount
  },
  {
    couponCode: 'MSRIT2025',
    referralType: ['msrit'], // Only for MSRIT organization
    maxLimit: 100,
    maxNumber: 50, // Maximum 50 registrations for MSRIT
    discount: 0.5 // 50% discount
  }
];
```

## Usage Examples

### URL Examples
```
# General coupon (available to everyone)
http://localhost:3000/register/college_students?coupon=EARLY2025

# Organization-specific coupon
http://localhost:3000/register/college_students?coupon=IISC2025&referral=iisc

# Invalid organization (will show error)
http://localhost:3000/register/college_students?coupon=IISC2025&referral=msrit
```

### Edge Cases Handled

1. **No coupon in URL**: System works normally without coupon
2. **Coupon without referral**: Works for general coupons, fails for org-specific
3. **Referral without coupon**: System works normally, referral is stored
4. **Invalid coupon**: Shows clear error message
5. **Organization mismatch**: Shows which organizations are valid
6. **Max number reached**: Shows "coupon no longer available" message
7. **Max limit exceeded**: Shows "usage limit exceeded" message

## Database Collections

### couponCodes Collection
```javascript
{
  couponCode: "IISC2025",
  referralType: ["iisc"],
  maxLimit: 50,
  maxNumber: 25,
  discount: 0.25,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### couponCodeUsage Collection
```javascript
{
  couponCode: "IISC2025",
  registrationId: "64a1b2c3d4e5f6789012345",
  usedAt: ISODate
}
```

### registrations Collection
```javascript
{
  // ... existing fields ...
  couponCode: "IISC2025",
  referralOrg: "iisc",
  finalAmount: 112.50,
  isPaymentCompleted: true
}
```

## API Endpoints

### POST /api/validate-coupon
```javascript
{
  couponCode: "IISC2025",
  registrationType: "college_students",
  originalPrice: 149,
  referralOrg: "iisc"
}
```

### POST /api/register
```javascript
{
  // ... registration data ...
  couponCode: "IISC2025",
  referralOrg: "iisc",
  finalAmount: 112.50
}
```

## Seeding Command
```bash
npm run seed:coupons
```

This will clear existing coupons and insert test coupons with organization-based restrictions.