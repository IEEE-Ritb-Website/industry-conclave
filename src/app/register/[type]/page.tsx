import Script from 'next/script'
import RegistrationForm from '@/components/forms/RegistrationForm'
import { RegistrationTypes } from '@/types'

interface PageProps {
  params: Promise<{
    type: string
  }>
}

export default async function RegisterTypePage({ params }: PageProps) {
  const { type } = await params
  const registrationType = type.toLowerCase() as RegistrationTypes;

  const validTypes = Object.values(RegistrationTypes);

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <RegistrationForm registrationType={registrationType} />
    </>
  )
}