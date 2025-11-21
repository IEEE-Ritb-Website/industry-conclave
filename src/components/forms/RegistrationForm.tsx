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
import { Loader2, Calendar, MapPin, Users, GraduationCap, Building, UserCheck, Check, Briefcase } from 'lucide-react'
import { CollegeSelector } from '@/components/registration/CollegeSelector'
import Heading from '../shared/heading'
import { CONFIG } from '@/configs/config'
import { RegistrationPricing, RegistrationTypes } from '@/types'
import { HoverBorderGradient } from '../ui/hover-border-gradient'

interface RegistrationFormProps {
  registrationType: RegistrationTypes
}

const registrationTypeConfig = {
  [RegistrationTypes.COLLEGE_STUDENTS]: {
    title: 'College Student Registration',
    description: 'For students currently enrolled in college',
    icon: GraduationCap,
    price: RegistrationPricing[RegistrationTypes.COLLEGE_STUDENTS],
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Exclusive goodies',
      'Meals during the event'
    ]
  },
  [RegistrationTypes.IEEE_STUDENTS]: {
    title: 'IEEE Student Registration',
    description: 'Special discount for IEEE student members',
    icon: UserCheck,
    price: RegistrationPricing[RegistrationTypes.IEEE_STUDENTS],
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Exclusive goodies',
      'Meals during the event',
      'IEEE networking session'
    ]
  },
  [RegistrationTypes.NON_IEEE_STUDENTS]: {
    title: 'Non-IEEE Student Registration',
    description: 'For students not enrolled in IEEE',
    icon: Users,
    price: RegistrationPricing[RegistrationTypes.NON_IEEE_STUDENTS],
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Exclusive goodies',
      'Meals during the event'
    ]
  },
  [RegistrationTypes.IEEE_PROFESSIONALS]: {
    title: 'IEEE Professional Registration',
    description: 'For IEEE professional members',
    icon: Briefcase,
    price: RegistrationPricing[RegistrationTypes.IEEE_PROFESSIONALS],
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Exclusive goodies',
      'Meals during the event',
      'Networking dinner',
      'VIP access'
    ]
  },
  [RegistrationTypes.NON_IEEE_PROFESSIONALS]: {
    title: 'Non-IEEE Professional Registration',
    description: 'For professionals not enrolled in IEEE',
    icon: Building,
    price: RegistrationPricing[RegistrationTypes.NON_IEEE_PROFESSIONALS],
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Exclusive goodies',
      'Meals during the event',
      'Networking dinner',
      'VIP access'
    ]
  }
}

export default function RegistrationForm({ registrationType }: RegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
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



  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true)

    try {
      // Create registration record first
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        const errorMessage = result.error || 'Registration failed. Please try again.'
        toast.error(errorMessage)
        console.error('Registration failed:', result.error)
        return
      }

      const config = registrationTypeConfig[registrationType]

      // Initialize Razorpay payment
      const Razorpay = (window as any).Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: result.amount, // Amount comes from server for security
        currency: result.currency || 'INR',
        name: 'TechConclave 2025',
        description: `${config.title} Fee`,
        image: '/logo.png',
        order_id: result.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment and update registration
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                registrationId: result.registrationId,
              }),
            })

            const verifyResult = await verifyResponse.json()

            if (verifyResponse.ok) {
              toast.success('Payment successful! Registration confirmed.')
              router.push('/success')
            } else {
              const errorMessage = verifyResult.error || 'Payment verification failed. Please contact support if amount was deducted.'
              toast.error(errorMessage)
              throw new Error(errorMessage)
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            const errorMessage = error instanceof Error ? error.message : 'Payment verification failed. Please contact support if amount was deducted.'
            toast.error(errorMessage)
          }
        },
        prefill: {
          name: data.fullName,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: '#6366f1',
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false)
            toast.info('Payment cancelled. You can try again.')
          }
        }
      }

      if (!Razorpay) {
        toast.error('Payment system is not available. Please refresh the page and try again.')
        setIsLoading(false)
        return
      }

      try {
        const rzp = new Razorpay(options)
        rzp.open()
      } catch (razorpayError) {
        console.error('Razorpay initialization error:', razorpayError)
        toast.error('Failed to initialize payment. Please try again.')
        setIsLoading(false)
      }

    } catch (error) {
      console.error('Registration error:', error)
      let errorMessage = 'Registration failed. Please try again.'

      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.'
        } else {
          errorMessage = error.message
        }
      }

      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
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
                    <CollegeSelector
                      value={watch('collegeName') || ''}
                      onChange={(value) => setValue('collegeName', value)}
                      error={(errors as any).collegeName?.message}
                    />
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
                      Payment will be processed securely via Razorpay
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-2xl py-3 bg-accent/90 hover:bg-accent text-white hover:text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
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