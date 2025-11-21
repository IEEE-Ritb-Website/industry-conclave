'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  type RegistrationFormData,
  collegeStudentSchema,
  ieeeStudentSchema,
  nonIeeeStudentSchema,
  nonIeeeProfessionalSchema,
  ieeeProfessionalSchema,
} from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Calendar, MapPin, Users, GraduationCap, Building, UserCheck, Briefcase } from 'lucide-react'

import Heading from '../shared/heading'
import { CONFIG } from '@/configs/config'
import { PaymentProductId, RegistrationPricing, RegistrationTypes } from '@/types'
import { HoverBorderGradient } from '../ui/hover-border-gradient'
import { registrationDetails } from '@/app/register/page'

interface RegistrationFormProps {
  registrationType: RegistrationTypes
}

const registrationTypeConfig = registrationDetails.reduce((acc, detail) => {
  acc[detail.type] = detail;
  return acc;
}, {} as Record<RegistrationTypes, typeof registrationDetails[0]>);

export default function RegistrationForm({ registrationType }: RegistrationFormProps) {
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'submitted'>('idle')
  // const router = useRouter()
  const config = registrationTypeConfig[registrationType]

  const getSchema = () => {
    switch (registrationType) {
      case RegistrationTypes.NON_IEEE_PROFESSIONALS:
        return nonIeeeProfessionalSchema
      case RegistrationTypes.NON_IEEE_STUDENTS:
        return nonIeeeStudentSchema
      case RegistrationTypes.IEEE_STUDENTS:
        return ieeeStudentSchema
      case RegistrationTypes.IEEE_PROFESSIONALS:
        return ieeeProfessionalSchema
      default:
        return collegeStudentSchema
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      registrationType,
      attendingWorkshop: false,
      collegeName: '',
      organizationName: '',
      ieeeMemberId: '',
    }
  })



  // Updated onSubmit function in your RegistrationForm component
  // Replace the entire onSubmit function with this:

  const onSubmit = async (data: RegistrationFormData) => {
    if (buttonState !== 'idle') {
      return // Prevent multiple submissions
    }

    setButtonState('loading')

    try {
      const config = registrationTypeConfig[registrationType]

      // Build request body based on registration type
      const requestBody: any = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        registrationType: registrationType,
        attendingWorkshop: data.attendingWorkshop,
      }

      // Add type-specific fields - ensure required fields are always present as strings
      if (registrationType === RegistrationTypes.COLLEGE_STUDENTS ||
          registrationType === RegistrationTypes.IEEE_STUDENTS ||
          registrationType === RegistrationTypes.NON_IEEE_STUDENTS) {
        requestBody.collegeName = (data as any).collegeName || ''
      }

      if (registrationType === RegistrationTypes.IEEE_STUDENTS ||
          registrationType === RegistrationTypes.IEEE_PROFESSIONALS) {
        requestBody.ieeeMemberId = (data as any).ieeeMemberId || ''
      }

      if (registrationType === RegistrationTypes.NON_IEEE_PROFESSIONALS ||
          registrationType === RegistrationTypes.IEEE_PROFESSIONALS) {
        requestBody.organizationName = (data as any).organizationName || ''
      }

      if (registrationType === RegistrationTypes.IEEE_STUDENTS ||
          registrationType === RegistrationTypes.IEEE_PROFESSIONALS) {
        requestBody.ieeeMemberId = (data as any).ieeeMemberId
      }

      if (registrationType === RegistrationTypes.NON_IEEE_PROFESSIONALS ||
          registrationType === RegistrationTypes.IEEE_PROFESSIONALS) {
        requestBody.organizationName = (data as any).organizationName
      }

      // Call register API to create registration and get checkout URL
      const registerResponse = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const registerResult = await registerResponse.json()

      if (!registerResponse.ok) {
        const errorMessage = registerResult.error || 'Failed to create registration.'
        toast.error(errorMessage)
        setButtonState('idle')
        return
      }

      // Redirect to checkout URL
      if (registerResult.checkout_url) {
        setButtonState('submitted')
        window.location.href = registerResult.checkout_url
      } else {
        toast.error('Invalid registration response. Please try again.')
        setButtonState('idle')
      }

    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Registration failed. Please try again.')
      setButtonState('idle')
    }
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Heading title={config.title} subtitle={config.description} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Event Info */}
          <div className="space-y-6">

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-neutral-300" />
                    <div>
                      <p className="font-medium">December 5-6, 2025</p>
                      <p className="text-sm text-gray-300">2-day technical extravaganza</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-neutral-300" />
                    <div>
                      <p className="font-medium">{CONFIG.eventDetails.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-neutral-300" />
                    <div>
                      <p className="font-medium">500+ Attendees Expected</p>
                      <p className="text-sm text-gray-300">Students and professionals</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-linear-to-br from-indigo-600 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">What's Included?</h3>
                <ul className="space-y-2">
                  {config.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <HoverBorderGradient containerClassName="rounded-xl w-full"
            className="rounded-2xl w-full p-0 text-left">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Registration Details</CardTitle>
                <CardDescription>
                  Fill in your information to complete the registration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      {...register('fullName')}
                      placeholder="Enter your full name"
                      className="rounded-2xl"
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-600">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="your.email@example.com"
                      className="rounded-2xl"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      placeholder="9999999999"
                      className="rounded-2xl"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                   {(registrationType === RegistrationTypes.COLLEGE_STUDENTS || registrationType === RegistrationTypes.IEEE_STUDENTS || registrationType === RegistrationTypes.NON_IEEE_STUDENTS) && (
                     <div className="space-y-2">
                       <Label htmlFor="collegeName">College Name *</Label>
                       <Input
                         id="collegeName"
                         {...register('collegeName')}
                         placeholder="Enter your college name"
                         className="rounded-2xl"
                       />
                       {(errors as any).collegeName && (
                         <p className="text-sm text-red-600">{(errors as any).collegeName.message}</p>
                       )}
                     </div>
                   )}

                  {(registrationType === RegistrationTypes.IEEE_STUDENTS || registrationType === RegistrationTypes.IEEE_PROFESSIONALS) && (
                    <div className="space-y-2">
                      <Label htmlFor="ieeeMemberId">IEEE Member ID *</Label>
                      <Input
                        id="ieeeMemberId"
                        {...register('ieeeMemberId')}
                        placeholder="Your IEEE membership ID"
                        className="rounded-2xl"
                      />
                      {(errors as any).ieeeMemberId && (
                        <p className="text-sm text-red-600">{(errors as any).ieeeMemberId.message}</p>
                      )}
                    </div>
                  )}

                  {(registrationType === RegistrationTypes.NON_IEEE_PROFESSIONALS || registrationType === RegistrationTypes.IEEE_PROFESSIONALS) && (
                    <div className="space-y-2">
                      <Label htmlFor="organizationName">Organization Name *</Label>
                      <Input
                        id="organizationName"
                        {...register('organizationName')}
                        placeholder="Your organization name"
                        className="rounded-2xl"
                      />
                      {(errors as any).organizationName && (
                        <p className="text-sm text-red-600">{(errors as any).organizationName.message}</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="attendingWorkshop"
                        {...register('attendingWorkshop')}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <Label htmlFor="attendingWorkshop" className="text-sm font-medium text-neutral-300">
                        I want to attend the workshop
                      </Label>
                    </div>
                    <p className="text-xs text-gray-200">
                      Check this if you want to participate in hands-on workshops
                    </p>
                  </div>

                  <div className="rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-medium">Registration Fee</span>
                      <span className="text-2xl font-bold text-indigo-600">₹{config.price}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Payment will be processed securely via Dodo Payments
                    </p>
                  </div>

                   <Button
                     type="submit"
                     className="w-full rounded-2xl py-3 bg-accent/90 hover:bg-accent text-white hover:text-white"
                     disabled={buttonState !== 'idle'}
                   >
                     {buttonState === 'loading' ? (
                       <>
                         <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                         Processing...
                       </>
                     ) : buttonState === 'submitted' ? (
                       <>
                         <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                         Redirecting to payment...
                       </>
                     ) : (
                       `Register & Pay ${config.price}`
                     )}
                   </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By registering, you agree to our terms and conditions.
                    Your payment information is secure and encrypted.
                  </p>
                </form>
              </CardContent>
            </Card>
          </HoverBorderGradient>
        </div>
      </div>
    </div>
  )
}