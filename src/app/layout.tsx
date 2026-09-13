import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { Header } from '@/widgets/header'
import { Providers } from './providers'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'RentalCar — оренда автомобілів',
    template: '%s | RentalCar',
  },
  description:
    'RentalCar — сервіс оренди автомобілів в Україні. Обирайте авто за брендом, ціною та пробігом і бронюйте онлайн.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={manrope.variable}>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
