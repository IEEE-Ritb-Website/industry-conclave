import { NextRequest, NextResponse } from 'next/server'
import { parseCollegesCSV } from '@/lib/colleges'
import fs from 'fs'
import path from 'path'

interface College {
  id: string
  name: string
  state: string
  district: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search') || ''
    
    const csvPath = path.join(process.cwd(), 'src', 'data', 'colleges.csv')
    const csvContent = fs.readFileSync(csvPath, 'utf-8')
    
    const colleges = parseCollegesCSV(csvContent)
    
    // Transform to match expected format
    const transformedColleges: College[] = colleges.map((college, index) => ({
      id: college.aisheCode || `college-${index}`,
      name: college.name,
      state: college.state,
      district: college.district
    }))
    
    // Filter colleges based on search
    let filteredColleges = transformedColleges
    if (search) {
      const searchLower = search.toLowerCase()
      filteredColleges = transformedColleges.filter(college =>
        college.name.toLowerCase().includes(searchLower) ||
        college.state.toLowerCase().includes(searchLower) ||
        college.district.toLowerCase().includes(searchLower)
      )
    }
    
    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedColleges = filteredColleges.slice(startIndex, endIndex)
    
    return NextResponse.json({
      colleges: paginatedColleges,
      pagination: {
        page,
        limit,
        total: filteredColleges.length,
        totalPages: Math.ceil(filteredColleges.length / limit),
        hasNext: endIndex < filteredColleges.length,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Error reading colleges data:', error)
    return NextResponse.json(
      { error: 'Failed to load colleges data' },
      { status: 500 }
    )
  }
}