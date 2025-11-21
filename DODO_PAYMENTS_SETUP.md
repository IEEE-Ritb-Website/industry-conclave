# Dodo Payments Setup Guide

## To complete the payment integration, you need to:

### 1. Create Products in Dodo Payments Dashboard

1. Go to your Dodo Payments dashboard
2. Navigate to Products > Create Product
3. Create a product with:
   - **Product ID**: `registration_fee`
   - **Name**: "Event Registration Fee"
   - **Description**: "Registration fee for conclave event"
   - **Price**: ₹199 (or your desired amount)
   - **Currency**: INR
   - **Type**: One-time payment

### 2. Update Environment Variables

Make sure these are set in your `.env.local`:

```env
DODO_PAYMENTS_API_KEY=your_live_or_test_key
DODO_PAYMENTS_WEBHOOK_KEY=your_webhook_secret
DODO_PAYMENTS_RETURN_URL=http://localhost:3000/success
DODO_PAYMENTS_ENVIRONMENT=test_mode  # or live_mode
```

### 3. Configure Webhooks

In Dodo Payments dashboard, set webhook URL to:
`https://yourdomain.com/api/webhook/dodo-payments`

### 4. Test Integration

Once products are created, the payment flow will work:
1. User fills registration form
2. Gets redirected to Dodo Payments checkout
3. Completes payment
4. Webhook creates registration in database
5. User gets confirmation email

## Current Status

The registration form is ready and will work once Dodo Payments products are set up.