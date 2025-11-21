'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronDown, Search, X, Loader2 } from 'lucide-react'

interface College {
  id: string
  name: string
  state: string
  district: string
}

interface CollegeSelectorProps {
  value?: string
  onChange: (collegeName: string) => void
  error?: string
  disabled?: boolean
}

export function CollegeSelector({ value, onChange, error, disabled }: CollegeSelectorProps) {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Fetch colleges with pagination
  const fetchColleges = useCallback(async (pageNum = 1, search = '', append = false) => {
    if (!append) setLoading(true)

    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: '50',
        ...(search && { search })
      })

      const res = await fetch(`/api/colleges?${params}`)
      const data = await res.json()

      if (append) {
        setColleges(prev => [...prev, ...data.colleges])
      } else {
        setColleges(data.colleges)
      }

      setHasMore(data.pagination.hasNext)
      setTotalPages(data.pagination.totalPages)

      if (value && !append) {
        setSelectedCollege(value)
      }
    } catch (error) {
      console.error('Failed to fetch colleges:', error)
    } finally {
      setLoading(false)
    }
  }, [value])

  // Initial fetch when dropdown opens
  useEffect(() => {
    if (isOpen && colleges.length === 0) {
      fetchColleges()
    }
  }, [isOpen, colleges.length, fetchColleges])

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      setPage(1)
      fetchColleges(1, searchTerm, false)
    }, 300)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchTerm, fetchColleges])

  // Load more on scroll
  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchColleges(nextPage, searchTerm, true)
    }
  }, [hasMore, loading, page, searchTerm, fetchColleges])

  useEffect(() => {
    if (!listRef.current || !isOpen) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    const lastItem = listRef.current.lastElementChild
    if (lastItem) {
      observerRef.current.observe(lastItem)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, loading, loadMore, isOpen])

  return (
    <div className="relative">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white mb-1">
          Select College *
        </label>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            disabled={disabled}
            className={`
              w-full px-4 py-3 text-left bg-background border border-gray-300 rounded-lg
              shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${error ? 'border-red-500' : 'border-gray-300'}
            `}
          >
            <div className="flex items-center justify-between">
              <span className={selectedCollege ? 'text-neutral-100' : 'text-neutral-300'}>
                {selectedCollege || 'Select your college'}
              </span>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
            </div>
          </button>
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-background border border-gray-300 rounded-lg shadow-lg">
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
                  className="ml-2 p-2 hover:bg-gray-700 rounded"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto" ref={listRef}>
                {loading && colleges.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  <>
                    {colleges.map((college) => (
                      <button
                        key={college.id}
                        type="button"
                        onClick={() => {
                          setSelectedCollege(college.name)
                          onChange(college.name)
                          setIsOpen(false)
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-700 border border-b border-transparent hover:border-blue-200 ${selectedCollege === college.name
                            ? 'bg-blue-50 border-blue-200'
                            : 'border-transparent'
                          }`}
                      >
                        <div className="flex items-center">
                          <span className="text-neutral-100">
                            {college.name}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            {college.state} • {college.district}
                          </span>
                        </div>
                      </button>
                    ))}

                    {hasMore && (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span className="text-sm text-gray-500">Loading more colleges...</span>
                      </div>
                    )}
                  </>
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