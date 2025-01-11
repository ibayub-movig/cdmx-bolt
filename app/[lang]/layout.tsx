// app/[lang]/layout.tsx
import type { Metadata, ResolvingMetadata, Viewport } from 'next'
import * as React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/toaster'
import { notFound } from 'next/navigation'
import { i18n } from '@/config/i18n.config'
import { getDictionary } from '@/src/lib/get-dictionary'

// Define Language type based on your config
type Lang = (typeof i18n.locales)[number]

// Type for layout props
interface RootLayoutProps {
  children: React.ReactNode
  params: { lang: Lang }
}

// Validate language parameter
function validateLanguage(lang: string): lang is Lang {
  return i18n.locales.includes(lang as Lang);
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

// Metadata generation with proper typing
export async function generateMetadata({ 
  params: { lang },
  parent
}: { 
  params: { lang: Lang },
  parent: ResolvingMetadata
}): Promise<Metadata> {
  const parentMetadata = await parent
  const dict = await getDictionary(lang)
  
  const baseUrl = 'https://bestcdmx.com'
  const ogImage = 'https://bestcdmx.com/og-image.jpg'
  
  const metadata: Metadata = {
    title: {
      template: '%s | BestCDMX',
      default: 'BestCDMX - Your Guide to Mexico City',
    },
    description: dict.metadata.description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: 'BestCDMX',
      description: dict.metadata.description,
      url: baseUrl,
      siteName: 'BestCDMX',
      locale: lang,
      type: 'website',
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'BestCDMX - Your Guide to Mexico City'
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'BestCDMX',
      description: dict.metadata.description,
      creator: '@bestcdmx',
      images: [ogImage],
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        'en-US': `${baseUrl}/en`,
        'es-MX': `${baseUrl}/es`,
      },
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

  return metadata
}

export default async function RootLayout({
  children,
  params: { lang },
}: RootLayoutProps) {
  // Validate lang parameter
  if (!validateLanguage(lang)) {
    notFound()
  }

  const dict = await getDictionary(lang)

  return (
    <>
      <Header dict={dict.navigation} lang={lang} />
      <main className="min-h-screen flex-1">{children}</main>
      <Footer dict={dict.footer} />
      <Toaster />
    </>
  )
}