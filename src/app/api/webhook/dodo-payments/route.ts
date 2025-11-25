// src/app/api/webhook/dodo-payments/route.ts
import { Webhooks } from '@dodopayments/nextjs'
import { createRegistration, findRegistrationByEmail } from '@/lib/mongo'
import { sendConfirmationEmail } from '@/lib/email'

export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY!,
  
  onPaymentSucceeded: async (payload: any) => {
    console.log('Full payment payload:', JSON.stringify(payload, null, 2))
    
    try {
      // Extract metadata from various possible locations
      let metadata = payload.data?.metadata || payload.metadata || payload.data?.object?.metadata
      console.log('Extracted metadata:', metadata)
      
      if (!metadata || !metadata.tempRegistrationId) {
        console.error('No metadata or tempRegistrationId found in payment payload')
        return
      }
      
      console.log('Processing payment for tempRegistrationId:', metadata.tempRegistrationId)
      
      // Extract registration data from metadata
      const registrationData = {
        fullName: metadata.fullName,
        email: metadata.email,
        phone: metadata.phone,
        registrationType: metadata.registrationType,
        attendingWorkshop: metadata.attendingWorkshop === 'true' || metadata.attendingWorkshop === true,
        collegeName: metadata.collegeName || undefined,
        organizationName: metadata.organizationName || undefined,
        ieeeMemberId: metadata.ieeeMemberId || undefined,
      }
      
      console.log('Registration data from metadata:', registrationData)
      
      // Verify all required fields are present
      if (!registrationData.fullName || !registrationData.email || !registrationData.phone) {
        console.error('Missing required registration data in metadata:', registrationData)
        return
      }
      
      // Check if registration already exists (prevent duplicate entries)
      const existingRegistration = await findRegistrationByEmail(registrationData.email)
      if (existingRegistration && existingRegistration.isPaymentCompleted) {
        console.log('Registration already completed for:', registrationData.email)
        return
      }
      
      // NOW create the registration in the database (only after payment succeeds)
      try {
        const registration = await createRegistration({
          ...registrationData,
          isPaymentCompleted: true, // Mark as paid immediately
        })
        
        console.log('Registration created successfully:', registration._id)
        console.log('Registration email:', registration.email)
        
        // Send confirmation email
        try {
          await sendConfirmationEmail(
            registration.email,
            registration.fullName,
            registration._id!.toString(),
            registration.registrationType,
          )
          console.log('Confirmation email sent to:', registration.email)
        } catch (emailError) {
          console.error('Email sending failed (non-critical):', emailError)
          // Don't fail the whole operation if email fails
        }
        
        console.log('Payment processing completed successfully')
        
      } catch (createError) {
        console.error('Error creating registration:', createError)
        throw createError
      }
      
    } catch (error) {
      console.error('Error processing successful payment:', error)
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
      // You might want to implement a retry mechanism or alert system here
    }
  },
  
  onPaymentFailed: async (payload: any) => {
    console.log('Payment failed:', payload)
    const metadata = payload.data?.metadata || payload.metadata
    
    if (metadata?.email) {
      console.log('Payment failed for email:', metadata.email)
      // Optional: Send payment failed email notification
    }
  },
  
  onPaymentCancelled: async (payload: any) => {
    console.log('Payment cancelled:', payload)
    const metadata = payload.data?.metadata || payload.metadata
    
    if (metadata?.email) {
      console.log('Payment cancelled for email:', metadata.email)
      // Optional: Send payment cancelled email notification
    }
  },
  
  onPayload: async (payload: any) => {
    console.log('Webhook payload received:', JSON.stringify(payload, null, 2))
  }
});