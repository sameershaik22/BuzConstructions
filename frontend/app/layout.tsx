import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import Script from 'next/script'

// Triggering global CSS cache bust to forcefully apply new Gold Button CSS
export const metadata: Metadata = {
  title: {
    default: 'BUZ Construction Group Inc. | General Contractor Ontario',
    template: '%s | BUZ Construction Group Inc.'
  },
  description: 'BUZ Construction Group Inc. — Ontario\'s trusted general contractor specializing in commercial construction, residential construction, renovations, project management, and design-build services.',
  keywords: ['general contractor', 'commercial construction', 'residential construction', 'home renovations', 'construction company', 'design-build contractor', 'Ontario', 'GTA'],
  authors: [{ name: 'BUZ Construction Group Inc.' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'BUZ Construction Group Inc.',
    title: 'BUZ Construction Group Inc. | Build. Unite. Zeal.',
    description: 'Full-service general contracting company specializing in commercial, residential construction, renovations, and design-build services across Ontario.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="G-XXXXXXXXXX" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "BUZ Construction Group Inc.",
              "description": "Full-service general contracting company in Ontario, Canada",
              "url": "https://buzconstruction.ca",
              "telephone": "+1-416-710-8200",
              "email": "info@buzconstruction.ca",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "15 Queen St. S",
                "addressLocality": "Mississauga",
                "addressRegion": "ON",
                "postalCode": "L5M 1K2",
                "addressCountry": "CA"
              },
              "geo": { "@type": "GeoCoordinates", "latitude": 43.6532, "longitude": -79.3832 },
              "openingHours": ["Mo-Fr 07:00-18:00", "Sa 08:00-14:00"],
              "sameAs": [
                "https://www.facebook.com/buzconstruction",
                "https://www.instagram.com/buzconstruction",
                "https://www.linkedin.com/company/buz-construction"
              ]
            })
          }}
        />
      </head>
      <body>
        {/* Google Analytics 4 */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`}
        </Script>

        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  )
}
