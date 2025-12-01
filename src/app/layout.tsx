import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/nav'
import ToastProvider from '@/components/shared/ToastProvider'
import Footer from '@/components/footer'
import { cn } from '@/lib/utils'
import TopNotification from '@/components/shared/top-notification'
import { CONFIG } from '@/configs/config'

const poppins = Poppins({ weight: ['400', '500', '600'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: CONFIG.name + " | " + CONFIG.headline,
  description: CONFIG.longDescription,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(poppins.className, "dark")} suppressHydrationWarning>
        <ToastProvider />
        <Navbar />
        <TopNotification />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}