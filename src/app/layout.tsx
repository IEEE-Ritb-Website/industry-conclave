import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/nav'
import ToastProvider from '@/components/shared/ToastProvider'
import Footer from '@/components/footer'
import { cn } from '@/lib/utils'

const poppins = Poppins({ weight: ['400', '500', '600'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Industry Conclave 2025 - IEEE',
  description: 'Join industry leaders and tech innovators at premier technology conference featuring workshops, keynotes, and networking opportunities.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(poppins.className, "dark")}>
        <ToastProvider />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}