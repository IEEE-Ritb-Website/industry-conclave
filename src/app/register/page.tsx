'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, GraduationCap, UserCheck, Building } from 'lucide-react'

const registrationTypes = [
  {
    type: 'COLLEGE_STUDENT',
    title: 'College Student',
    description: 'For students currently enrolled in college',
    price: '₹350',
    icon: GraduationCap,
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Event merchandise',
      'Certificate of participation',
      'Meals during the event'
    ],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    type: 'IEEE_STUDENT',
    title: 'IEEE Student',
    description: 'Special discount for IEEE members',
    price: '₹250',
    icon: UserCheck,
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Event merchandise',
      'Certificate of participation',
      'Meals during the event',
      'IEEE networking session'
    ],
    color: 'from-green-500 to-emerald-600'
  },
  {
    type: 'ORGANIZATION',
    title: 'Organization',
    description: 'For professionals and organizations',
    price: '₹500',
    icon: Building,
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Premium event merchandise',
      'Certificate of participation',
      'Meals during the event',
      'Networking dinner',
      'VIP access'
    ],
    color: 'from-purple-500 to-pink-600'
  }
]

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Registration Type
          </h1>
          <p className="text-xl text-gray-600">
            Select the category that best describes you to proceed with registration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {registrationTypes.map((regType) => {
            const Icon = regType.icon
            return (
              <Card key={regType.type} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${regType.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{regType.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {regType.description}
                  </CardDescription>
                  <div className="text-3xl font-bold text-indigo-600 mt-2">
                    {regType.price}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {regType.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/register/${regType.type.toLowerCase()}`}
                    className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-3 px-4 rounded-xl font-medium transition-colors duration-200"
                  >
                    Select This Plan
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Questions about registration?{' '}
            <a href="mailto:contact@techconclave.com" className="text-indigo-600 hover:text-indigo-700">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}