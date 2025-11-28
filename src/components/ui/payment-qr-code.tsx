'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import Image from 'next/image'

interface PaymentQRCodeProps {
  amount: number
  upiId?: string
}

export default function PaymentQRCode({ amount, upiId = "ravisagar1108-1@okaxis" }: PaymentQRCodeProps) {
  const qrImageUrl = '/assets/payment/pay_qr.jpeg'

  const handleDownloadQR = () => {
    const link = document.createElement('a')
    link.href = qrImageUrl
    link.download = 'IEEE-Conclave-Payment-QR.jpeg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="px-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold">Scan to Pay</h3>
          
          <div className="flex justify-center relative">
            <div className="w-full h-auto aspect-square rounded-lg overflow-hidden">
              <Image 
                src={qrImageUrl} 
                height={1500}
                width={1500}
                alt="Payment QR Code" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image doesn't load
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.parentElement!.innerHTML = `
                    <div class="w-full h-full bg-gray-100 flex items-center justify-center">
                      <div class="text-center space-y-2">
                        <div class="w-32 h-32 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                          <span class="text-xs text-gray-500">QR Code</span>
                        </div>
                        <p class="text-xs text-gray-600">QR Code for Payment</p>
                      </div>
                    </div>
                  `
                }}
              />
            </div>
            <Button
              onClick={handleDownloadQR}
              size="sm"
              className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 shadow-md"
              title="Download QR Code"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Pay ₹{amount}</p>
            <p className="text-xs text-gray-600">UPI ID: {upiId}</p>
            <p className="text-xs text-gray-500">
              Scan the QR code with any UPI app (PhonePe, GPay, PayTM, etc.)
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              <strong>Important:</strong> After payment, upload a screenshot below to complete your registration.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}