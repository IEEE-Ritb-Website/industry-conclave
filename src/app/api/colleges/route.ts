import { NextResponse } from 'next/server'

// Mock Karnataka colleges data - in production, this would come from a real API
const KARNATAKA_COLLEGES = [
  { id: '1', name: 'Indian Institute of Science (IISc)', type: 'government', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '2', name: 'National Institute of Technology Karnataka (NITK)', type: 'government', district: 'Uttara Kannada', region: 'Coastal Karnataka' },
  { id: '3', name: 'Visvesvaraya Technological University (VTU)', type: 'government', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '4', name: 'R.V. College of Engineering', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '5', name: 'B.M.S. College of Engineering', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '6', name: 'PES University', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '7', name: 'M.S. Ramaiah Institute of Technology', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '8', name: 'Christ University', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '9', name: 'Jain University', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '10', name: 'Manipal Institute of Technology', type: 'private', district: 'Udupi', region: 'Coastal Karnataka' },
  { id: '11', name: 'National Institute of Technology Surathkal', type: 'government', district: 'Dakshina Kannada', region: 'Coastal Karnataka' },
  { id: '12', name: 'University of Mysore', type: 'government', district: 'Mysuru', region: 'Mysuru' },
  { id: '13', name: 'Maharaja\'s College', type: 'government', district: 'Mysuru', region: 'Mysuru' },
  { id: '14', name: 'Vijaya College', type: 'government', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '15', name: 'Bangalore University', type: 'government', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '16', name: 'Karnataka College of Arts, Science and Commerce', type: 'government', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '17', name: 'St. Joseph\'s College', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '18', name: 'Mount Carmel College', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '19', name: 'Jyoti Nivas College', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '20', name: 'Maharani\'s Arts College for Women', type: 'government', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '21', name: 'Government College of Engineering', type: 'government', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '22', name: 'Siddaganga Institute of Technology', type: 'private', district: 'Tumakuru', region: 'Bengaluru' },
  { id: '23', name: 'BMS College of Engineering', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '24', name: 'Dayananda Sagar College of Engineering', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '25', name: 'Acharya Institute of Technology', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '26', name: 'New Horizon College of Engineering', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '27', name: 'Ramaiah Institute of Technology', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '28', name: 'Sir M. Visvesvaraya Institute of Technology', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '29', name: 'B.N.M. Institute of Technology', type: 'private', district: 'Bengaluru', region: 'Bengaluru' },
  { id: '30', name: 'The Oxford College of Engineering', type: 'private', district: 'Bengaluru', region: 'Bengaluru' }
]

interface College {
  id: string
  name: string
  type: 'government' | 'aided' | 'private' | 'autonomous'
  district: string
  region: string
}

export async function GET() {
  try {
    // In production, you would fetch from a real API like:
    // const response = await fetch('https://api.karnataka.gov.in/api/v1/colleges?limit=500&format=json')
    // const data = await response.json()
    
    // For now, return mock data
    const colleges: College[] = KARNATAKA_COLLEGES.map(college => ({
      id: college.id,
      name: college.name,
      type: college.type as 'government' | 'aided' | 'private' | 'autonomous',
      district: college.district,
      region: college.region
    }))

    return NextResponse.json({ colleges })
  } catch (error) {
    console.error('College API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch colleges', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}