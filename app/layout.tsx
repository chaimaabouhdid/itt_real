import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'

const inter = Roboto({
  style: ['normal'],
  weight: '500',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'IT Torch',
  description: 'Welcome to IT Torch, for amazing soft skills!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <ConfettiProvider/>
        <ToastProvider/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  )
}
