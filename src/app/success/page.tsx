import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Calendar, MapPin, Mail, ArrowLeft, Download, Share2 } from 'lucide-react'
import { CONFIG } from '@/configs/config'

export default function SuccessPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Payment Successful!
          </h1>
            <p className="text-xl text-gray-300 mb-2">
            Thank you for registering for Industry Conclave 2025. Your payment has been confirmed!
          </p>
            <p className="text-lg text-green-600 font-medium">
            📧 We'll send you a confirmation email shortly. Please check your inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Registration Details */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Registration Confirmed</span>
              </CardTitle>
              <CardDescription>
                Your spot has been secured for the event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl p-4">
                <p className="text-sm text-gray-400 mb-1">Registration ID</p>
                <p className="font-mono font-semibold text-lg">TC2025-XXXXXX</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{CONFIG.eventDetails.dates}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{CONFIG.eventDetails.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
              <CardDescription>
                Here's what you need to know before the event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Confirmation Email Sent</p>
                    <p className="text-sm text-gray-400">Check your inbox for event details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-3 h-3 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Event Updates</p>
                    <p className="text-sm text-gray-400">We'll send schedule updates via email</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-3 h-3 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Arrival Time</p>
                    <p className="text-sm text-gray-400">Please arrive 30 minutes early</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Information */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">What to Bring</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span>Valid ID proof for verification</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span>Laptop for workshops and hackathon</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span>Power bank and chargers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span>Notebook and pen</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Event Schedule</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span>Day 1: 9:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span>Day 2: 9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span>Meals included during event hours</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span>Certificate provided on completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="rounded-2xl px-6 py-3">
            <Share2 className="w-4 h-4 mr-2" />
            Share Event
          </Button>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
          <p className="text-gray-400 mb-4">
            If you have any questions or need assistance, feel free to reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={`mailto:${CONFIG.profile.email}`} className="flex items-center text-indigo-600 hover:text-indigo-700">
              <Mail className="w-4 h-4 mr-2" />
              {CONFIG.profile.email}
            </a>
            <span className="text-gray-400">•</span>
            <a href="tel:+919876543210" className="flex items-center text-indigo-600 hover:text-indigo-700">
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}