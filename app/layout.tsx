import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import type { Metadata } from 'next'
import '@/app/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bestcdmx.com'),
  title: {
    default: 'BestCDMX',
    template: '%s | BestCDMX'
  },
  description: 'Your Guide to Mexico City',
  openGraph: {
    type: 'website',
    siteName: 'BestCDMX',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}