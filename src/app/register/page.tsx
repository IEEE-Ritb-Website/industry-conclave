'use client'

import Link from 'next/link'
import { ArrowLeft, GraduationCap, UserCheck, Building } from 'lucide-react'
import Heading from '@/components/shared/heading'
import { CardSpotlight } from '@/components/ui/card-spotlight'
import { Button } from '@/components/ui/button'
import { CONFIG } from '@/configs/config'

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
    color: 'royalblue'
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
    color: 'seagreen'
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
    color: 'orange'
  }
]

export default function RegisterPage() {
  return (
    <div className="py-12 relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Heading title='Register for the event' subtitle="Join us for the amazing event" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 place-items-center">
          {registrationTypes.map((regType) => {
            const Icon = regType.icon
            return (
              <CardSpotlight key={regType.type} color={regType.color} className="w-full max-w-sm h-full flex flex-col">
                <div className="flex flex-col justify-between">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-8 h-8 text-white" />
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {regType.title}
                      </h3>
                      <p className="text-sm text-neutral-400">{regType.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{regType.price}</span>
                    <span className="text-neutral-400 ml-2">per person</span>
                  </div>

                  {/* Features */}
                  <div className="grow mb-6">
                    <ul className="space-y-3">
                      {regType.features.map((feature, idx) => (
                        <Step key={idx} title={feature} />
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <div className="relative z-50">
                    <Button className="w-full" asChild>
                      <Link href={`/register/${regType.type.toLowerCase()}`}>
                        Register Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardSpotlight>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Questions about registration?{' '}
            <a href={`mailto:${CONFIG.profile.email}`} className="text-primary hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-neutral-200 text-sm">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-green-500 mt-0.5 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};