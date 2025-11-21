'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { 
  registrationSchema, 
  type RegistrationFormData,
  collegeStudentSchema,
  ieeeStudentSchema,
  organizationSchema
} from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, ArrowLeft, Calendar, MapPin, Users, GraduationCap, Building, UserCheck, Check } from 'lucide-react'
import Link from 'next/link'
import { CollegeSelector } from '@/components/registration/CollegeSelector'
import Heading from '../shared/heading'
import { CONFIG } from '@/configs/config'

type RegistrationType = 'COLLEGE_STUDENT' | 'IEEE_STUDENT' | 'ORGANIZATION'

interface RegistrationFormProps {
  registrationType: RegistrationType
}

const registrationTypeConfig = {
  COLLEGE_STUDENT: {
    title: 'College Student Registration',
    description: 'For students currently enrolled in college',
    icon: GraduationCap,
    price: '₹350',
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Exclusive goodies',
      // 'Certificate of participation',
      'Meals during the event'
    ]
  },
  IEEE_STUDENT: {
    title: 'IEEE Student Registration',
    description: 'Special discount for IEEE members',
    icon: UserCheck,
    price: '₹250',
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Exclusive goodies',
      // 'Certificate of participation',
      'Meals during the event',
      'IEEE networking session'
    ]
  },
  ORGANIZATION: {
    title: 'Organization Registration',
    description: 'For professionals and organizations',
    icon: Building,
    price: '₹500',
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Exclusive goodies',
      // 'Certificate of participation',
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
  const Icon = config.icon

  const getSchema = () => {
    switch (registrationType) {
      case 'COLLEGE_STUDENT':
        return collegeStudentSchema
      case 'IEEE_STUDENT':
        return ieeeStudentSchema
      case 'ORGANIZATION':
        return organizationSchema
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

  const watchedValues = watch()

  const getAmount = () => {
    switch (registrationType) {
      case 'COLLEGE_STUDENT':
        return 350
      case 'IEEE_STUDENT':
        return 250
      case 'ORGANIZATION':
        return 500
      default:
        return 350
    }
  }

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
        throw new Error(result.error || 'Registration failed')
      }

      // Initialize Razorpay payment
      const Razorpay = (window as any).Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: getAmount() * 100, // Convert to paise
        currency: 'INR',
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
              throw new Error(verifyResult.error || 'Payment verification failed')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            toast.error('Payment verification failed. Please contact support.')
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
          ondismiss: function() {
            setIsLoading(false)
            toast.info('Payment cancelled. You can try again.')
          }
        }
      }

      const rzp = new Razorpay(options)
      rzp.open()

    } catch (error) {
      console.error('Registration error:', error)
      toast.error(error instanceof Error ? error.message : 'Registration failed')
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
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="font-medium">December 5-6, 2025</p>
                      <p className="text-sm text-gray-600">2-day technical extravaganza</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="font-medium">{CONFIG.eventDetails.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="font-medium">500+ Attendees Expected</p>
                      <p className="text-sm text-gray-600">Students and professionals</p>
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

                 {(registrationType === 'COLLEGE_STUDENT' || registrationType === 'IEEE_STUDENT') && (
                   <CollegeSelector
                     value={watch('collegeName') || ''}
                     onChange={(value) => setValue('collegeName', value)}
                     error={(errors as any).collegeName?.message}
                   />
                 )}

                {registrationType === 'IEEE_STUDENT' && (
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

                {registrationType === 'ORGANIZATION' && (
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
                     <Label htmlFor="attendingWorkshop" className="text-sm font-medium text-gray-700">
                       I want to attend the workshop
                     </Label>
                   </div>
                   <p className="text-xs text-gray-500">
                     Check this if you want to participate in hands-on workshops
                   </p>
                 </div>

                 <div className="rounded-2xl p-4">
                   <div className="flex items-center justify-between mb-2">
                     <span className="text-lg font-medium">Registration Fee</span>
                     <span className="text-2xl font-bold text-indigo-600">{config.price}</span>
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
        </div>
      </div>
    </div>
  )
}