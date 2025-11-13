import Script from 'next/script'
import RegistrationForm from '@/components/forms/RegistrationForm'

interface PageProps {
  params: Promise<{
    type: string
  }>
}

export default async function RegisterTypePage({ params }: PageProps) {
  const { type } = await params
  const registrationType = type.toUpperCase() as 'COLLEGE_STUDENT' | 'IEEE_STUDENT' | 'ORGANIZATION'
  
  // Validate the registration type
  const validTypes = ['COLLEGE_STUDENT', 'IEEE_STUDENT', 'ORGANIZATION']
  if (!validTypes.includes(registrationType)) {
    return <div>Invalid registration type</div>
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <RegistrationForm registrationType={registrationType} />
    </>
  )
}