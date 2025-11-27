'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Search, Filter, Users, CheckCircle, XCircle, Clock } from 'lucide-react'
import { RegistrationTypes, RegistrationPricing } from '@/types'

interface Registration {
  id: string
  fullName: string
  email: string
  college: string
  phone: string
  registrationType: RegistrationTypes
  attendingWorkshop: boolean
  ieeeMemberId?: string
  organizationName?: string
  isPaymentCompleted: boolean
  createdAt: string
  updatedAt?: string
  payments: {
    status: string
    amount: number
    razorpayOrderId?: string
    razorpayPaymentId?: string
    createdAt: string
  }[]
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'pending'>('all')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations()
    }
  }, [isAuthenticated])

  useEffect(() => {
    let filtered = registrations

    if (searchTerm) {
      filtered = filtered.filter(reg =>
        reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.registrationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (reg.ieeeMemberId && reg.ieeeMemberId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (reg.organizationName && reg.organizationName.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(reg => {
        return statusFilter === 'success' ? reg.isPaymentCompleted : !reg.isPaymentCompleted
      })
    }

    setFilteredRegistrations(filtered)
  }, [registrations, searchTerm, statusFilter])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD!) {
      setIsAuthenticated(true)
    } else {
      alert('Invalid password')
    }
  }

  const fetchRegistrations = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/registrations')
      if (!response.ok) return
  
      const raw = await response.json()
  
        const normalized = raw.map((r: any) => ({
         id: r._id,
         fullName: r.fullName,
         email: r.email,
         phone: r.phone,
         college:
           r.registrationType === RegistrationTypes.COLLEGE_STUDENTS
             ? r.collegeName || "N/A"
             : r.registrationType === RegistrationTypes.IEEE_STUDENTS
             ? r.collegeName || "N/A"
             : r.registrationType === RegistrationTypes.NON_IEEE_STUDENTS
             ? r.collegeName || "N/A"
             : r.organizationName || "N/A",
         registrationType: r.registrationType as RegistrationTypes,
         attendingWorkshop: r.attendingWorkshop,
         ieeeMemberId: r.ieeeMemberId,
         organizationName: r.organizationName,
         isPaymentCompleted: r.isPaymentCompleted,
         createdAt: r.createdAt,
         updatedAt: r.updatedAt,
          payments: r.payments && r.payments.length > 0 ? r.payments.map((p: any) => ({
            status: p.status,
            amount: p.amount,
            razorpayOrderId: p.razorpayOrderId,
            razorpayPaymentId: p.razorpayPaymentId,
            createdAt: p.createdAt,
          })) : [
            {
              status: r.isPaymentCompleted ? "SUCCESS" : "PENDING",
              amount: RegistrationPricing[r.registrationType as RegistrationTypes] || 0,
              createdAt: r.createdAt,
            },
          ],
       }))
  
      setRegistrations(normalized)
    } catch (err) {
      console.error('Failed to fetch registrations:', err)
    } finally {
      setLoading(false)
    }
  }  

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'College', 'Phone', 'Registration Type', 'Workshop', 'IEEE Member ID', 'Organization', 'Payment Status', 'Payment Completed', 'Amount', 'Order ID', 'Payment ID', 'Created Date', 'Updated Date']
    const csvContent = [
      headers.join(','),
      ...filteredRegistrations.map(reg => [
        reg.id,
        reg.fullName,
        reg.email,
        reg.college,
        reg.phone,
        reg.registrationType.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
        reg.attendingWorkshop ? 'Yes' : 'No',
        reg.ieeeMemberId || '',
        reg.organizationName || '',
        reg.isPaymentCompleted ? 'SUCCESS' : 'PENDING',
        reg.isPaymentCompleted ? 'Yes' : 'No',
        reg.payments[0]?.amount || 0,
        reg.payments[0]?.razorpayOrderId || '',
        reg.payments[0]?.razorpayPaymentId || '',
        new Date(reg.createdAt).toLocaleDateString(),
        reg.updatedAt ? new Date(reg.updatedAt).toLocaleDateString() : ''
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  console.log(registrations)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter password to access admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-2xl"
              />
              <Button type="submit" className="w-full rounded-2xl">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  const stats = {
    total: registrations.length,
    paid: registrations.filter(reg => reg.isPaymentCompleted).length,
    pending: registrations.filter(reg => !reg.isPaymentCompleted).length,
    byType: {
      [RegistrationTypes.COLLEGE_STUDENTS]: registrations.filter(reg => reg.registrationType === RegistrationTypes.COLLEGE_STUDENTS).length,
      [RegistrationTypes.IEEE_STUDENTS]: registrations.filter(reg => reg.registrationType === RegistrationTypes.IEEE_STUDENTS).length,
      [RegistrationTypes.NON_IEEE_STUDENTS]: registrations.filter(reg => reg.registrationType === RegistrationTypes.NON_IEEE_STUDENTS).length,
      [RegistrationTypes.IEEE_PROFESSIONALS]: registrations.filter(reg => reg.registrationType === RegistrationTypes.IEEE_PROFESSIONALS).length,
      [RegistrationTypes.NON_IEEE_PROFESSIONALS]: registrations.filter(reg => reg.registrationType === RegistrationTypes.NON_IEEE_PROFESSIONALS).length,
    }
  }

  console.log(registrations)

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-200">Manage event registrations and payments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Paid Registrations</p>
                  <p className="text-3xl font-bold text-green-600">{stats.paid}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Workshop Attendees</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {registrations.filter(reg => reg.attendingWorkshop).length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registration Type Breakdown */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Registration Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(stats.byType).map(([type]) => (
                <div key={type} className="text-center p-4">
                  <p className="text-sm text-gray-600">
                    {type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                   <Input
                     placeholder="Search by name, email, college, organization, IEEE ID..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="pl-10 rounded-2xl"
                   />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                  className="rounded-2xl"
                >
                  All ({stats.total})
                </Button>
                <Button
                  variant={statusFilter === 'success' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('success')}
                  className="rounded-2xl"
                >
                  Paid ({stats.paid})
                </Button>
                <Button
                  variant={statusFilter === 'pending' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('pending')}
                  className="rounded-2xl"
                >
                  Pending ({stats.pending})
                </Button>
              </div>
              <Button onClick={exportToCSV} className="rounded-2xl">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Registrations ({filteredRegistrations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">College/Org</th>
                      <th className="text-left py-3 px-4">Phone</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Workshop</th>
                      <th className="text-left py-3 px-4">IEEE ID</th>
                      <th className="text-left py-3 px-4">Payment Status</th>
                      <th className="text-left py-3 px-4">Completed</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Order ID</th>
                      <th className="text-left py-3 px-4">Created</th>
                      <th className="text-left py-3 px-4">Updated</th>
                    </tr>
                  </thead>
                   <tbody>
                     {filteredRegistrations.map((registration) => (
                       <tr key={registration.id} className="border-b">
                         <td className="py-3 px-4 font-medium">{registration.fullName}</td>
                         <td className="py-3 px-4">{registration.email}</td>
                         <td className="py-3 px-4">{registration.college}</td>
                         <td className="py-3 px-4">{registration.phone}</td>
                         <td className="py-3 px-4">
                           <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                             {registration.registrationType.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                           </span>
                         </td>
                         <td className="py-3 px-4">
                           {registration.attendingWorkshop ? (
                             <CheckCircle className="w-4 h-4 text-green-600" />
                           ) : (
                             <XCircle className="w-4 h-4 text-gray-400" />
                           )}
                         </td>
                         <td className="py-3 px-4 text-sm">
                           {registration.ieeeMemberId || '-'}
                         </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              registration.isPaymentCompleted
                                ? 'bg-green-100 text-green-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {registration.isPaymentCompleted ? (
                                <>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Paid
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3 h-3 mr-1" />
                                  Pending
                                </>
                              )}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {registration.isPaymentCompleted ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                          </td>
                          <td className="py-3 px-4">₹{registration.payments[0]?.amount || 0}</td>
                         <td className="py-3 px-4 text-xs font-mono">
                           {registration.payments[0]?.razorpayOrderId ? registration.payments[0].razorpayOrderId.slice(-8) : '-'}
                         </td>
                         <td className="py-3 px-4 text-sm">
                           {new Date(registration.createdAt).toLocaleDateString()}
                         </td>
                         <td className="py-3 px-4 text-sm">
                           {registration.updatedAt ? new Date(registration.updatedAt).toLocaleDateString() : '-'}
                         </td>
                       </tr>
                     ))}
                   </tbody>
                </table>
                {filteredRegistrations.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No registrations found
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}