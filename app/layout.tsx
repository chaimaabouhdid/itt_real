import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'

// Dfine the font to be used
const inter = Roboto({
  style: ['normal'],
  weight: '500',
  subsets: ['latin'],
})

// Define metadata for the application
export const metadata: Metadata = {
  title: 'IT Torch',
  description: 'Welcome to IT Torch, for amazing soft skills!',
}

// Define the root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Wrap the application with ClerkProvider for authentication
    <ClerkProvider>
    <html lang="en">
      {/*Apply the Roboto font class to the body*/}
      <body className={inter.className}>
        {/* Provide confetti effects */}
        <ConfettiProvider/>
        {/* Provide toast notifications */}
        <ToastProvider/>
        {/* Render the children components */}
        {children}
      </body>
    </html>
    </ClerkProvider>
  )
}
