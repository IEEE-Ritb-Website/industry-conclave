'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Loader2, Calendar, MapPin, Users, CheckCircle, Sparkles, Zap } from 'lucide-react'

import Heading from '../shared/heading'
import { CONFIG } from '@/configs/config'
import { RegistrationTypes } from '@/types'
import { HoverBorderGradient } from '../ui/hover-border-gradient'
import { registrationDetails } from '@/constants/registration'
import PaymentQRCode from '@/components/ui/payment-qr-code'
import FileUpload from '@/components/ui/file-upload'

interface RegistrationFormProps {
  registrationType: RegistrationTypes
  couponCode?: string
  referralOrg?: string
}

const registrationTypeConfig = registrationDetails.reduce((acc: Record<RegistrationTypes, typeof registrationDetails[0]>, detail) => {
  acc[detail.type] = detail;
  return acc;
}, {} as Record<RegistrationTypes, typeof registrationDetails[0]>);

export default function RegistrationForm({ registrationType, couponCode: initialCouponCode, referralOrg }: RegistrationFormProps) {
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'submitted'>('idle')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>('')
  const [registrationId, setRegistrationId] = useState<string>('')
  const [couponCode, setCouponCode] = useState<string>(initialCouponCode || '')
  const [isCouponValid, setIsCouponValid] = useState<boolean | null>(null)
  const [couponMessage, setCouponMessage] = useState<string>('')
  const [validatingCoupon, setValidatingCoupon] = useState<boolean>(false)
  const config = registrationTypeConfig[registrationType]
  const [discountedPrice, setDiscountedPrice] = useState<number>(config.discountPrice)

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
      howDidYouHearAboutUs: '',
      paymentScreenshot: '',
      couponCode: '',
    }
  })



  const handleFileSelect = async (file: File) => {
    setSelectedFile(file)

    // Upload file immediately
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        setUploadedFileUrl(result.url)
        setValue('paymentScreenshot', result.url)
      } else {
        toast.error('Failed to upload file')
      }
    } catch (error) {
      toast.error('Failed to upload file')
    }
  }

  const handleFileRemove = () => {
    setSelectedFile(null)
    setUploadedFileUrl('')
    setValue('paymentScreenshot', '')
  }

  const validateCoupon = async (code: string) => {
    if (!code.trim()) {
      setIsCouponValid(null)
      setDiscountedPrice(config.discountPrice)
      setCouponMessage('')
      return
    }

    setValidatingCoupon(true)

    try {
      const response = await fetch('/api/validate-coupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          couponCode: code,
          registrationType: registrationType,
          originalPrice: config.discountPrice,
          referralOrg: referralOrg,
          email: emailValue || undefined
        })
      })

      const result = await response.json()

      if (result.valid) {
        setIsCouponValid(true)
        setDiscountedPrice(result.discountedPrice)
        setCouponMessage(result.message)
        setValue('couponCode', code)
      } else {
        setIsCouponValid(false)
        setDiscountedPrice(config.discountPrice)
        setCouponMessage(result.error || 'Invalid coupon code')
        setValue('couponCode', '')
      }
    } catch (error) {
      setIsCouponValid(false)
      setDiscountedPrice(config.discountPrice)
      setCouponMessage('Failed to validate coupon code')
      setValue('couponCode', '')
    } finally {
      setValidatingCoupon(false)
    }
  }

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value
    setCouponCode(code)

    // Clear previous validation while typing
    if (code === '') {
      setIsCouponValid(null)
      setDiscountedPrice(config.discountPrice)
      setCouponMessage('')
      setValue('couponCode', '')
      return
    }

    // Debounce validation
    const timeoutId = setTimeout(() => {
      validateCoupon(code)
    }, 500)

    return () => clearTimeout(timeoutId)
  }

  // Validate coupon code if provided in URL, but only after email is entered
  const emailValue = watch('email')
  useEffect(() => {
    if (initialCouponCode && initialCouponCode.trim()) {
      console.log('🎯 URL coupon detected:', initialCouponCode)
      
      // Validate immediately regardless of email availability
      // Backend will handle validFor logic appropriately
      const timeoutId = setTimeout(() => {
        validateCoupon(initialCouponCode)
      }, 500)
      
      return () => clearTimeout(timeoutId)
    }
  }, [initialCouponCode, registrationType, referralOrg])

  // Re-validate coupon when email changes if coupon is already set
  useEffect(() => {
    if (couponCode && couponCode.trim() && emailValue && emailValue.trim()) {
      validateCoupon(couponCode)
    }
  }, [emailValue, couponCode, registrationType, referralOrg])

  // Additional validation: If referral is present and coupon is provided, ensure they're compatible
  useEffect(() => {
    if (referralOrg && referralOrg.trim() && initialCouponCode && initialCouponCode.trim()) {
      // Validate the coupon against the referral organization immediately
      if (emailValue && emailValue.trim()) {
        validateCoupon(initialCouponCode)
      }
    }
  }, [referralOrg, initialCouponCode, emailValue, registrationType])

  // Show warning if referral is present but no coupon code is provided
  useEffect(() => {
    if (referralOrg && referralOrg.trim() && !initialCouponCode && emailValue && emailValue.trim()) {
      // Check if there might be organization-specific coupons available
      // This is a gentle reminder - not a validation error
      setCouponMessage(`Referral from ${referralOrg} detected. Consider checking for organization-specific coupon codes.`)
      setIsCouponValid(null)
    }
  }, [referralOrg, initialCouponCode, emailValue])

  // Updated onSubmit function in your RegistrationForm component
  // Replace the entire onSubmit function with this:

  const onSubmit = async (data: RegistrationFormData) => {
    if (buttonState !== 'idle') {
      return // Prevent multiple submissions
    }

    // Validate that payment screenshot is uploaded
    if (!data.paymentScreenshot) {
      toast.error('Please upload a payment screenshot')
      return
    }

    // Additional validation: If referral is present and coupon is provided, ensure coupon is valid
    if (referralOrg && referralOrg.trim() && data.couponCode && data.couponCode.trim()) {
      if (isCouponValid === false) {
        toast.error('Invalid coupon code for this referral organization. Please check your coupon code.')
        return
      }
      if (isCouponValid === null) {
        toast.error('Please wait for coupon validation to complete')
        return
      }
    }

    setButtonState('loading')

    try {
      // Build request body based on registration type
      const requestBody: any = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        registrationType: registrationType,
        attendingWorkshop: data.attendingWorkshop,
        howDidYouHearAboutUs: data.howDidYouHearAboutUs,
        paymentScreenshot: data.paymentScreenshot,
        couponCode: data.couponCode || '',
        referralOrg: referralOrg,
        finalAmount: discountedPrice,
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

      // Call register API to create registration
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

      // Show success message
      setButtonState('submitted')
      setRegistrationId(registerResult.registrationId)
      toast.success('Registration successful! Check your email for confirmation details.')

    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Registration failed. Please try again.')
      setButtonState('idle')
    }
  }

  // Redirect to success page after successful registration
  if (buttonState === 'submitted' && registrationId) {
    // Use Next.js router for client-side navigation with registration ID
    if (typeof window !== 'undefined') {
      window.location.href = `/success?registrationId=${registrationId}`
    }
    return null // Return null while redirecting
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
                  {config.features.map((feature: string, index: number) => (
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
            <Card className="border-0 shadow-lg bg-gray-900/20">
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
                      className="rounded-2xl h-11"
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
                      className="rounded-2xl h-11"
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
                      className="rounded-2xl h-11"
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
                        className="rounded-2xl h-11"
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
                        className="rounded-2xl h-11"
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
                        className="rounded-2xl h-11"
                      />
                      {(errors as any).organizationName && (
                        <p className="text-sm text-red-600">{(errors as any).organizationName.message}</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg bg-gray-900/50">
                      <input
                        type="checkbox"
                        id="attendingWorkshop"
                        {...register('attendingWorkshop')}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <div className="flex-1">
                        <Label htmlFor="attendingWorkshop" className="text-sm font-medium text-gray-50 cursor-pointer">
                          I want to attend the workshop
                        </Label>
                        <p className="text-xs text-gray-100 mt-1">
                          Check this if you want to participate in hands-on workshops
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="howDidYouHearAboutUs">How did you hear about IEEE CIS Industry Conclave 2025? *</Label>
                    <Select
                      value={watch('howDidYouHearAboutUs') || ''}
                      onValueChange={(value) => setValue('howDidYouHearAboutUs', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="social_media">Social Media</SelectItem>
                        <SelectItem value="friend_colleague">Friend/Colleague</SelectItem>
                        <SelectItem value="ieee_chapter">IEEE Chapter</SelectItem>
                        <SelectItem value="college_poster">College Poster/Notice</SelectItem>
                        <SelectItem value="email">Email Newsletter</SelectItem>
                        <SelectItem value="website">IEEE Website</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.howDidYouHearAboutUs && (
                      <p className="text-sm text-red-600">{errors.howDidYouHearAboutUs.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="couponCode">Coupon Code (Optional)</Label>
                    <div className="relative">
                      <Input
                        id="couponCode"
                        type="text"
                        value={couponCode}
                        onChange={handleCouponChange}
                        placeholder="Enter coupon code"
                        className="rounded-2xl h-11 pr-10"
                      />
                      {validatingCoupon && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                        </div>
                      )}
                      {isCouponValid === true && !validatingCoupon && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      )}
                      {isCouponValid === false && !validatingCoupon && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-4 h-4 text-red-500">×</div>
                        </div>
                      )}
                    </div>
                    {couponMessage && (
                      <p className={`text-sm ${isCouponValid ? 'text-green-600' : 'text-red-600'}`}>
                        {couponMessage}
                      </p>
                    )}
                  </div>

                  <div className="rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-medium">Registration Fee</span>
                      <div className="text-right">
                        {discountedPrice < config.discountPrice && (
                          <div className="line-through text-sm text-gray-500">₹{config.discountPrice}</div>
                        )}
                        <span className="text-2xl font-bold text-indigo-600">₹{discountedPrice}</span>
                      </div>
                    </div>
                    {discountedPrice < config.discountPrice && (
                      <div className="bg-green-500/30 border border-green-600 rounded-lg p-2 mb-2">
                        <p className="text-sm text-green-400">
                          Coupon applied! You saved ₹{config.discountPrice - discountedPrice}
                        </p>
                      </div>
                    )}
                    <p className="text-sm text-gray-600">
                      Complete payment via UPI and upload screenshot
                    </p>
                  </div>

                  {/* Payment QR Code */}
                  <PaymentQRCode amount={discountedPrice} />

                  <FileUpload
                    onFileSelect={handleFileSelect}
                    onFileRemove={handleFileRemove}
                    selectedFile={selectedFile}
                    error={errors.paymentScreenshot?.message}
                  />

                  <Button
                    type="submit"
                    className="w-full rounded-2xl h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={buttonState !== 'idle'}
                  >
                    {buttonState === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing Registration...
                      </>
                    ) : (
                      'Complete Registration'
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