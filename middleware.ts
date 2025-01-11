import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/config/i18n.config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

/**
 * This middleware handles internationalization routing:
 * - Detects user's preferred language from headers
 * - Redirects to localized URLs
 * - Supports multiple locales defined in i18n.config
 * 
 * This helps with SEO by:
 * - Providing proper language-specific URLs
 * - Enabling language-specific content discovery
 * - Supporting hreflang tags (implement in layout.tsx)
 */

function getLocale(request: NextRequest): string {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales
    
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
    
    const locale = matchLocale(languages, locales, i18n.defaultLocale)
    return locale
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    
    // Check if pathname starts with a locale
    const pathnameHasLocale = i18n.locales.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (!pathnameHasLocale) {
        const locale = getLocale(request)
        
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname === '/' ? '' : pathname}`,
                request.url
            )
        )
    }

    return NextResponse.next()
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}