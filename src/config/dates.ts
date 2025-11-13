// Conclave date configuration
export const CONCLAVE_DATES = {
  EVENT_START: '2025-12-05T09:00:00Z',
  EVENT_END: '2025-12-06T23:59:59Z',
  REGISTRATION_START: '2025-11-15T00:00:00Z',
  REGISTRATION_END: '2025-12-06T23:59:59Z',
  
  // Date formatting helpers
  formatDate: (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  },
  
  // Check if registration is currently open
  isRegistrationOpen: () => {
    const now = new Date()
    const startTime = new Date('2025-11-15T00:00:00Z')
    const endTime = new Date('2025-12-06T23:59:59Z')
    
    return now >= startTime && now <= endTime
  },
  
  // Get formatted event dates for display
  getEventDisplayDates: () => {
    return 'December 5-6, 2025'
  }
}