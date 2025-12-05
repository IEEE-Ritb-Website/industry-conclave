'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Download, Search, Users, CheckCircle, XCircle, Clock, Eye, Loader2, Mail, UserCheck } from 'lucide-react'
import { RegistrationTypes, RegistrationPricing } from '@/types'
import Image from 'next/image'
import { toast } from 'sonner'

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
  confirmationSent?: boolean
  createdAt: string
  updatedAt?: string
  paymentScreenshot?: string
  paymentScreenshotUrl?: string
  paymentScreenshotCid?: string
  couponCode?: string
  finalAmount?: number
  checkedIn?: boolean
  takenLunch?: boolean
  hadTea?: boolean
  day2TakenLunch?: boolean
  day2HadTea?: boolean
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
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'pending'>('success')
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState<string | null>(null)
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)
  const [sendingConfirmation, setSendingConfirmation] = useState(false)
  const [checkInDialogOpen, setCheckInDialogOpen] = useState(false)
  const [selectedRegistrationForCheckIn, setSelectedRegistrationForCheckIn] = useState<Registration | null>(null)
  const [updatingCheckIn, setUpdatingCheckIn] = useState(false)
  const [confirmationActionOpen, setConfirmationActionOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<{ type: string; label: string } | null>(null)

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
        (reg.organizationName && reg.organizationName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (reg.id && reg.id.toLowerCase().includes(searchTerm.toLowerCase()))
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
        confirmationSent: r.confirmationSent || false,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
        paymentScreenshot: r.paymentScreenshot,
        paymentScreenshotUrl: r.paymentScreenshotUrl,
        paymentScreenshotCid: r.paymentScreenshotCid || '',
        couponCode: r.couponCode,
        finalAmount: r.finalAmount,
        checkedIn: r.checkedIn,
        takenLunch: r.takenLunch,
        hadTea: r.hadTea,
        day2TakenLunch: r.day2TakenLunch,
        day2HadTea: r.day2HadTea,
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
    const headers = [
      'ID', 'Name', 'Email', 'College', 'Phone', 'Registration Type', 'Workshop', 
      'IEEE Member ID', 'Organization', 'Payment Status', 'Payment Completed', 
      'Base Amount', 'Final Amount', 'Coupon Code', 'Checked In', 'Taken Lunch', 'Had Tea', 'Day2 Lunch', 'Day2 Tea', 
      'Order ID', 'Payment ID', 'Screenshot URL', 'Screenshot CID', 
      'Confirmation Sent', 'Created Date', 'Updated Date'
    ]
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
        reg.finalAmount || reg.payments[0]?.amount || 0,
        reg.couponCode || '',
        reg.checkedIn ? 'Yes' : 'No',
        reg.takenLunch ? 'Yes' : 'No',
        reg.hadTea ? 'Yes' : 'No',
        reg.day2TakenLunch ? 'Yes' : 'No',
        reg.day2HadTea ? 'Yes' : 'No',
        reg.payments[0]?.razorpayOrderId || '',
        reg.payments[0]?.razorpayPaymentId || '',
        reg.paymentScreenshotUrl || '',
        reg.paymentScreenshotCid || '',
        reg.confirmationSent ? 'Yes' : 'No',
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

  const handleSendConfirmation = async (registration: Registration) => {
    setSelectedRegistration(registration)
    setConfirmationDialogOpen(true)
  }

  const confirmSendConfirmation = async () => {
    if (!selectedRegistration) return

    setSendingConfirmation(true)
    try {
      const response = await fetch('/api/admin/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationId: selectedRegistration.id
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Confirmation email sent successfully!')
        
        // Update the registration in the local state
        setRegistrations(prev => 
          prev.map(reg => 
            reg.id === selectedRegistration.id 
              ? { ...reg, confirmationSent: true }
              : reg
          )
        )
        
        setConfirmationDialogOpen(false)
        setSelectedRegistration(null)
      } else {
        toast.error(data.error || 'Failed to send confirmation email')
      }
    } catch (error) {
      console.error('Error sending confirmation:', error)
      toast.error('Failed to send confirmation email')
    } finally {
      setSendingConfirmation(false)
    }
  }

  const handleCheckInActions = (registration: Registration) => {
    setSelectedRegistrationForCheckIn(registration)
    setCheckInDialogOpen(true)
  }

  const handleCheckInAction = (actionType: string, label: string) => {
    setPendingAction({ type: actionType, label })
    setConfirmationActionOpen(true)
  }

  const confirmCheckInAction = async () => {
    if (!selectedRegistrationForCheckIn || !pendingAction) return

    setUpdatingCheckIn(true)
    try {
      const response = await fetch('/api/admin/update-checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationId: selectedRegistrationForCheckIn.id,
          action: pendingAction.type
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(`${pendingAction.label} marked successfully!`)
        
        // Update the registration in the local state
        setRegistrations(prev => 
          prev.map(reg => 
            reg.id === selectedRegistrationForCheckIn.id 
              ? { ...reg, [pendingAction.type]: true }
              : reg
          )
        )
        
        // Update the selected registration to reflect changes in the modal
        setSelectedRegistrationForCheckIn(prev => 
          prev ? { ...prev, [pendingAction.type]: true } : null
        )
        
        setConfirmationActionOpen(false)
        setPendingAction(null)
      } else {
        toast.error(data.error || `Failed to mark ${pendingAction.label}`)
      }
    } catch (error) {
      console.error('Error updating check-in status:', error)
      toast.error(`Failed to mark ${pendingAction.label}`)
    } finally {
      setUpdatingCheckIn(false)
    }
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
    workshopPaid: registrations.filter(reg => reg.attendingWorkshop && reg.isPaymentCompleted).length,
    byType: {
      [RegistrationTypes.COLLEGE_STUDENTS]: registrations.filter(reg => reg.registrationType === RegistrationTypes.COLLEGE_STUDENTS).length,
      [RegistrationTypes.COLLEGE_EXECOM]: registrations.filter(reg => reg.registrationType === RegistrationTypes.COLLEGE_EXECOM).length,
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
                  <p className="text-sm font-medium text-gray-600">Workshop Attendees (Paid)</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {stats.workshopPaid}
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
                    placeholder="Search by name, email, ID, college, organization, IEEE ID..."
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
                      <th className="text-left py-3 px-4">Actions</th>
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">College/Org</th>
                      <th className="text-left py-3 px-4">Phone</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Workshop</th>
                      <th className="text-left py-3 px-4">IEEE ID</th>
                      <th className="text-left py-3 px-4">Payment Status</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Coupon Code</th>
                      <th className="text-left py-3 px-4">Payment Proof</th>
                      <th className="text-left py-3 px-4">Registered at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.map((registration) => (
                      <tr key={registration.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-2">
                            {registration.isPaymentCompleted && !registration.confirmationSent ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSendConfirmation(registration)}
                                className="text-xs"
                              >
                                <Mail className="w-3 h-3 mr-1" />
                                Send Confirmation
                              </Button>
                            ) : registration.confirmationSent ? (
                              <span className="text-green-600 text-xs font-medium">
                                <CheckCircle className="w-3 h-3 inline mr-1" />
                                Sent
                              </span>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCheckInActions(registration)}
                              className="text-xs"
                            >
                              <UserCheck className="w-3 h-3 mr-1" />
                              Check-in
                            </Button>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium">{registration.fullName}</td>
                        <td className="py-3 px-4">{registration.email}</td>
                        <td className="py-3 px-4">{registration.college}</td>
                        <td className="py-3 px-4">{registration.phone}</td>
                        <td className="py-3 px-4">
                          <Input 
                            value={registration.registrationType.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                            disabled
                            className="text-xs w-auto"
                          />
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
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${registration.isPaymentCompleted
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
                          ₹{registration.finalAmount || registration.payments[0]?.amount || 0}
                          {registration.finalAmount && registration.finalAmount !== registration.payments[0]?.amount && (
                            <span className="text-xs text-gray-500 ml-1">
                              (was ₹{registration.payments[0]?.amount || 0})
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {registration.couponCode ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {registration.couponCode}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {registration.paymentScreenshot ? (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-xs">
                                  <Eye className="w-3 h-3 mr-1" />
                                  View Proof
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <DialogHeader>
                                  <DialogTitle>Payment Screenshot</DialogTitle>
                                </DialogHeader>
                                <div className="flex justify-center relative">
                                  {imageLoading === registration.paymentScreenshot && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <Loader2 className="w-8 h-8 animate-spin" />
                                    </div>
                                  )}
                                  <Image 
                                    src={registration.paymentScreenshot} 
                                    alt="Payment Screenshot" 
                                    height={1500}
                                    width={1500}
                                    className="max-w-full max-h-[80vh] object-contain"
                                    onLoad={() => setImageLoading(null)}
                                    onError={() => setImageLoading(null)}
                                    onLoadStart={() => setImageLoading(registration.paymentScreenshot || null)}
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <span className="text-gray-400 text-sm">No screenshot</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {new Date(registration.createdAt).toLocaleDateString('en-US', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
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

        {/* Confirmation Dialog */}
        <Dialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Confirmation Email</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="mb-4">
                Are you sure you want to send a confirmation email to <strong>{selectedRegistration?.fullName}</strong> ({selectedRegistration?.email})?
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Please make sure you have verified the payment details before sending the confirmation.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setConfirmationDialogOpen(false)
                    setSelectedRegistration(null)
                  }}
                  disabled={sendingConfirmation}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmSendConfirmation}
                  disabled={sendingConfirmation}
                >
                  {sendingConfirmation ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Confirmation'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Check-in Actions Dialog */}
        <Dialog open={checkInDialogOpen} onOpenChange={setCheckInDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Check-in Actions</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="mb-6">
                Manage check-in status for <strong>{selectedRegistrationForCheckIn?.fullName}</strong> ({selectedRegistrationForCheckIn?.email})
              </p>
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-4 border rounded-lg`}>
                  <div>
                    <h4 className="font-medium">Check-in Status</h4>
                    <p className="text-sm text-gray-600">Mark attendee as checked in</p>
                  </div>
                  {selectedRegistrationForCheckIn?.checkedIn ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Checked In</span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => handleCheckInAction('checkedIn', 'Check-in')}
                      className="min-w-[100px]"
                    >
                      Check In
                    </Button>
                  )}
                </div>
                <div className={`flex items-center justify-between p-4 border rounded-lg ${selectedRegistrationForCheckIn?.takenLunch ? 'border-green-200 bg-green-50' : ''}`}>
                  <div>
                    <h4 className="font-medium">Lunch Status</h4>
                    <p className="text-sm text-gray-600">Mark if attendee has taken lunch</p>
                  </div>
                  {selectedRegistrationForCheckIn?.takenLunch ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Lunch Taken</span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => handleCheckInAction('takenLunch', 'Lunch')}
                      className="min-w-[100px]"
                    >
                      Mark Lunch
                    </Button>
                  )}
                </div>
                <div className={`flex items-center justify-between p-4 border rounded-lg ${selectedRegistrationForCheckIn?.hadTea ? 'border-green-200 bg-green-50' : ''}`}>
                  <div>
                    <h4 className="font-medium">Tea Status</h4>
                    <p className="text-sm text-gray-600">Mark if attendee has had tea</p>
                  </div>
                  {selectedRegistrationForCheckIn?.hadTea ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Tea Taken</span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => handleCheckInAction('hadTea', 'Tea')}
                      className="min-w-[100px]"
                    >
                      Mark Tea
                    </Button>
                  )}
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Day 2 Lunch Status</h4>
                    <p className="text-sm text-gray-600">Mark if attendee has taken lunch on Day 2</p>
                  </div>
                  {selectedRegistrationForCheckIn?.day2TakenLunch ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Day 2 Lunch Taken</span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => handleCheckInAction('day2TakenLunch', 'Day 2 Lunch')}
                      className="min-w-[100px]"
                    >
                      Mark Day 2 Lunch
                    </Button>
                  )}
                </div>
                <div className={`flex items-center justify-between p-4 border rounded-lg ${selectedRegistrationForCheckIn?.day2HadTea ? 'border-green-200 bg-green-50' : ''}`}>
                  <div>
                    <h4 className="font-medium">Day 2 Tea Status</h4>
                    <p className="text-sm text-gray-600">Mark if attendee has had tea on Day 2</p>
                  </div>
                  {selectedRegistrationForCheckIn?.day2HadTea ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Day 2 Tea Taken</span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => handleCheckInAction('day2HadTea', 'Day 2 Tea')}
                      className="min-w-[100px]"
                    >
                      Mark Day 2 Tea
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCheckInDialogOpen(false)
                    setSelectedRegistrationForCheckIn(null)
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Check-in Action Confirmation Dialog */}
        <Dialog open={confirmationActionOpen} onOpenChange={setConfirmationActionOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm {pendingAction?.label}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="mb-4">
                Are you sure you want to mark <strong>{pendingAction?.label}</strong> for <strong>{selectedRegistrationForCheckIn?.fullName}</strong>?
              </p>
              <p className="text-sm text-gray-600 mb-4">
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setConfirmationActionOpen(false)
                    setPendingAction(null)
                  }}
                  disabled={updatingCheckIn}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmCheckInAction}
                  disabled={updatingCheckIn}
                >
                  {updatingCheckIn ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    `Confirm ${pendingAction?.label}`
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}