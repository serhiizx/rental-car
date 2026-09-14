import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { SITE_URL } from '@/shared/config/env.ts'
import { Header } from '@/widgets/header'
import { Providers } from './providers'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

const description =
  'RentalCar is a car rental service. Browse the fleet by brand, price and mileage, and book your car online in minutes.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'RentalCar — Car Rental Service',
    template: '%s | RentalCar',
  },
  description,
  openGraph: {
    siteName: 'RentalCar',
    title: 'RentalCar — Car Rental Service',
    description,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RentalCar — Car Rental Service',
    description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
