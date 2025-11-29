import RegistrationForm from '@/components/forms/RegistrationForm'
import { RegistrationTypes } from '@/types'

interface PageProps {
  params: Promise<{
    type: string
  }>
  searchParams: Promise<{
    coupon?: string
    referral?: string
  }>
}

export default async function RegisterTypePage({ params, searchParams }: PageProps) {
  const { type } = await params
  const { coupon, referral } = await searchParams
  const normalizedType = type.toLowerCase().replace(/-/g, '_') as RegistrationTypes;

  // Validate that the type is a valid registration type
  const validTypes = Object.values(RegistrationTypes);
  if (!validTypes.includes(normalizedType)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Invalid Registration Type</h1>
          <p className="text-gray-600">Please select a valid registration type.</p>
        </div>
      </div>
    );
  }

  const registrationType = normalizedType;

  return (
    <RegistrationForm 
      registrationType={registrationType} 
      couponCode={coupon} 
      referralOrg={referral} 
    />
  )
}