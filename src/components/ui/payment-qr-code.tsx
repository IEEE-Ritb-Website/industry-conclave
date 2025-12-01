'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Download, Smartphone, Copy, Check } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

interface PaymentQRCodeProps {
  amount: number
}

export default function PaymentQRCode({ amount }: PaymentQRCodeProps) {
  const [selectedQR, setSelectedQR] = useState<'axis' | 'sbi'>('axis')
  const [copiedUPI, setCopiedUPI] = useState<string | null>(null)
  
  const axisQR = '/payment/pay_qr.jpeg'
  const sbiQR = '/payment/pay_qr_2.jpeg'
  const axisUPI = "ravisagar1108-1@okaxis"
  const sbiUPI = "ravisagar1108@oksbi"

  const handleDownloadQR = (qrUrl: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = qrUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('QR Code downloaded successfully!')
  }

  const handleCopyUPI = (upiId: string) => {
    navigator.clipboard.writeText(upiId)
    setCopiedUPI(upiId)
    toast.success('UPI ID copied to clipboard!')
    setTimeout(() => setCopiedUPI(null), 2000)
  }

  const QRCodeCard = ({ 
    qrUrl, 
    title, 
    upiId: cardUpiId, 
    isSelected, 
    onSelect, 
    fileName,
    bankName
  }: { 
    qrUrl: string; 
    title: string; 
    upiId: string; 
    isSelected: boolean; 
    onSelect: () => void; 
    fileName: string;
    bankName: string;
  }) => (
    <div className={`relative border-2 rounded-xl transition-all duration-200 cursor-pointer ${
      isSelected 
        ? 'border-blue-500 bg-blue-950/50 shadow-lg shadow-blue-500/20' 
        : 'border-gray-700 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-900/70'
    }`} onClick={onSelect}>
      <div className="relative p-4 space-y-3">
        <div className="absolute top-4 right-4 z-5 flex items-center justify-between">
          {isSelected && (
            <Badge className="bg-blue-500 text-white text-xs px-2 py-1">
              Selected
            </Badge>
          )}
        </div>
        
        <div className="relative group">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
            <Image 
              src={qrUrl} 
              height={300}
              width={300}
              alt={`${title} QR Code`} 
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.parentElement!.innerHTML = `
                  <div class="w-full h-full bg-gray-800 flex items-center justify-center border border-gray-700">
                    <div class="text-center space-y-2">
                      <div class="w-12 h-12 bg-gray-700 rounded-lg mx-auto flex items-center justify-center">
                        <QrCode class="w-6 h-6 text-gray-400" />
                      </div>
                      <p class="text-xs text-gray-400">QR Code</p>
                    </div>
                  </div>
                `
              }}
            />
          </div>
          
          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleDownloadQR(qrUrl, fileName)
            }}
            size="sm"
            className="absolute bottom-2 right-2 bg-gray-900/90 hover:bg-gray-800 text-gray-100 border border-gray-600 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            title="Download QR Code"
          >
            <Download className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <Card className="border-gray-800 bg-gray-950/50 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-center space-x-2 text-gray-100">
          Complete Your Payment
        </CardTitle>
        <p className="text-center text-sm text-gray-400">
          Choose any QR code below to pay <span className="text-blue-400 font-bold">₹{amount}</span>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* QR Codes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QRCodeCard
            qrUrl={axisQR}
            title="Axis Bank UPI"
            upiId={axisUPI}
            isSelected={selectedQR === 'axis'}
            onSelect={() => setSelectedQR('axis')}
            fileName="IEEE-Conclave-Axis-Payment-QR.jpeg"
            bankName="Axis Bank"
          />
          
          <QRCodeCard
            qrUrl={sbiQR}
            title="SBI UPI"
            upiId={sbiUPI}
            isSelected={selectedQR === 'sbi'}
            onSelect={() => setSelectedQR('sbi')}
            fileName="IEEE-Conclave-SBI-Payment-QR.jpeg"
            bankName="State Bank of India"
          />
        </div>

        {/* OR Divider */}
        <div className="relative">
          <Separator className="bg-gray-700" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-gray-950 px-3 text-xs font-medium text-gray-400">OR</span>
          </div>
        </div>

        {/* Manual Payment Option */}
        <Card className="border-gray-700 bg-linear-to-br from-blue-950/30 to-purple-950/30">
          <CardContent className="p-4 space-y-4">
            <h4 className="font-semibold text-sm text-blue-300 flex items-center space-x-2">
              <Smartphone className="w-4 h-4" />
              <span>Pay Manually via UPI</span>
            </h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                  <span className="text-sm font-medium text-gray-300">Axis Bank</span>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-gray-800 px-2 py-1 rounded text-gray-300 font-mono">{axisUPI}</code>
                    <Button
                      onClick={() => handleCopyUPI(axisUPI)}
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 text-gray-400 hover:text-blue-400"
                    >
                      {copiedUPI === axisUPI ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                  <span className="text-sm font-medium text-gray-300">SBI Bank</span>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-gray-800 px-2 py-1 rounded text-gray-300 font-mono">{sbiUPI}</code>
                    <Button
                      onClick={() => handleCopyUPI(sbiUPI)}
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 text-gray-400 hover:text-blue-400"
                    >
                      {copiedUPI === sbiUPI ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                <span className="text-sm font-medium text-gray-300">Amount</span>
                <span className="text-lg font-bold text-blue-400">₹{amount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="border-gray-700 bg-linear-to-br from-yellow-950/20 to-orange-950/20">
          <CardContent className="p-4 space-y-3">
            <h4 className="font-semibold text-sm text-yellow-300 flex items-center space-x-2">
              <span>📸</span>
              <span>Next Steps</span>
            </h4>
            <div className="space-y-2 text-xs text-yellow-200/80">
              <div className="flex items-start space-x-2">
                <span className="text-yellow-400">1.</span>
                <span>Scan any QR code above or use UPI ID manually</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-yellow-400">2.</span>
                <span>Complete the payment of <span className="text-yellow-300 font-bold">₹{amount}</span></span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-yellow-400">3.</span>
                <span><strong>Take a screenshot</strong> of successful payment</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-yellow-400">4.</span>
                <span>Upload the screenshot below to complete registration</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supported Apps */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">Supported by all major UPI apps</p>
          <div className="flex justify-center space-x-2">
            {['PhonePe', 'Google Pay', 'PayTM', 'Amazon Pay'].map((app) => (
              <Badge key={app} variant="secondary" className="text-xs bg-gray-800 text-gray-300 hover:bg-gray-700">
                {app}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}