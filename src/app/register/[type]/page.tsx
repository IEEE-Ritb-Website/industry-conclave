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

export default async function RegisterTypePage({ params }: PageProps) {
  const { type } = await params
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

  // Show registration closed message instead of the form
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-4">
          Registration Closed
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          Registration for this event has now closed. We are no longer accepting new registrations.
        </p>
        <p className="text-gray-400">
          If you have any questions or need assistance, please contact our support team.
        </p>
      </div>
    </div>
  )
}