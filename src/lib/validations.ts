import { RegistrationTypes } from "@/types"
import { z } from "zod"

export const baseRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"),
  registrationType: z.enum([
    RegistrationTypes.NON_IEEE_PROFESSIONALS,
    RegistrationTypes.NON_IEEE_STUDENTS,
    RegistrationTypes.IEEE_PROFESSIONALS,
    RegistrationTypes.IEEE_STUDENTS,
    RegistrationTypes.COLLEGE_STUDENTS,
    RegistrationTypes.COLLEGE_EXECOM,
  ]),
  attendingWorkshop: z.boolean(),
  howDidYouHearAboutUs: z.string().min(1, "Please let us know how you heard about this event"),
  paymentScreenshot: z.string().min(1, "Please upload a payment screenshot"),
  couponCode: z.string().optional(),
  referralOrg: z.string().optional(),
  finalAmount: z.number().optional(),
})

export const collegeStudentSchema = baseRegistrationSchema.extend({
  registrationType: z.literal(RegistrationTypes.COLLEGE_STUDENTS),
  collegeName: z.string().min(2, "College name must be at least 2 characters"),
})

export const ieeeStudentSchema = baseRegistrationSchema.extend({
  registrationType: z.literal(RegistrationTypes.IEEE_STUDENTS),
  collegeName: z.string().min(2, "College name must be at least 2 characters"),
  ieeeMemberId: z.string().min(1, "IEEE Member ID is required"),
})

export const nonIeeeProfessionalSchema = baseRegistrationSchema.extend({
  registrationType: z.literal(RegistrationTypes.NON_IEEE_PROFESSIONALS),
  organizationName: z.string().min(2, "Organization name must be at least 2 characters"),
})

export const nonIeeeStudentSchema = baseRegistrationSchema.extend({
  registrationType: z.literal(RegistrationTypes.NON_IEEE_STUDENTS),
  collegeName: z.string().min(2, "College name must be at least 2 characters"),
})

export const ieeeProfessionalSchema = baseRegistrationSchema.extend({
  registrationType: z.literal(RegistrationTypes.IEEE_PROFESSIONALS),
  organizationName: z.string().min(2, "Organization name must be at least 2 characters"),
  ieeeMemberId: z.string().min(1, "IEEE Member ID is required"),
})

export const collegeExecomSchema = baseRegistrationSchema.extend({
  registrationType: z.literal(RegistrationTypes.COLLEGE_EXECOM),
  collegeName: z.string().min(2, "College name must be at least 2 characters"),
})

export const registrationSchema = z.discriminatedUnion("registrationType", [
  collegeStudentSchema,
  collegeExecomSchema,
  ieeeStudentSchema,
  nonIeeeStudentSchema,
  nonIeeeProfessionalSchema,
  ieeeProfessionalSchema,
])

export type RegistrationFormData = z.infer<typeof registrationSchema>

export const paymentVerificationSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  registrationId: z.string(),
})

export type PaymentVerificationData = z.infer<typeof paymentVerificationSchema>

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactFormData = z.infer<typeof contactSchema>