import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Navbar from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import CookieBanner from './components/CookieBanner'
import UserLoginModal from './components/UserLoginModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Strata Mate',
  description: 'Your Digital Strata Management Solution',
  openGraph: {
    title: 'Strata Mate',
    description: 'Your Digital Strata Management Solution',
    url: baseUrl,
    siteName: 'Strata Mate',
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
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable,
        inter.className
      )}
    >
      <body className="antialiased max-w-4xl mx-auto px-4">
        <div className="max-w-4xl mx-auto px-4">
          <Navbar />
          <main className="min-h-screen py-8">
            {children}
          </main>
          <Footer />
          <UserLoginModal />
          <CookieBanner />
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  )
}
