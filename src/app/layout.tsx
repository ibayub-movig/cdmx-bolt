import { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: 'CDMX Bolt',
    template: '%s | CDMX Bolt'
  },
  description: 'Your site description here',
  openGraph: {
    title: 'CDMX Bolt',
    description: 'Your site description here',
    url: 'https://your-domain.com',
    siteName: 'CDMX Bolt',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 
