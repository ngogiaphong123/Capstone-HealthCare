import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layouts/navbar'
import ReduxProvider from '@redux/provider'
import { Toaster } from '@components/ui/toaster'
import AuthGuard from '../guard/AuthGuard'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'BKHealthcare',
  description: 'BKHealthcare',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxProvider>
          <AuthGuard>
            <Navbar />
            {children}
          </AuthGuard>
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  )
}
