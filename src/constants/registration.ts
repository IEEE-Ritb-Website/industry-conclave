import { RegistrationTypes } from '@/types'
import { GraduationCap, UserCheck, Users, Briefcase, Building } from 'lucide-react'

export const registrationDetails = [
  {
    type: RegistrationTypes.COLLEGE_STUDENTS,
    title: 'MSRIT Student',
    description: 'For students currently enrolled in college',
    originalPrice: 199,
    discountPrice: 149,
    icon: GraduationCap,
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Exclusive goodies',
      'Food and refreshments during the event',
    ],
    color: 'green'
  },
  {
    type: RegistrationTypes.IEEE_STUDENTS,
    title: 'IEEE Student',
    description: 'Special discount for IEEE student members',
    originalPrice: 249,
    discountPrice: 199,
    icon: UserCheck,
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Exclusive goodies',
      'Food and refreshments during the event',
    ],
    color: 'lightseagreen'
  },
  {
    type: RegistrationTypes.NON_IEEE_STUDENTS,
    title: 'Non-IEEE Student',
    description: 'For students not enrolled in IEEE',
    originalPrice: 299,
    discountPrice: 249,
    icon: Users,
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Exclusive goodies',
      'Food and refreshments during the event',
    ],
    color: 'purple'
  },
  {
    type: RegistrationTypes.IEEE_PROFESSIONALS,
    title: 'IEEE Professional',
    description: 'For IEEE professional members',
    originalPrice: 299,
    discountPrice: 299,
    icon: Briefcase,
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Exclusive goodies',
      'Food and refreshments during the event',
    ],
    color: 'blue'
  },
  {
    type: RegistrationTypes.NON_IEEE_PROFESSIONALS,
    title: 'Non-IEEE Professional',
    description: 'For professionals not enrolled in IEEE',
    originalPrice: 349,
    discountPrice: 349,
    icon: Building,
    features: [
      'Access to all technical sessions',
      'Hands-on workshops',
      'Exclusive goodies',
      'Food and refreshments during the event',
    ],
    color: 'red'
  }
]