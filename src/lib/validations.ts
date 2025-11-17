import { z } from "zod"

export const baseRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"),
  registrationType: z.enum(["COLLEGE_STUDENT", "IEEE_STUDENT", "ORGANIZATION"]),
  attendingWorkshop: z.boolean(),
})

export const collegeStudentSchema = baseRegistrationSchema.extend({
  registrationType: z.literal("COLLEGE_STUDENT"),
  collegeName: z.string().min(2, "College name must be at least 2 characters"),
})

export const ieeeStudentSchema = baseRegistrationSchema.extend({
  registrationType: z.literal("IEEE_STUDENT"),
  collegeName: z.string().min(2, "College name must be at least 2 characters"),
  ieeeMemberId: z.string().min(1, "IEEE Member ID is required"),
})

export const organizationSchema = baseRegistrationSchema.extend({
  registrationType: z.literal("ORGANIZATION"),
  organizationName: z.string().min(2, "Organization name must be at least 2 characters"),
})

export const registrationSchema = z.discriminatedUnion("registrationType", [
  collegeStudentSchema,
  ieeeStudentSchema,
  organizationSchema,
])

export type RegistrationFormData = z.infer<typeof registrationSchema>

export const paymentVerificationSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  registrationId: z.string(),
})

export type PaymentVerificationData = z.infer<typeof paymentVerificationSchema>