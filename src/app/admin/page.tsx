'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Search, Filter, Users, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Registration {
  id: string
  fullName: string
  email: string
  college: string
  phone: string
  createdAt: string
  payments: {
    status: string
    amount: number
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
        reg.college.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(reg => {
        const paymentStatus = reg.payments[0]?.status || 'PENDING'
        return statusFilter === 'success' ? paymentStatus === 'SUCCESS' : paymentStatus === 'PENDING'
      })
    }

    setFilteredRegistrations(filtered)
  }, [registrations, searchTerm, statusFilter])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
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
          r.registrationType === "COLLEGE_STUDENT"
            ? r.collegeName || "N/A"
            : r.registrationType === "IEEE_STUDENT"
            ? r.collegeName || "N/A"
            : r.organizationName || "N/A",
        registrationType: r.registrationType,
        attendingWorkshop: r.attendingWorkshop,
        createdAt: r.createdAt,
        payments: [
          {
            status: r.isPaymentCompleted ? "SUCCESS" : "PENDING",
            amount:
              r.registrationType === "COLLEGE_STUDENT" ? 350 :
              r.registrationType === "IEEE_STUDENT" ? 250 :
              r.registrationType === "ORGANIZATION" ? 500 : 0,
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
    const headers = ['ID', 'Name', 'Email', 'College', 'Phone', 'Payment Status', 'Amount', 'Registration Date']
    const csvContent = [
      headers.join(','),
      ...filteredRegistrations.map(reg => [
        reg.id,
        reg.fullName,
        reg.email,
        reg.college,
        reg.phone,
        reg.payments[0]?.status || 'PENDING',
        reg.payments[0]?.amount || 0,
        new Date(reg.createdAt).toLocaleDateString()
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
    paid: registrations.filter(reg => reg.payments[0]?.status === 'SUCCESS').length,
    pending: registrations.filter(reg => reg.payments[0]?.status === 'PENDING').length,
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by name, email, or college..."
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
                      <th className="text-left py-3 px-4">College</th>
                      <th className="text-left py-3 px-4">Phone</th>
                      <th className="text-left py-3 px-4">Payment Status</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Date</th>
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
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            registration.payments[0]?.status === 'SUCCESS' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {registration.payments[0]?.status === 'SUCCESS' ? (
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
                        <td className="py-3 px-4">₹{registration.payments[0]?.amount || 0}</td>
                        <td className="py-3 px-4">
                          {new Date(registration.createdAt).toLocaleDateString()}
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