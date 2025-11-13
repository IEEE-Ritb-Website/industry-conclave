'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Search, X } from 'lucide-react'

interface College {
  id: string
  name: string
  type: string
  district: string
}

interface CollegeSelectorProps {
  value?: string
  onChange: (college: College) => void
  error?: string
  disabled?: boolean
}

export function CollegeSelector({ value, onChange, error, disabled }: CollegeSelectorProps) {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null)

  // Fetch colleges on mount
  useEffect(() => {
    fetch('/api/colleges')
      .then((res) => res.json())
      .then((data) => {
        setColleges(data.colleges || [])
        if (value) {
          const college = data.colleges.find((c: College) => c.id === value)
          setSelectedCollege(college || null)
        }
      })
      .catch((error) => console.error('Failed to fetch colleges:', error))
      .finally(() => setLoading(false))
  }, [value])

  // Filter colleges based on search
  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.district.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select College *
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            disabled={disabled}
            className={`
              w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg
              shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${error ? 'border-red-500' : 'border-gray-300'}
            `}
          >
            <div className="flex items-center justify-between">
              <span className={selectedCollege ? 'text-gray-900' : 'text-gray-500'}>
                {selectedCollege 
                  ? `${selectedCollege.name}, ${selectedCollege.district}` 
                  : 'Select your college'}
              </span>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
            </div>
          </button>
        </div>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="p-4">
              <div className="flex items-center border-b border-gray-200 pb-3">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search colleges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="ml-2 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-2 p-2 hover:bg-gray-100 rounded"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300 border-t-blue-500"></div>
                  </div>
                ) : (
                  filteredColleges.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      No colleges found
                    </div>
                  ) : (
                    filteredColleges.map((college) => (
                      <button
                        key={college.id}
                        type="button"
                        onClick={() => {
                          setSelectedCollege(college)
                          onChange(college)
                          setIsOpen(false)
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 border border-b border-transparent hover:border-blue-200 ${
                          selectedCollege?.id === college.id 
                            ? 'bg-blue-50 border-blue-200' 
                            : 'border-transparent'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-gray-900">
                            {college.name}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            {college.type} • {college.district}
                          </span>
                        </div>
                      </button>
                    ))
                  )
                )}
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  )
}